// Music analysis types and interfaces

export interface AnalysisRequest {
  songs: string[];
  analysisTypes: AnalysisType[];
  options?: AnalysisOptions;
  useBatchProcessing?: boolean;
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
  confidenceThreshold?: number;
}

export interface AnalysisResult {
  success: boolean;
  data?: string;
  error?: string;
  model?: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  confidence?: number;
  metadata?: Record<string, unknown>;
}

export interface GenreAnalysisResult {
  primaryGenre: string;
  confidence: number;
  subGenres: string[];
  genreDescription: string;
  examples: string[];
}

export interface MoodAnalysisResult {
  primaryMood: string;
  secondaryMoods: string[];
  intensity: number; // 0-1 scale
  confidence: number;
  moodDescription: string;
  emotionalTags: string[];
}

export interface ThemeAnalysisResult {
  primaryThemes: string[];
  secondaryThemes: string[];
  themePatterns: ThemePattern[];
  culturalContext: string[];
  confidence: number;
  themeDescription: string;
}

export interface ThemePattern {
  theme: string;
  frequency: number;
  examples: string[];
  strength: number; // 0-1 scale
}

export interface CulturalContext {
  region: string;
  era: string;
  socialThemes: string[];
  culturalInfluences: string[];
  languageIndicators: string[];
}

export interface BatchAnalysisResult {
  genre: string;
  mood: string;
  themes: string;
  confidence: number;
}

export interface ComprehensiveAnalysisResult {
  requestId: string;
  timestamp: number;
  songsAnalyzed: number;
  results: {
    genre: AnalysisResult;
    mood: AnalysisResult;
    themes: AnalysisResult;
    recommendations: AnalysisResult;
  };
  summary: AnalysisSummary;
  processingTime: number;
}

export interface AnalysisSummary {
  totalSongs: number;
  successRate: number;
  primaryGenre?: string;
  dominantMood?: string;
  keyThemes: string[];
  recommendations: string[];
  errors: string[];
  confidence: number;
}

export interface MusicInsight {
  type: 'genre' | 'mood' | 'theme' | 'pattern' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  suggestions?: string[];
  examples?: string[];
  metadata?: Record<string, unknown>;
}

export interface PlaylistInsights {
  summary: string;
  insights: MusicInsight[];
  recommendations: string[];
  statistics: {
    totalSongs: number;
    genreDistribution: Record<string, number>;
    moodDistribution: Record<string, number>;
    themeStrength: Record<string, number>;
    culturalDiversity: number;
  };
}

export interface AnalysisProgress {
  current: number;
  total: number;
  percentage: number;
  currentBatch: number;
  totalBatches: number;
  status: 'idle' | 'processing' | 'completed' | 'error';
  message: string;
  startTime?: number;
  estimatedTimeRemaining?: number;
}

export interface BatchProcessingConfig {
  batchSize: number;
  delayBetweenBatches: number;
  maxConcurrentBatches: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface BatchProcessingResult {
  success: boolean;
  results: BatchAnalysisResult[];
  errors: string[];
  totalProcessed: number;
  totalBatches: number;
  processingTime: number;
  averageConfidence: number;
}

export interface AnalysisCacheEntry {
  key: string;
  result: AnalysisResult | ComprehensiveAnalysisResult;
  createdAt: number;
  expiresAt: number;
  accessCount: number;
  lastAccessed: number;
  metadata: {
    songsCount: number;
    analysisTypes: AnalysisType[];
    processingTime: number;
  };
}

export interface AnalysisMetrics {
  totalAnalyses: number;
  averageProcessingTime: number;
  successRate: number;
  cacheHitRate: number;
  mostAnalyzedGenres: Array<{ genre: string; count: number }>;
  mostAnalyzedMoods: Array<{ mood: string; count: number }>;
  popularThemes: Array<{ theme: string; frequency: number }>;
} 