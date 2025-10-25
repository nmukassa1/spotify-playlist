"use client";
import { TrackParentNode } from "@/lib/spotify/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Type for a Spotify Track. This can be replaced with a more specific type.
type Song = TrackParentNode;

type SongContextType = {
  songs: Song[] | null;
  setSongs: (songs: Song[]) => void;
};

const SongContext = createContext<SongContextType | undefined>(undefined);

export function SongProvider({ children }: { children: ReactNode }) {
  const [songs, setSongs] = useState<Song[] | null>(null);

  return (
    <SongContext.Provider value={{ songs, setSongs }}>
      {children}
    </SongContext.Provider>
  );
}

export function useSongContext(): SongContextType {
  const context = useContext(SongContext);
  if (!context) {
    throw new Error("useSongContext must be used within a SongProvider");
  }
  return context;
}
