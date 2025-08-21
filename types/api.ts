// API types and interfaces

export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  requiresAuth: boolean;
  rateLimit?: {
    requestsPerMinute: number;
    requestsPerHour: number;
  };
}

export interface ApiRequest<T = unknown> {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: T;
  params?: Record<string, string>;
  query?: Record<string, string>;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: number;
  requestId?: string;
  metadata?: {
    processingTime: number;
    cacheHit: boolean;
    rateLimitRemaining: number;
  };
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: number;
  requestId?: string;
  path?: string;
  method?: string;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

export interface ApiMetrics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  cacheHitRate: number;
  rateLimitHits: number;
  errorsByCode: Record<string, number>;
}

export interface ApiValidationError {
  field: string;
  message: string;
  code: string;
  value?: unknown;
}

export interface ApiValidationResult {
  isValid: boolean;
  errors: ApiValidationError[];
}

export interface ApiCacheConfig {
  enabled: boolean;
  ttl: number;
  maxSize: number;
  strategy: 'memory' | 'redis' | 'database';
}

export interface ApiMiddleware {
  name: string;
  enabled: boolean;
  order: number;
  config?: Record<string, unknown>;
}

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  headers: Record<string, string>;
  cache: ApiCacheConfig;
  middleware: ApiMiddleware[];
  rateLimiting: {
    enabled: boolean;
    requestsPerMinute: number;
    requestsPerHour: number;
  };
}

export interface WebhookPayload<T = unknown> {
  event: string;
  timestamp: number;
  data: T;
  signature?: string;
  source: string;
}

export interface WebhookConfig {
  url: string;
  events: string[];
  secret?: string;
  retryAttempts: number;
  retryDelay: number;
  timeout: number;
}

export interface ApiHealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: number;
  checks: {
    database: boolean;
    cache: boolean;
    externalApis: boolean;
    disk: boolean;
    memory: boolean;
  };
  responseTime: number;
  version: string;
}

export interface ApiLogEntry {
  timestamp: number;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  method: string;
  path: string;
  statusCode: number;
  responseTime: number;
  userAgent?: string;
  ip?: string;
  userId?: string;
  requestId: string;
  metadata?: Record<string, unknown>;
} 