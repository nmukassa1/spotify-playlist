export interface AnalysisPrompt {
  system: string;
  user: string;
}

export const ANALYSIS_PROMPTS = {
  // Genre classification based on song titles and artists
  genreClassification: {
    system: `You are a music genre classification expert. Analyze song titles and artist names to determine the most likely genre. Consider:
    - Artist name patterns and associations
    - Song title themes and language
    - Cultural and historical context
    - Common genre indicators in naming conventions
    
    Respond with ONLY the genre name, nothing else.`,
    
    user: (songs: string[]) => `Classify the genre for these songs based on their titles and artists:
    ${songs.join('\n')}
    
    Genre:`
  },

  // Mood and emotional analysis
  moodAnalysis: {
    system: `You are a music psychology expert. Analyze the emotional tone and mood conveyed by these song titles and artists. Consider:
    - Word associations and emotional connotations
    - Artist name personality indicators
    - Title themes and emotional language
    - Cultural emotional associations
    
    Respond with 3-5 mood descriptors separated by commas.`,
    
    user: (songs: string[]) => `Analyze the emotional mood of these songs:
    ${songs.join('\n')}
    
    Mood:`
  },

  // Theme extraction and pattern recognition
  themeExtraction: {
    system: `You are a music analysis expert. Identify recurring themes, patterns, and insights from this collection of songs. Consider:
    - Common lyrical themes
    - Artist collaboration patterns
    - Musical style indicators
    - Cultural and social themes
    - Time period indicators
    
    Provide 3-5 key insights in bullet points.`,
    
    user: (songs: string[]) => `Extract themes and patterns from these songs:
    ${songs.join('\n')}
    
    Key Insights:`
  },

  // Playlist recommendations
  playlistRecommendations: {
    system: `You are a music curator and playlist expert. Based on the analysis of these songs, provide:
    - 3-5 playlist theme suggestions
    - Similar artists to explore
    - Mood-based playlist ideas
    - Genre expansion opportunities
    
    Format as a structured response with clear sections.`,
    
    user: (songs: string[]) => `Based on these songs, suggest playlist themes and recommendations:
    ${songs.join('\n')}
    
    Recommendations:`
  },

  // Cultural and social analysis
  culturalAnalysis: {
    system: `You are a music sociologist. Analyze the cultural and social context of these songs. Consider:
    - Cultural influences and origins
    - Social themes and messages
    - Historical context indicators
    - Demographic appeal patterns
    - Cross-cultural elements
    
    Provide insights about cultural significance and social themes.`,
    
    user: (songs: string[]) => `Analyze the cultural and social context of these songs:
    ${songs.join('\n')}
    
    Cultural Analysis:`
  }
};

export const BATCH_ANALYSIS_PROMPT = {
  system: `You are a music analysis expert. Analyze this batch of songs efficiently and provide:
    1. Genre classification (single most likely genre)
    2. Mood analysis (3-5 emotional descriptors)
    3. Key themes (2-3 main themes)
    
    Format your response as:
    Genre: [genre]
    Mood: [mood1, mood2, mood3]
    Themes: [theme1, theme2]`,
  
  user: (songs: string[]) => `Analyze this batch of songs:
    ${songs.join('\n')}`
}; 