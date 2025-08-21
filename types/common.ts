// Common types used across the application

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommonApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: number;
}

export interface PaginatedResponse<T> extends CommonApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: Record<string, unknown>;
  timestamp: number;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  progress?: number;
}

export interface CacheEntry<T = unknown> {
  key: string;
  data: T;
  createdAt: number;
  expiresAt: number;
  accessCount: number;
  lastAccessed: number;
}

export interface CommonBatchProcessingResult<T = unknown> {
  success: boolean;
  data: T[];
  errors: string[];
  totalProcessed: number;
  totalBatches: number;
  processingTime: number;
}

export interface ProgressTracker {
  current: number;
  total: number;
  percentage: number;
  status: 'idle' | 'processing' | 'completed' | 'error';
  message: string;
  startTime?: number;
  estimatedTimeRemaining?: number;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ConfigValue<T = unknown> {
  value: T;
  description: string;
  required: boolean;
  defaultValue?: T;
}

export interface EnvironmentConfig {
  [key: string]: ConfigValue;
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = unknown> {
  status: AsyncStatus;
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterOptions {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'contains' | 'startsWith' | 'endsWith';
  value: unknown;
}

export interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: SortOptions[];
  filters?: FilterOptions[];
  search?: string;
  include?: string[];
}

export interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: number;
  context?: Record<string, unknown>;
  error?: Error;
}

export interface PerformanceMetrics {
  operation: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, unknown>;
} 