const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const API_FALLBACKS = ['http://localhost:5000', 'http://127.0.0.1:5000'];

export async function fetchPortfolioContent() {
  const candidates = API_BASE_URL ? [API_BASE_URL] : ['', ...API_FALLBACKS];
  let networkError = null;

  for (const baseUrl of candidates) {
    try {
      const response = await fetch(`${baseUrl}/api/content`);
      let payload = null;

      try {
        payload = await response.json();
      } catch {
        payload = null;
      }

      if (response.status === 404 && !API_BASE_URL) {
        continue;
      }

      if (!response.ok) {
        const message = payload?.message || 'Failed to load portfolio content.';
        throw new Error(message);
      }

      if (!payload || typeof payload !== 'object') {
        throw new Error('Backend returned invalid portfolio content.');
      }

      return payload;
    } catch (error) {
      networkError = error;
    }
  }

  if (networkError) {
    throw networkError;
  }

  throw new Error('Unable to load portfolio content.');
}
