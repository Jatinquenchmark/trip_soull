const isProd = import.meta.env.PROD;
// In production, we MUST point to the Render backend url, not an empty string.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
