/**
 * Session persistence helpers.
 * Uses both localStorage (fast) and a long-lived cookie (resilient to cache clearing).
 */

export const REGISTERED_KEY = "aibc_registered";
const COOKIE_NAME = "aibc_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

/** Write session to both localStorage and a 1-year cookie. */
export function setSession(name: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(REGISTERED_KEY, "true");
  localStorage.setItem("user_name", name);
  document.cookie = [
    `${COOKIE_NAME}=1`,
    `max-age=${COOKIE_MAX_AGE}`,
    "path=/",
    "SameSite=Strict",
  ].join("; ");
  document.cookie = [
    `aibc_name=${encodeURIComponent(name)}`,
    `max-age=${COOKIE_MAX_AGE}`,
    "path=/",
    "SameSite=Strict",
  ].join("; ");
}

/** Returns true if the session cookie is present. */
export function hasCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some(c => c.trim().startsWith(`${COOKIE_NAME}=`));
}

/** Returns the name stored in the cookie (if any). */
export function getNameFromCookie(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.split(";").find(c => c.trim().startsWith("aibc_name="));
  return match ? decodeURIComponent(match.trim().split("=")[1] ?? "") : "";
}

/**
 * Restore localStorage from cookie if the cookie exists but localStorage is empty.
 * Call this on app init. Returns true if session was restored from cookie.
 */
export function restoreFromCookie(): boolean {
  if (typeof window === "undefined") return false;
  const alreadyInStorage = localStorage.getItem(REGISTERED_KEY) === "true";
  if (alreadyInStorage) return false;
  if (!hasCookie()) return false;
  // Cookie exists but localStorage is empty — restore silently
  localStorage.setItem(REGISTERED_KEY, "true");
  const name = getNameFromCookie();
  if (name) localStorage.setItem("user_name", name);
  return true;
}

/** Clear session from both localStorage and cookies. */
export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(REGISTERED_KEY);
  localStorage.removeItem("user_name");
  document.cookie = `${COOKIE_NAME}=; max-age=0; path=/`;
  document.cookie = `aibc_name=; max-age=0; path=/`;
}
