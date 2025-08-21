// OpenAI API response types
export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenAIChoice[];
  usage: OpenAIUsage;
}

export interface OpenAIChoice {
  index: number;
  message: OpenAIMessage;
  finish_reason: string;
}

export interface OpenAIMessage {
  role: string;
  content: string;
}

export interface OpenAIUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

// Analysis request types
export interface AnalysisRequest {
  songs: string[];
  analysisType: AnalysisType;
  options?: AnalysisOptions;
}

export type AnalysisType = 
  | 'genre'
  | 'mood'
  | 'themes'
  | 'recommendations'
  | 'cultural'
  | 'batch'
  | 'comprehensive';

export interface AnalysisOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  batchSize?: number;
  includeMetadata?: boolean;
}

// Analysis result types
export interface BaseAnalysisResult {
  success: boolean;
  timestamp: number;
  requestId: string;
  analysisType: AnalysisType;
  songsAnalyzed: number;
}

export interface SuccessfulAnalysisResult extends BaseAnalysisResult {
  success: true;
  data: AnalysisData;
  model: string;
  usage: OpenAIUsage;
}

export interface FailedAnalysisResult extends BaseAnalysisResult {
  success: false;
  error: string;
  errorCode?: string;
  retryable: boolean;
}

export type AnalysisResult = SuccessfulAnalysisResult | FailedAnalysisResult;

export interface AnalysisData {
  content: string;
  structuredData?: Record<string, unknown>;
  confidence?: number;
  metadata?: Record<string, unknown>;
}

// Batch processing types
export interface BatchAnalysisRequest {
  songs: string[];
  batchSize?: number;
  analysisTypes: AnalysisType[];
  options?: AnalysisOptions;
}

export interface BatchAnalysisResponse {
  requestId: string;
  totalBatches: number;
  successfulBatches: number;
  failedBatches: number;
  results: AnalysisResult[];
  summary: BatchSummary;
}

export interface BatchSummary {
  totalSongs: number;
  processedSongs: number;
  averageProcessingTime: number;
  successRate: number;
  commonErrors: string[];
}

// Cache types
export interface AnalysisCacheEntry {
  key: string;
  result: AnalysisResult;
  createdAt: number;
  expiresAt: number;
  accessCount: number;
  lastAccessed: number;
}

export interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize: number; // Maximum number of entries
  cleanupInterval: number; // Cleanup interval in milliseconds
}

// Rate limiting types
export interface RateLimitConfig {
  requestsPerMinute: number;
  requestsPerHour: number;
  burstLimit: number;
  retryAfter: number;
}

export interface RateLimitStatus {
  current: number;
  limit: number;
  resetTime: number;
  remaining: number;
  retryAfter?: number;
}

// Error types
export interface OpenAIError {
  type: 'openai_error' | 'rate_limit' | 'quota_exceeded' | 'invalid_request' | 'server_error';
  message: string;
  code?: string;
  retryable: boolean;
  retryAfter?: number;
}

// Utility types
export type SongData = string | { title: string; artist: string };

export interface AnalysisProgress {
  current: number;
  total: number;
  percentage: number;
  currentBatch: number;
  totalBatches: number;
  status: 'idle' | 'processing' | 'completed' | 'error';
  message: string;
} 