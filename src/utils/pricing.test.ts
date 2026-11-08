import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEstimate, getAvailableSlots, formatEuro } from './pricing';

test('calculateEstimate returns valid result for default 70m2 hourly home cleaning', () => {
  const result = calculateEstimate({
    model: 'hourly',
    service: 'standard',
    area: 70,
  });

  assert.equal(result.model, 'hourly');
  assert.equal(result.service, 'standard');
  assert.equal(result.area, 70);
  assert.ok(result.hours >= 2.5);
  assert.equal(result.total, result.hours * 43);
});

test('calculateEstimate handles extras correctly for fixed price', () => {
  const result = calculateEstimate({
    model: 'fixed',
    service: 'standard',
    area: 50,
    extras: ['windows', 'oven'],
  });

  assert.equal(result.extras.length, 2);
  assert.equal(result.extrasTotal, 29 + 24); // 53€
  assert.ok(result.total >= 149 + 53);
});

test('calculateEstimate throws error for invalid area', () => {
  assert.throws(() => {
    calculateEstimate({ area: 5 });
  }, /Pinta-alan/);

  assert.throws(() => {
    calculateEstimate({ area: 1500 });
  }, /Pinta-alan/);
});

test('getAvailableSlots returns slots on weekdays and empty on Sunday', () => {
  // 2026-11-09 is Monday
  const mondaySlots = getAvailableSlots('2026-11-09');
  assert.deepEqual(mondaySlots, ['09:00', '11:00', '13:00', '15:00']);

  // 2026-11-08 is Sunday
  const sundaySlots = getAvailableSlots('2026-11-08');
  assert.deepEqual(sundaySlots, []);
});

test('formatEuro formats properly', () => {
  const fiFormatted = formatEuro(149, 'fi');
  assert.ok(fiFormatted.includes('149'));
  assert.ok(fiFormatted.includes('€'));
});
