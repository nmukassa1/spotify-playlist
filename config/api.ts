// API configuration and endpoints

export const API_ENDPOINTS = {
  spotify: {
    auth: '/api/auth/spotify',
    callback: '/api/auth/callback/spotify',
    tracks: 'https://api.spotify.com/v1/tracks',
    profile: '/api/spotify/profile',
  },
  analysis: {
    analyze: '/api/analysis/analyze',
    insights: '/api/analysis/insights',
    batch: '/api/analysis/batch',
    cache: '/api/analysis/cache',
  },
  songs: {
    fetch: '/api/songs',
  },
} as const;

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 30000, // 30 seconds
  retries: 3,
  retryDelay: 1000, // 1 second
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
} as const;

export const RATE_LIMITS = {
  spotify: {
    requestsPerMinute: 60,
    requestsPerHour: 1000,
  },
  openai: {
    requestsPerMinute: 60,
    requestsPerHour: 500,
  },
  general: {
    requestsPerMinute: 100,
    requestsPerHour: 2000,
  },
} as const;

export const CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=3600, s-maxage=86400',
  'ETag': 'true',
} as const;

export const ERROR_CODES = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  RATE_LIMITED: 429,
  INTERNAL_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const; 