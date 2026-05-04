import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/use-color-scheme";

import { useEffect } from "react";
import { useFonts } from "expo-font";

import { createTables } from "@/SRC/database/db";

import { AppState } from "react-native";
import * as NavigationBar from "expo-navigation-bar";

// Evita que la pantalla de carga se oculte antes de tiempo
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const DarkThemeCustom = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "transparent",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    "AK-display": require("../assets/Fonts/Instrument_Serif/InstrumentSerif-Regular.ttf"),
    "AK-UI": require("../assets/Fonts/Geist/Geist-VariableFont_wght.ttf"),
    "AK-data": require("../assets/Fonts/Geist_Mono/GeistMono-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    createTables();
  }, []);

  const hideNavBar = async () => {
    await NavigationBar.setVisibilityAsync("hidden");
  };

  useEffect(() => {
    hideNavBar();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        hideNavBar();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? DarkThemeCustom : LightTheme}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="create-edit-deck"
          options={{
            presentation: "modal",
            headerShown: true, // Mantenlo activo para editarlo
            headerTitle: "01 · DECK",
            headerTitleStyle: {
              fontFamily: "AK-data", // Tu fuente personalizada
              fontSize: 15, // Tamaño del título
            },
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#141414" : "#f4f2ed", // Fondo del header
            },
            headerTintColor: colorScheme === "dark" ? "#9f9f9f" : "#9f9f9f", // Color de botones y texto
            headerShadowVisible: false, // Quita la línea de abajo para un look más limpio
          }}
        />
        <Stack.Screen
          name="create-edit-card"
          options={{
            presentation: "modal",
            headerShown: true, // Mantenlo activo para editarlo
            headerTitle: "02 · CARD",
            headerTitleStyle: {
              fontFamily: "AK-data", // Tu fuente personalizada
              fontSize: 15, // Tamaño del título
            },
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#141414" : "#f4f2ed", // Fondo del header
            },
            headerTintColor: colorScheme === "dark" ? "#9f9f9f" : "#9f9f9f", // Color de botones y texto
            headerShadowVisible: false, // Quita la línea de abajo para un look más limpio
          }}
        />
        <Stack.Screen
          name="decks/deck-details"
          options={{
            presentation: "modal",
            headerShown: true, // Mantenlo activo para editarlo
            headerTitle: "DECK DETAILS",
            headerTitleStyle: {
              fontFamily: "AK-data", // Tu fuente personalizada
              fontSize: 15, // Tamaño del título
            },
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#0e0e10" : "#f4f2ed", // Fondo del header
            },
            headerTintColor: colorScheme === "dark" ? "#9f9f9f" : "#9f9f9f", // Color de botones y texto
            headerShadowVisible: false, // Quita la línea de abajo para un look más limpio
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
