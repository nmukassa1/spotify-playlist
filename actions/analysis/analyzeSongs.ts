'use server'

import { ApiResponse } from '@/types/api';
import { AnalysisType } from '@/types/analysis';

const analyzeSongsSchema = {
  songs: (songs: string[]) => songs.length > 0,
  analysisTypes: (types: string[]) => types.length > 0,
  options: (options: unknown) => typeof options === 'object',
  useBatchProcessing: (value: string) => value === 'true' || value === 'false',
};

export async function analyzeSongs(formData: FormData): Promise<ApiResponse<unknown>> {
  try {
    // Parse form data
    const songs = formData.get('songs')?.toString().split(',').filter(Boolean) || [];
    const analysisTypes = formData.get('analysisTypes')?.toString().split(',').filter(Boolean) as AnalysisType[] || [];
    const options = formData.get('options') ? JSON.parse(formData.get('options')?.toString() || '{}') : {};
    const useBatchProcessing = formData.get('useBatchProcessing') === 'true';

    // Validate input
    if (!analyzeSongsSchema.songs(songs)) {
      throw new Error('At least one song is required');
    }

    if (!analyzeSongsSchema.analysisTypes(analysisTypes)) {
      throw new Error('At least one analysis type is required');
    }

    // TODO: Implement actual analysis logic
    // For now, return a mock response
    const mockResult = {
      requestId: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      songsAnalyzed: songs.length,
      analysisTypes: analysisTypes,
      options: options,
      useBatchProcessing: useBatchProcessing,
    };

    return {
      success: true,
      data: mockResult,
      message: `Analysis request received for ${songs.length} songs`,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Error in analyzeSongs action:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to analyze songs',
      timestamp: Date.now(),
    };
  }
} 