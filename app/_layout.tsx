import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useFonts } from "expo-font";

import { createTables } from "@/SRC/database/db";

import { AppState, Appearance, Pressable } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { Text } from "@/components/global/Text";
import { BackIcon, Dots } from "@/components/global/icons";

import { useColorScheme } from "nativewind";
import { useEffect, useLayoutEffect } from "react";

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

interface DeckDetailsParams {
  deckId?: number;
}

type RootStackParamList = {
  "decks/deck-details": { deckId?: number; triggerFunction?: boolean };
};

const THEME_KEY = "akira_theme";

export default function RootLayout() {
  const { colorScheme, setColorScheme } = useColorScheme();

  // Preempt NativeWind's async system-theme detection by setting colorScheme
  // synchronously before the first paint. Prevents the post-mount re-render
  // that breaks dynamic (dark:) styles on new arch (react-native-css-interop bug).
  useLayoutEffect(() => {
    if (!colorScheme) {
      const systemColorScheme = Appearance.getColorScheme();
      setColorScheme(
        systemColorScheme === "dark" || systemColorScheme === "light"
          ? systemColorScheme
          : "light",
      );
    }
  }, []);

  const [loaded, error] = useFonts({
    "AK-display": require("../assets/Fonts/Instrument_Serif/InstrumentSerif-Regular.ttf"),
    "AK-UI": require("../assets/Fonts/Geist/Geist-VariableFont_wght.ttf"),
    "AK-data": require("../assets/Fonts/Geist_Mono/GeistMono-VariableFont_wght.ttf"),
    "AK-notoJP": require("../assets/Fonts/Noto_Serif_JP/NotoSerifJP-VariableFont_wght.ttf"),
    "AK-notoCH": require("../assets/Fonts/Noto_Serif_SC/NotoSerifSC-VariableFont_wght.ttf"),
    "AK-notoKO": require("../assets/Fonts/Noto_Serif_KR/NotoSerifKR-VariableFont_wght.ttf"),
  });

  // ✅ FIX 2: Leer el tema guardado y aplicarlo ANTES del primer render de las screens.
  // Esto garantiza que colorScheme nunca sea undefined/null al montar HomeScreen.
  // Theme persistence disabled: causes a post-mount setColorScheme call that
  // triggers a NativeWind re-render and breaks dynamic styles on new arch.
  // Re-enable only once NativeWind v4 + new arch re-render bug is resolved.

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <ThemeProvider
        value={colorScheme === "dark" ? DarkThemeCustom : LightTheme}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="create-edit-deck"
            options={({
              navigation,
              route,
            }: {
              navigation: any;
              route: any;
            }) => ({
              presentation: "modal",
              headerShown: true,
              headerTitle: "01 · DECK",
              headerTitleStyle: {
                fontFamily: "AK-data",
                fontSize: 15,
              },
              headerStyle: {
                backgroundColor: colorScheme === "dark" ? "#141414" : "#f4f2ed",
              },
              headerTintColor: colorScheme === "dark" ? "#9f9f9f" : "#9f9f9f",
              headerShadowVisible: false,
              headerLeft: () => (
                <Pressable
                  onPress={() => {
                    navigation.navigate("(tabs)", { screen: "Decks" });
                  }}
                >
                  <BackIcon />
                </Pressable>
              ),
              headerRight: () => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("create-edit-deck", {
                      triggerFunction: true,
                    })
                  }
                >
                  <Text className="text-akira-darkText font-AK_UI text-[14px] tracking-widest">
                    Save
                  </Text>
                </Pressable>
              ),
            })}
          />
          <Stack.Screen
            name="create-edit-card"
            options={({
              navigation,
              route,
            }: {
              navigation: any;
              route: any;
            }) => ({
              presentation: "modal",
              headerShown: true,
              headerTitle: "02 · CARD",
              headerTitleStyle: {
                fontFamily: "AK-data",
                fontSize: 15,
              },
              headerStyle: {
                backgroundColor: colorScheme === "dark" ? "#0e0e10" : "#f4f2ed",
              },
              headerTintColor: colorScheme === "dark" ? "#9f9f9f" : "#9f9f9f",
              headerShadowVisible: false,
              headerLeft: () => (
                <Pressable
                  onPress={() => {
                    const deckId = route.params?.deckId;
                    navigation.navigate("decks/deck-details", {
                      deckId,
                    });
                  }}
                >
                  <BackIcon />
                </Pressable>
              ),
              headerRight: () => (
                <Pressable
                  onPress={() => {
                    const deckId = route.params?.deckId;
                    navigation.navigate("create-edit-card", {
                      triggerFunction: true,
                      deckId,
                    });
                  }}
                >
                  <Text className="text-akira-darkText font-AK_UI text-[14px] tracking-widest">
                    Finish
                  </Text>
                </Pressable>
              ),
            })}
          />
          <Stack.Screen
            name="decks/deck-details"
            options={({
              navigation,
              route,
            }: {
              navigation: any;
              route: any;
            }) => ({
              presentation: "modal",
              headerShown: true,
              headerTitle: "DECK DETAILS",
              headerTitleStyle: {
                fontFamily: "AK-data",
                fontSize: 15,
              },
              headerStyle: {
                backgroundColor: colorScheme === "dark" ? "#0e0e10" : "#f4f2ed",
              },
              headerTintColor: colorScheme === "dark" ? "#9f9f9f" : "#9f9f9f",
              headerShadowVisible: false,
              headerLeft: () => (
                <Pressable
                  onPress={() => {
                    navigation.navigate("(tabs)", { screen: "Decks" });
                  }}
                >
                  <BackIcon />
                </Pressable>
              ),
              headerRight: () => (
                <Pressable
                  onPress={() => {
                    const deckId = route.params?.deckId;
                    navigation.navigate("decks/deck-details", {
                      triggerFunction: true,
                      deckId,
                    });
                  }}
                  className="w-[100px] flex-row justify-end"
                >
                  <Dots />
                </Pressable>
              ),
            })}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
