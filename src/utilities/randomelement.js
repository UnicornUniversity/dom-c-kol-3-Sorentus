export function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function getRandomGender() {
  return Math.random() < 0.5 ? "male" : "female";
}

export function randomBirthday(minAge, maxAge) {
  const now = Date.now();
  const yearMs = 365.25 * 24 * 60 * 60 * 1000;

  const youngest = now - minAge * yearMs;
  const oldest   = now - maxAge * yearMs;

  const randomTime = oldest + Math.random() * (youngest - oldest);

  return new Date(randomTime).toISOString();
}

export function randomWorkload() {
  const options = [10, 20, 30, 40];
  return getRandomElement(options);
}
