# Spotify Playlist Analyzer

An AI-powered music analysis application that analyzes your Spotify playlists using OpenAI to provide insights about genres, moods, themes, and recommendations.

## 🏗️ Project Structure

```
spotify-playlist/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication
│   ├── dashboard/         # Dashboard page
│   ├── landing/           # Landing page
│   └── layout.tsx         # Root layout
├── components/             # UI Components
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── spotify/           # Spotify-specific components
│   ├── dashboard/         # Dashboard components
│   ├── landing/           # Landing page components
│   └── common/            # Shared components
├── lib/                    # Core libraries
│   ├── spotify/           # Spotify API integration
│   ├── openai/            # OpenAI analysis layer
│   ├── analysis/          # Music analysis engines
│   ├── cache/             # Caching layer
│   ├── utils/             # Utility functions
│   └── hooks/             # React hooks
├── actions/                # Server Actions
│   ├── spotify/           # Spotify operations
│   ├── analysis/          # Analysis operations
│   └── cache/             # Cache management
├── config/                 # Configuration
│   ├── constants.ts       # App constants
│   └── api.ts             # API configuration
├── types/                  # TypeScript types
│   ├── common.ts          # Common types
│   ├── spotify.ts         # Spotify types
│   ├── analysis.ts        # Analysis types
│   └── api.ts             # API types
└── docs/                   # Documentation
    └── PLAYLIST_ARCHITECTURE.md
```

## 🚀 Features

- **Spotify Integration**: Fetch and analyze your playlists
- **AI Analysis**: OpenAI-powered genre, mood, and theme analysis
- **Batch Processing**: Handle large song collections efficiently
- **Caching**: Intelligent caching for analysis results
- **Server Actions**: Modern Next.js 13+ data fetching
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

- **Frontend**: Next.js 13+, React, TypeScript
- **UI**: shadcn/ui components, Tailwind CSS
- **AI**: OpenAI GPT models
- **Caching**: In-memory + Redis support
- **Authentication**: Spotify OAuth

## 📦 Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   ```env
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   OPENAI_API_KEY=your_openai_api_key
   ```
4. Run the development server: `npm run dev`

## 🔧 Development

### Adding New Analysis Types

1. Add the analysis type to `types/analysis.ts`
2. Create the analysis engine in `lib/analysis/`
3. Add prompts in `lib/openai/prompts/`
4. Create Server Actions in `actions/analysis/`

### Adding New Components

1. Place in appropriate category folder under `components/`
2. Use existing UI components from `components/ui/`
3. Follow the established naming conventions

### Adding New Types

1. Create in appropriate file under `types/`
2. Export from `types/index.ts`
3. Use consistent naming conventions

## 📚 Architecture

The application follows a modular architecture with clear separation of concerns:

- **Components**: UI presentation layer
- **Actions**: Server-side data operations
- **Lib**: Core business logic and external integrations
- **Types**: TypeScript type definitions
- **Config**: Application configuration

## 🤝 Contributing

1. Follow the established folder structure
2. Use TypeScript for all new code
3. Follow the existing naming conventions
4. Add proper error handling and validation
5. Update types and documentation as needed

## 📄 License

This project is licensed under the MIT License.
