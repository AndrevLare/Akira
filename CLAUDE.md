# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Expo mobile app (iOS/Android) built with React Native, TypeScript, and expo-router for file-based routing.

## Commands

```bash
npm install              # Install dependencies
npm start                # Start Expo dev server
npm run android          # Run on Android emulator
npm run ios              # Run on iOS simulator
npm run web              # Run on web browser
npm run lint             # Run ESLint
```

## Architecture

- **app/** - File-based routing via expo-router; `_layout.tsx` defines root Stack, `(tabs)/` defines tab navigation
- **components/** - Reusable UI components (themed text/view, collapsible, external links)
- **constants/theme.ts** - Centralized color palette (light/dark modes) and font definitions
- **hooks/** - `use-color-scheme` for system theme detection, `use-theme-color` for derived colors

## Conventions

- Path alias `@/*` maps to root directory
- ESLint auto-fix and import sorting enabled on save (VS Code)
- React 19 with React Compiler enabled in app.json

# P2L (Push-to-Learn) - Guía del Proyecto

## Comandos de Consola

- Instalar dependencias: `npm install` o `expo install`
- Correr App (Expo): `npx expo start`
- Correr Web: `npx expo start --web`
- Tests: `npm test`
- Limpiar caché: `npx expo start -c`

## Stack Tecnológico

- **Frontend:** React Native con Expo (Managed Workflow).
- **Estilos:** NativeWind (Tailwind CSS para móvil).
- **Base de Datos:** Supabase (PostgreSQL) + AsyncStorage para persistencia local.
- **Notificaciones:** Expo Notifications (Local Scheduling).
- **Algoritmo:** SM-2 (SuperMemo 2) adaptado para JS.

## Reglas de Estilo y Código

- **Lenguaje:** Español para comentarios, Inglés para nombres de variables y funciones.
- **Componentes:** Usar Functional Components y Hooks.
- **Tipado:** TypeScript estricto.
- **Formato:** Usar Prettier y siempre dejar un espacio al final del archivo.
- **Notificaciones:** Priorizar `LocalNotifications` sobre `PushNotifications` para el MVP.

## Estructura de Datos (Core)

- `Card`: { id, question, answer, interval, easeFactor, nextReview, tags[] }
- `UserProgress`: { streak, cardsLearned, lastActive }

## Metas del Proyecto (Contexto para la IA)

- Estamos creando una alternativa a Anki basada en notificaciones push.
- El usuario debe poder responder desde la misma notificación sin abrir la app.
- Optimizado para estudiantes.
