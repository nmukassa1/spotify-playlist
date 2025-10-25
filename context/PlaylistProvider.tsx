"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Playlist } from "@/lib/spotify/types";

type PlaylistContextType = {
  playlists: Playlist[] | null;
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[] | null>>;
};

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);

  return (
    <PlaylistContext.Provider value={{ playlists, setPlaylists }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylistContext = (): PlaylistContextType => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylistContext must be used within a PlaylistProvider");
  }
  return context;
};
