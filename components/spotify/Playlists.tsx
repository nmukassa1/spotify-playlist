"use client";
import React, { useState } from "react";
import { usePlaylistContext } from "@/context/PlaylistProvider";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

function Playlists() {
  const { playlists } = usePlaylistContext();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!playlists) {
    return (
      <div className="flex justify-center items-center h-32">
        <span className="text-gray-400">No playlists found.</span>
      </div>
    );
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <div 
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-300 ease-in-out ${
          isExpanded ? 'h-auto' : 'h-[600px] overflow-hidden'
        }`}
      >
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-zinc-900 rounded-lg shadow-md p-6 flex flex-col items-center"
          >
            {playlist.images && playlist.images.length > 0 && (
              <Image
                src={playlist.images[0].url}
                alt={playlist.name}
                className="w-28 h-28 rounded-md mb-4 object-cover shadow"
                width={112}
                height={112}
              />
            )}
            <h2 className="text-lg font-semibold mb-1 text-center">{playlist.name}</h2>
            <p className="text-sm text-gray-400 mb-2 text-center">
              {playlist.owner?.display_name || "Unknown Owner"}
            </p>
            <p className="text-xs text-zinc-400">
              {playlist.tracks?.total ?? 0} songs
            </p>
          </div>
        ))}
      </div>
      
      
      <div className="flex justify-center mt-4">
        <button
          onClick={toggleExpanded}
          className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg shadow-lg transition-colors duration-200 border border-zinc-700 hover:border-zinc-600"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show More
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Playlists;

