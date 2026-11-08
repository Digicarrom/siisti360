import {
  NeighborhoodInfo,
  NEIGHBORHOODS,
  FINNISH_POSTAL_CODES,
  findClosestNeighborhoodByCoords,
  findNeighborhoodByPostalCode,
  getOrCreateNeighborhood,
} from '../data/locations';

export type GeolocationPermissionStatus = 'prompt' | 'granted' | 'denied' | 'unsupported';

export interface DetectedLocationResult {
  coords: {
    lat: number;
    lng: number;
    accuracy?: number;
  };
  neighborhood: NeighborhoodInfo;
  postalCode: string;
  cityId: 'helsinki' | 'espoo' | 'vantaa';
  cityName: string;
  distanceKm: number;
  isWithinCapitalRegion: boolean;
  timestamp: number;
  detectionMethod: 'gps' | 'manual' | 'cache';
  formattedName: string;
}

const STORAGE_KEY_PERMISSION = 'siisti360_location_permission';
const STORAGE_KEY_DETECTED = 'siisti360_detected_location_meta';
const STORAGE_KEY_PROMPT_DISMISSED = 'siisti360_location_prompt_dismissed';

/**
 * Check browser geolocation support and current permission state if available
 */
export async function checkGeolocationPermission(): Promise<GeolocationPermissionStatus> {
  if (typeof window === 'undefined' || !navigator || !navigator.geolocation) {
    return 'unsupported';
  }

  // Check cached preference first
  try {
    const cached = localStorage.getItem(STORAGE_KEY_PERMISSION) as GeolocationPermissionStatus | null;
    if (cached === 'granted' || cached === 'denied') {
      return cached;
    }
  } catch {}

  // Check Permissions API if supported
  if ('permissions' in navigator && navigator.permissions.query) {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
      if (result.state === 'granted') {
        savePermissionStatus('granted');
        return 'granted';
      }
      if (result.state === 'denied') {
        savePermissionStatus('denied');
        return 'denied';
      }
      return 'prompt';
    } catch {
      // Some browsers throw on query({ name: 'geolocation' })
    }
  }

  return 'prompt';
}

export function savePermissionStatus(status: GeolocationPermissionStatus): void {
  try {
    localStorage.setItem(STORAGE_KEY_PERMISSION, status);
  } catch {}
}

export function isPromptDismissed(): boolean {
  try {
    const ts = localStorage.getItem(STORAGE_KEY_PROMPT_DISMISSED);
    if (!ts) return false;
    // Dismissal lasts 24 hours
    const parsed = parseInt(ts, 10);
    return Date.now() - parsed < 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function setPromptDismissed(dismissed = true): void {
  try {
    if (dismissed) {
      localStorage.setItem(STORAGE_KEY_PROMPT_DISMISSED, Date.now().toString());
    } else {
      localStorage.removeItem(STORAGE_KEY_PROMPT_DISMISSED);
    }
  } catch {}
}

export function getStoredDetectedLocation(): DetectedLocationResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DETECTED);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DetectedLocationResult;
    // Verify neighborhood exists
    const validNeighborhood = NEIGHBORHOODS[parsed.neighborhood.id] || getOrCreateNeighborhood(parsed.neighborhood.id);
    if (validNeighborhood) {
      return {
        ...parsed,
        neighborhood: validNeighborhood,
      };
    }
  } catch {}
  return null;
}

export function saveDetectedLocationMeta(result: DetectedLocationResult): void {
  try {
    localStorage.setItem(STORAGE_KEY_DETECTED, JSON.stringify(result));
    localStorage.setItem('siisti360_active_neighborhood', result.neighborhood.id);
    localStorage.setItem('siisti360_active_postal', result.postalCode);
  } catch {}
}

/**
 * Reverse geocode latitude and longitude to find Finnish postal code or district name.
 * Uses Nominatim with a short timeout and graceful fallback to offline coordinate table.
 */
async function reverseGeocodeCoords(lat: number, lng: number): Promise<{ postalCode?: string; district?: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2600);

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const postcode = addr.postcode?.trim();
      const district = addr.suburb || addr.neighbourhood || addr.quarter || addr.city_district || addr.city;
      return { postalCode: postcode, district };
    }
  } catch {
    clearTimeout(timeoutId);
  }

  return {};
}

/**
 * Perform browser geolocation request and match against Finnish locations
 */
export async function detectVisitorLocation(options: {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
} = {}): Promise<DetectedLocationResult> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    throw new Error('UNSUPPORTED');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        // Try reverse geocoding for exact postal code
        let matchedNeighborhood: NeighborhoodInfo | null = null;
        let matchedPostalCode: string | undefined = undefined;

        try {
          const rev = await reverseGeocodeCoords(latitude, longitude);
          if (rev.postalCode) {
            // Check if matches known Finnish postal codes
            const foundByPostcode = findNeighborhoodByPostalCode(rev.postalCode);
            if (foundByPostcode) {
              matchedNeighborhood = foundByPostcode;
              matchedPostalCode = rev.postalCode;
            }
          }
        } catch {}

        // Fallback or verify with Haversine distance
        const haversine = findClosestNeighborhoodByCoords(latitude, longitude);
        const finalNeighborhood = matchedNeighborhood || haversine.neighborhood;
        const finalPostalCode = matchedPostalCode || finalNeighborhood.postalCodes[0] || '00100';

        const cityNames: Record<string, string> = {
          helsinki: 'Helsinki',
          espoo: 'Espoo',
          vantaa: 'Vantaa',
        };

        const result: DetectedLocationResult = {
          coords: {
            lat: latitude,
            lng: longitude,
            accuracy,
          },
          neighborhood: finalNeighborhood,
          postalCode: finalPostalCode,
          cityId: finalNeighborhood.cityId,
          cityName: cityNames[finalNeighborhood.cityId] || 'Helsinki',
          distanceKm: haversine.distanceKm,
          isWithinCapitalRegion: haversine.isWithinCapitalRegion,
          timestamp: Date.now(),
          detectionMethod: 'gps',
          formattedName: `${finalNeighborhood.names.fi} (${finalPostalCode})`,
        };

        // Cache and save
        savePermissionStatus('granted');
        saveDetectedLocationMeta(result);

        resolve(result);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          savePermissionStatus('denied');
          reject(new Error('PERMISSION_DENIED'));
        } else if (error.code === error.TIMEOUT) {
          reject(new Error('TIMEOUT'));
        } else {
          reject(new Error('POSITION_UNAVAILABLE'));
        }
      },
      {
        enableHighAccuracy: options.enableHighAccuracy ?? true,
        timeout: options.timeout ?? 9000,
        maximumAge: options.maximumAge ?? 60000,
      }
    );
  });
}
