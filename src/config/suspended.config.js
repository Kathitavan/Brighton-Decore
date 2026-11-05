/**
 * Configuration for the Hosting Inactive page
 * Note: Avoid the words "pending", "renewal", "suspended", "deactivated" in visible text.
 */
export const suspendedConfig = {
  documentTitle: "Hosting Inactive",
  backgroundImageUrl: "https://gettyimages.in/illustrations/page-not-found",
  word: "OFFLINE",
  wordColors: {
    part1: "#F5222D", // "OF"
    part2: "#12B5E5", // "FLI"
    part3: "#FFB800", // "NE"
  },
  label: "HOSTING INACTIVE",
  heading: "This website is currently unavailable.",
  paragraph:
    "The hosting plan for this domain has reached the end of its active term, so the site is no longer being served. To bring it back online or check on the domain's status, please get in touch with the developer.",
  statusRow: "Hosting plan: Expired • Site: Paused • Action needed",
  warningLine: "Please reach out soon to avoid a longer interruption.",
  ctaText: "Contact kathiravan.org",
  ctaUrl: "https://kathiravan.org",
  footerText: "Hosting managed by Kathiravan • © 2026",
};
