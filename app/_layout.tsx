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
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
