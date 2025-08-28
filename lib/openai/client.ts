"use server" // Marks this file as a server-side only module in Next.js
import OpenAI from "openai"; // Imports the OpenAI SDK for making API calls

import { kmeans } from "ml-kmeans"; // Imports k-means clustering algorithm from ml-kmeans library
// import { ANALYSIS_PROMPTS } from "./prompts"; // Commented out import for analysis prompts

// Environment variable validation - ensures OpenAI API key is configured
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

// Creates an OpenAI client instance with the configured API key
const openAiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


/**
 * Goal: Analyzes a list of songs to generate embeddings for playlist recommendations
 * Purpose: Creates vector representations of songs that can be used for similarity analysis
 */
export async function analyzePlaylistRecommendations(songs: string[]) {
  try {
    // Creates embeddings (vector representations) for all songs in a single API call
    // This is more efficient than calling the API for each song individually
    const response = await openAiClient.embeddings.create({
      model: "text-embedding-3-small", // Uses OpenAI's latest small embedding model
      input: songs, // Passes the array of song strings directly to the API
    });

    // Extracts the embedding vectors from the API response
    // Each item in response.data corresponds to a song and contains its vector
    const embeddings = response.data.map(item => item.embedding);

    // Logs the generated embeddings for debugging purposes
    console.log("Generated embeddings:", embeddings);

    // Returns the vector representations for use in clustering or similarity calculations
    return embeddings;
  } catch (error) {
    // Error handling: logs the error and throws a user-friendly error message
    console.error("Error analyzing playlist recommendations:", error);
    throw new Error("Failed to analyze playlist recommendations");
  }
}

/**
 * Goal: Generates individual embeddings for each song in a list
 * Purpose: Creates vector representations that can be used for detailed song analysis
 * Note: This approach makes individual API calls for each song (less efficient than batch)
 */
export async function getSongEmbeddings(songs: string[]) {
  const embeddings = []; // Array to store song-vector pairs

  // Iterates through each song to generate individual embeddings
  for (const song of songs) {
    // Makes an API call to OpenAI for each individual song
    const response = await openAiClient.embeddings.create({
      model: "text-embedding-3-small", // Uses the same embedding model
      input: song, // Input is a single song string (e.g., "Drake - Passionfruit")
    });
    
    // Pushes an object containing the song name and its vector representation
    embeddings.push({
      song, // The original song string
      vector: response.data[0].embedding // The embedding vector (first and only result)
    });
  }

  // Returns array of objects with song names and their corresponding vectors
  return embeddings;
}


/**
 * Goal: Groups songs into clusters based on their vector similarity
 * Purpose: Creates playlists by finding songs with similar musical characteristics
 * @param embeddings - Array of song-vector pairs
 * @param k - Number of desired playlists/clusters
 */
function clusterSongs(embeddings: { song: string, vector: number[] }[], k: number) {
  // Extracts just the vector arrays from the embeddings for clustering
  const vectors = embeddings.map(e => e.vector);
  
  // Applies k-means clustering algorithm to group similar vectors together
  // ml-kmeans expects: data (vectors), k (number of clusters), and options (empty object)
  const result = kmeans(vectors, k, {});

  // Object to store the resulting playlists, keyed by cluster index
  const playlists: Record<number, string[]> = {};

  // Iterates through the clustering results to organize songs into playlists
  result.clusters.forEach((clusterIndex: number, i: number) => {
    // Creates a new playlist array if this cluster doesn't exist yet
    if (!playlists[clusterIndex]) playlists[clusterIndex] = [];
    
    // Adds the song to its assigned playlist based on cluster assignment
    playlists[clusterIndex].push(embeddings[i].song);
  });

  // Returns the organized playlists with songs grouped by similarity
  return playlists;
}

/**
 * Goal: Automatically segments a list of songs into multiple playlists based on similarity
 * Purpose: Creates intelligent playlist groupings without manual curation
 * @param songs - Array of song strings to organize
 * @param numPlaylists - Target number of playlists to create
 */
export async function segmentSongsIntoPlaylists(songs: string[], numPlaylists: number) {
  // First step: generates embeddings for all songs
  const embeddings = await getSongEmbeddings(songs);
  
  // Second step: applies clustering to group similar songs together
  const playlists = clusterSongs(embeddings, numPlaylists);
  
  // Returns the organized playlists with songs grouped by musical similarity
  return playlists;
}