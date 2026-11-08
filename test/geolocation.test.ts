import test from 'node:test';
import assert from 'node:assert/strict';
import { findClosestNeighborhoodByCoords, NEIGHBORHOODS } from '../src/data/locations';

test('findClosestNeighborhoodByCoords identifies Ruoholahti accurately from Ruoholahti coords', () => {
  // Ruoholahti coords: 60.1627, 24.9126
  const match = findClosestNeighborhoodByCoords(60.1630, 24.9130);
  assert.equal(match.neighborhood.id, 'ruoholahti');
  assert.ok(match.distanceKm < 0.2);
  assert.equal(match.isWithinCapitalRegion, true);
});

test('findClosestNeighborhoodByCoords identifies Kamppi accurately from Kamppi coords', () => {
  // Kamppi coords: 60.1699, 24.9384
  const match = findClosestNeighborhoodByCoords(60.1690, 24.9340);
  assert.equal(match.neighborhood.id, 'kamppi');
  assert.ok(match.distanceKm <= 0.5);
  assert.equal(match.isWithinCapitalRegion, true);
});

test('findClosestNeighborhoodByCoords identifies Tapiola accurately from Espoo coords', () => {
  // Tapiola coords: 60.1774, 24.8058
  const match = findClosestNeighborhoodByCoords(60.1780, 24.8060);
  assert.equal(match.neighborhood.id, 'tapiola');
  assert.equal(match.neighborhood.cityId, 'espoo');
  assert.ok(match.distanceKm <= 0.5);
  assert.equal(match.isWithinCapitalRegion, true);
});

test('findClosestNeighborhoodByCoords identifies Tikkurila accurately from Vantaa coords', () => {
  // Tikkurila coords: 60.2934, 25.0416
  const match = findClosestNeighborhoodByCoords(60.2940, 25.0420);
  assert.equal(match.neighborhood.id, 'tikkurila');
  assert.equal(match.neighborhood.cityId, 'vantaa');
  assert.ok(match.distanceKm < 0.2);
  assert.equal(match.isWithinCapitalRegion, true);
});

test('findClosestNeighborhoodByCoords flags locations far outside Capital region', () => {
  // Tampere coords: 61.4981, 23.7610 (approx 160km away)
  const match = findClosestNeighborhoodByCoords(61.4981, 23.7610);
  assert.equal(match.isWithinCapitalRegion, false);
  assert.ok(match.distanceKm > 100);
});

test('geolocation storage and permission state functions operate cleanly in node env', async () => {
  const {
    savePermissionStatus,
    checkGeolocationPermission,
    isPromptDismissed,
    setPromptDismissed,
  } = await import('../src/utils/geolocation');

  // In Node environment without navigator, checkGeolocationPermission should return 'unsupported'
  const perm = await checkGeolocationPermission();
  assert.equal(perm, 'unsupported');

  // Dismissal functions should not throw in Node environment
  assert.equal(isPromptDismissed(), false);
  setPromptDismissed(true);
  setPromptDismissed(false);
});
