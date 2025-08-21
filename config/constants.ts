// Application constants and configuration values

export const APP_CONFIG = {
  name: 'Spotify Playlist Analyzer',
  version: '1.0.0',
  description: 'AI-powered music analysis for your Spotify playlists',
} as const;

export const SPOTIFY_CONFIG = {
  apiBaseUrl: 'https://api.spotify.com/v1',
  authUrl: 'https://accounts.spotify.com/authorize',
  tokenUrl: 'https://accounts.spotify.com/api/token',
  scopes: [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-library-read',
  ].join(' '),
} as const;

export const OPENAI_CONFIG = {
  defaultModel: 'gpt-3.5-turbo',
  maxTokens: 500,
  temperature: 0.7,
  batchSize: 20,
  rateLimitDelay: 1000, // 1 second
  maxRequestsPerMinute: 60,
} as const;

export const ANALYSIS_CONFIG = {
  defaultBatchSize: 20,
  maxConcurrentBatches: 3,
  delayBetweenBatches: 2000, // 2 seconds
  cacheTTL: 24 * 60 * 60 * 1000, // 24 hours
  maxCacheSize: 1000,
} as const;

export const UI_CONFIG = {
  maxSongsPerPage: 50,
  defaultPlaylistLimit: 20,
  animationDuration: 300,
  debounceDelay: 500,
} as const;

export const ERROR_MESSAGES = {
  spotify: {
    authFailed: 'Spotify authentication failed',
    playlistNotFound: 'Playlist not found',
    tracksFetchFailed: 'Failed to fetch playlist tracks',
    rateLimited: 'Rate limit exceeded, please try again later',
  },
  openai: {
    apiError: 'OpenAI API error occurred',
    rateLimited: 'OpenAI rate limit exceeded',
    invalidResponse: 'Invalid response from OpenAI',
    analysisFailed: 'Analysis failed, please try again',
  },
  general: {
    networkError: 'Network error occurred',
    unknownError: 'An unknown error occurred',
    validationFailed: 'Validation failed',
  },
} as const;

export const SUCCESS_MESSAGES = {
  analysis: {
    completed: 'Analysis completed successfully',
    cached: 'Results loaded from cache',
    insightsGenerated: 'Insights generated successfully',
  },
  spotify: {
    playlistsFetched: 'Playlists fetched successfully',
    tracksFetched: 'Tracks fetched successfully',
    authSuccess: 'Spotify authentication successful',
  },
} as const; 