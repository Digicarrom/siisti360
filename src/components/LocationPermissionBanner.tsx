import React, { useState } from 'react';
import { Language } from '../data/content';
import { NeighborhoodInfo } from '../data/locations';
import {
  MapPin,
  Crosshair,
  X,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  detectVisitorLocation,
  savePermissionStatus,
  setPromptDismissed,
  DetectedLocationResult,
} from '../utils/geolocation';

interface LocationPermissionBannerProps {
  currentLang: Language;
  selectedNeighborhood: NeighborhoodInfo | null;
  onLocationDetected: (neighborhood: NeighborhoodInfo, postalCode: string, resultMeta: DetectedLocationResult) => void;
  onOpenManualSearch: () => void;
  onDismiss: () => void;
  isDismissed?: boolean;
}

export const LocationPermissionBanner: React.FC<LocationPermissionBannerProps> = ({
  currentLang,
  selectedNeighborhood,
  onLocationDetected,
  onOpenManualSearch,
  onDismiss,
  isDismissed = false,
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'warning' | 'error';
    title: string;
    message: string;
  } | null>(null);

  // If already dismissed or neighborhood is known and no active feedback, don't show the initial prompt
  if (isDismissed && !feedback) {
    return null;
  }

  const handleRequestLocation = async () => {
    setIsDetecting(true);
    setFeedback(null);

    try {
      const res = await detectVisitorLocation({ enableHighAccuracy: true, timeout: 10000 });
      setIsDetecting(false);

      if (!res.isWithinCapitalRegion) {
        setFeedback({
          type: 'warning',
          title:
            currentLang === 'fi'
              ? 'Pääkaupunkiseudun ulkopuolella'
              : currentLang === 'sv'
              ? 'Utanför huvudstadsregionen'
              : 'Outside Capital Region',
          message:
            currentLang === 'fi'
              ? `Sijaintisi havaittiin noin ${res.distanceKm} km päässä pääkaupunkiseudusta. Siisti360 toimii Helsingissä, Espoossa ja Vantaalla. Valitse haluamasi alue alta.`
              : currentLang === 'sv'
              ? `Din position är cirka ${res.distanceKm} km från huvudstadsregionen. Siisti360 verkar i Helsingfors, Esbo och Vanda. Välj ditt område manuellt nedan.`
              : `Your location was detected ~${res.distanceKm} km away. Siisti360 currently serves Helsinki, Espoo, and Vantaa. Please choose a target area manually.`,
        });
        // Still apply closest neighborhood so visitor can preview services
        onLocationDetected(res.neighborhood, res.postalCode, res);
      } else {
        setFeedback({
          type: 'success',
          title:
            currentLang === 'fi'
              ? `Sijainti tunnistettu: ${res.neighborhood.names.fi} (${res.postalCode})`
              : currentLang === 'sv'
              ? `Plats identifierad: ${res.neighborhood.names.sv} (${res.postalCode})`
              : `Location Detected: ${res.neighborhood.names.en} (${res.postalCode})`,
          message:
            currentLang === 'fi'
              ? `Paikalliset siivoushinnat, vapaat siivooja-ajat ja etukoodi ${res.neighborhood.specialOffer.code} on aktivoitu sivustolle!`
              : currentLang === 'sv'
              ? `Lokala städpriser, lediga städtider och förmånskoden ${res.neighborhood.specialOffer.code} har aktiverats på alla sidor!`
              : `Local cleaning rates, real-time cleaner slots, and promo code ${res.neighborhood.specialOffer.code} have been activated for all pages!`,
        });

        onLocationDetected(res.neighborhood, res.postalCode, res);

        // Auto dismiss success toast after 6 seconds
        setTimeout(() => {
          setFeedback(null);
          onDismiss();
        }, 6000);
      }
    } catch (err: any) {
      setIsDetecting(false);
      const code = err.message;
      if (code === 'PERMISSION_DENIED') {
        savePermissionStatus('denied');
        setFeedback({
          type: 'warning',
          title:
            currentLang === 'fi'
              ? 'Sijaintilupa evätty selaimessa'
              : currentLang === 'sv'
              ? 'Platsbehörighet nekad'
              : 'Location permission denied',
          message:
            currentLang === 'fi'
              ? 'Voit silti valita kaupunginosasi tai syöttää postinumeron (esim. 00180) hakukenttäämme saadaksesi kohdennetut tiedot.'
              : currentLang === 'sv'
              ? 'Inga problem! Du kan enkelt söka efter din stadsdel eller ange postnummer (t.ex. 00180) för att anpassa tjänsterna.'
              : 'No problem! You can easily search your neighborhood or postal code (e.g. 00180) to personalize all services.',
        });
      } else {
        setFeedback({
          type: 'error',
          title:
            currentLang === 'fi'
              ? 'Sijaintia ei voitu hakea'
              : currentLang === 'sv'
              ? 'Kunde inte fastställa position'
              : 'Could not determine location',
          message:
            currentLang === 'fi'
              ? 'GPS-signaali ei ollut saatavilla tai aikakatkaistiin. Voit valita alueesi käsin.'
              : currentLang === 'sv'
              ? 'GPS-signalen var inte tillgänglig eller tog för lång tid. Du kan välja ditt område manuellt.'
              : 'GPS signal was unavailable or timed out. You can select your area manually.',
        });
      }
    }
  };

  const handleDismissPrompt = () => {
    setPromptDismissed(true);
    onDismiss();
  };

  return (
    <aside
      aria-label={
        currentLang === 'fi'
          ? 'Sijainnin tunnistus'
          : currentLang === 'sv'
          ? 'Identifiering av plats'
          : 'Location Detection'
      }
      className="relative z-40 bg-gradient-to-r from-[#142c42] via-[#102a3f] to-[#0a464c] text-white border-b border-[#0d9d8c]/30 shadow-md transition-all animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm">
        {/* Left side: Icon & Text or Feedback */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="flex-shrink-0 mt-0.5 sm:mt-0 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-[#69dfbd]">
            {isDetecting ? (
              <Loader2 className="h-5 w-5 animate-spin text-[#69dfbd]" />
            ) : feedback?.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-[#69dfbd]" />
            ) : feedback?.type === 'warning' || feedback?.type === 'error' ? (
              <AlertCircle className="h-5 w-5 text-[#ffb17a]" />
            ) : (
              <div className="relative">
                <Crosshair className="h-5 w-5 text-[#69dfbd]" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#69dfbd] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#69dfbd]"></span>
                </span>
              </div>
            )}
          </div>

          <div>
            {feedback ? (
              <div>
                <p className="font-bold text-white text-[13.5px] sm:text-[14.5px] flex items-center gap-2">
                  <span>{feedback.title}</span>
                  {feedback.type === 'success' && (
                    <span className="text-[10px] uppercase tracking-wider bg-[#0d9d8c] text-white px-2 py-0.5 rounded-full font-bold">
                      {currentLang === 'fi' ? 'Aktiivinen' : currentLang === 'sv' ? 'Aktiv' : 'Active'}
                    </span>
                  )}
                </p>
                <p className="text-xs text-[#c9dce3] mt-0.5 max-w-2xl leading-relaxed">
                  {feedback.message}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-white text-[13.5px] sm:text-[14.5px] flex items-center gap-2">
                  <span>
                    {currentLang === 'fi'
                      ? 'Haluatko siivoustiedot ja hinnat omalle asuinalueellesi?'
                      : currentLang === 'sv'
                      ? 'Vill du se städtjänster och priser för ditt område?'
                      : 'Get accurate cleaning rates & availability for your neighborhood?'}
                  </span>
                  <span className="hidden sm:inline-flex text-[10px] uppercase tracking-wider bg-[#ff8d43] text-[#10263d] px-2 py-0.5 rounded-full font-extrabold">
                    {currentLang === 'fi' ? 'Paikallinen etu' : currentLang === 'sv' ? 'Lokal förmån' : 'Local Perks'}
                  </span>
                </p>
                <p className="text-xs text-[#c9dce3] mt-0.5 max-w-2xl leading-relaxed">
                  {currentLang === 'fi'
                    ? 'Salli sijaintisi, niin näet suoraan lähimmät vapaat siivooja-ajat, tarkan hinnoittelun ja kaupunginosasi erikoisalennukset kaikilla sivuilla.'
                    : currentLang === 'sv'
                    ? 'Tillåt platsåtkomst för att se lediga städtider, lokala priser och rabatter på alla sidor.'
                    : 'Allow location detection to view nearest available cleaner slots, accurate pricing, and area discounts across all pages.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right side: Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 self-end sm:self-center">
          {!feedback || feedback.type !== 'success' ? (
            <>
              <button
                onClick={handleRequestLocation}
                disabled={isDetecting}
                className="flex min-h-[38px] items-center gap-2 rounded-xl bg-[#0d9d8c] hover:bg-[#10b3a0] active:scale-98 px-3.5 sm:px-4 py-2 text-xs font-bold text-white shadow-sm transition-all cursor-pointer disabled:opacity-60"
              >
                {isDetecting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>
                      {currentLang === 'fi'
                        ? 'Tunnistetaan...'
                        : currentLang === 'sv'
                        ? 'Identifierar...'
                        : 'Detecting...'}
                    </span>
                  </>
                ) : (
                  <>
                    <MapPin className="h-3.5 w-3.5 text-white" />
                    <span>
                      {currentLang === 'fi'
                        ? 'Salli ja tunnista sijainti'
                        : currentLang === 'sv'
                        ? 'Tillåt och identifiera'
                        : 'Allow & Detect Location'}
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenManualSearch}
                className="flex min-h-[38px] items-center gap-1.5 rounded-xl border border-white/25 bg-white/10 hover:bg-white/20 active:scale-98 px-3 py-2 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                <span>
                  {currentLang === 'fi'
                    ? 'Valitse käsin'
                    : currentLang === 'sv'
                    ? 'Välj manuellt'
                    : 'Choose manually'}
                </span>
              </button>

              <button
                onClick={handleDismissPrompt}
                title={
                  currentLang === 'fi'
                    ? 'Sulje ilmoitus'
                    : currentLang === 'sv'
                    ? 'Stäng avisering'
                    : 'Dismiss notice'
                }
                aria-label={currentLang === 'fi' ? 'Sulje' : currentLang === 'sv' ? 'Stäng' : 'Close'}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#c9dce3] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setFeedback(null);
                onDismiss();
              }}
              className="flex min-h-[36px] items-center gap-1.5 rounded-xl bg-white/15 hover:bg-white/25 px-3 py-1.5 text-xs font-bold text-white transition-all cursor-pointer"
            >
              <span>{currentLang === 'fi' ? 'Sulje' : currentLang === 'sv' ? 'Stäng' : 'Dismiss'}</span>
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
