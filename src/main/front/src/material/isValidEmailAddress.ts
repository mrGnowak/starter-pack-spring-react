export function isValidEmailAddress(emailAddress: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
  }