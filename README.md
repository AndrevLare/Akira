# Akira

A smart flashcard app for students based on the SM-2 spaced repetition algorithm. Akira helps you retain information longer by scheduling reviews at optimal intervals.

## Features

- **Spaced Repetition (SM-2)** - Scientifically proven algorithm to optimize learning retention
- **Push-to-Learn** - Respond to flashcards directly from notifications without opening the app
- **Dark/Light Mode** - Automatic theme switching based on system preferences
- **Cross-Platform** - Runs on iOS, Android, and Web

## Get Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the app

```bash
npx expo start
```

Then scan the QR code with Expo Go (mobile) or press:
- `a` - Open on Android emulator
- `i` - Open on iOS simulator
- `w` - Open in web browser

## Development

### Commands

```bash
npm install              # Install dependencies
npm start                # Start Expo dev server
npm run android          # Run on Android emulator
npm run ios              # Run on iOS simulator
npm run web              # Run on web browser
npm run lint             # Run ESLint
npm test                 # Run tests
```

### Tech Stack

- **Frontend:** React Native with Expo (Managed Workflow)
- **Language:** TypeScript (strict mode)
- **Routing:** expo-router (file-based routing)
- **Styling:** NativeWind (Tailwind CSS for mobile)
- **Database:** Supabase (PostgreSQL) + AsyncStorage for local persistence
- **Notifications:** Expo Notifications (Local Scheduling)
- **Algorithm:** SM-2 (SuperMemo 2) adapted for JavaScript

### Project Structure

```
P2L-App/
├── app/                 # File-based routes (expo-router)
│   ├── (tabs)/          # Tab navigation screens
│   ├── _layout.tsx      # Root layout with Stack navigator
│   └── +not-found.tsx   # 404 page
├── components/          # Reusable UI components
│   ├── themed-text.tsx  # Theme-aware text component
│   ├── themed-view.tsx  # Theme-aware view component
│   ├── external-link.tsx
│   └── ui/              # UI primitives (icons, collapsible, etc.)
├── constants/           # App-wide constants
│   └── theme.ts         # Color palettes for light/dark modes
├── hooks/               # Custom React hooks
│   ├── use-color-scheme.ts
│   └── use-theme-color.ts
└── utils/               # Helper functions
```

### Code Conventions

- **Language:** Spanish for comments, English for variable/function names
- **Components:** Functional components with Hooks
- **TypeScript:** Strict typing enabled
- **Formatting:** Prettier with trailing spaces in files
- **ESLint:** Auto-fix on save (VS Code)

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/)

## Join the Community

- [Expo on GitHub](https://github.com/expo/expo)
- [Expo Discord](https://chat.expo.dev)
