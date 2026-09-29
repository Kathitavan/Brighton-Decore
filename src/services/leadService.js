// src/services/leadService.js
// Brighton Decor Ltd — Centralized Lead Submission Client

/**
 * Get the configured API base URL.
 * Falls back to current origin or relative path if not specified.
 */
export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (!envUrl) return '';
  return envUrl.replace(/\/+$/, '');
}

/**
 * Submit lead payload to unified /api/lead endpoint.
 *
 * @param {Object} payload
 * @param {string} payload.type - 'general' | '3d_studio' | 'quote' | 'measurement' | 'team'
 * @param {string} payload.name - Customer full name
 * @param {string} payload.email - Customer email address
 * @param {string} [payload.phone] - Customer phone number
 * @param {string} [payload.message] - Project description or message
 * @param {string} [payload.website] - Honeypot field (must remain empty)
 * @param {Object} [payload.roomLook] - 3D room configuration state (3d_studio only)
 * @param {string} [payload.screenshotBase64] - Captured 3D Canvas PNG base64 data (3d_studio only)
 * @param {string} [payload.productName] - Product name (quote only)
 * @param {string} [payload.productId] - Product ID (quote only)
 * @param {string} [payload.serviceName] - Service name (measurement only)
 * @param {string} [payload.preferredDate] - Desired measurement date (measurement only)
 * @param {string} [payload.preferredTime] - Desired measurement time window (measurement only)
 *
 * @returns {Promise<{ success: boolean, referenceId: string, message: string }>}
 */
export async function submitLead(payload) {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/lead`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Unable to connect to lead concierge. Please try again or call us directly.');
  }

  if (!response.ok) {
    throw new Error(data.error || 'Submission failed. Please check your information and try again.');
  }

  return data;
}
