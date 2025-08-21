import { NextRequest, NextResponse } from 'next/server';
import { fetchSongs } from '@/lib/spotify/queries';

export async function POST(request: NextRequest) {
  try {
    const { playlists } = await request.json();
    
    if (!playlists || !Array.isArray(playlists)) {
      return NextResponse.json(
        { error: 'Invalid playlists data' },
        { status: 400 }
      );
    }

    const songs = await fetchSongs(playlists);
    
    return NextResponse.json({
      success: true,
      songs,
      totalSongs: songs.length
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch songs' },
      { status: 500 }
    );
  }
} 