const validDuration = /^( ?\d+[wdhm] ?)+$/;

export function validateDuration(duration) {
  return typeof duration === 'string' && validDuration.test(duration);
}

export function parseDuration(duration) {
  const regex = /(\d+)([wdhm])/g;
  const units = { w: 7 * 24 * 60, d: 24 * 60, h: 60, m: 1 };

  let totalMinutes = 0;
  let match;

  while ((match = regex.exec(duration)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2];
    totalMinutes += value * units[unit];
  }

  const days = Math.floor(totalMinutes / (24 * 60));
  totalMinutes %= 24 * 60 * 60;
  const hours = Math.floor(totalMinutes / 60);
  totalMinutes %= 60 * 60;
  const minutes = Math.floor(totalMinutes);

  return { days, hours, minutes, seconds };
}
