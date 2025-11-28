export function validateAgeRange(minAge, maxAge) {
  if (minAge < 18 || maxAge > 60) {
    throw new Error("Age interval must be within <18, 60>.");
  }
  if (minAge > maxAge) {
    throw new Error("Invalid age interval: minAge cannot be greater than maxAge.");
  }
}
