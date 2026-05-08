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

import { useColorScheme } from "@/hooks/use-color-scheme";

import { useEffect } from "react";
import { useFonts } from "expo-font";

import { createTables } from "@/SRC/database/db";

import { AppState, Pressable } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import { Text } from "@/components/global/Text";
import { BackIcon } from "@/components/global/icons";

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

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    "AK-display": require("../assets/Fonts/Instrument_Serif/InstrumentSerif-Regular.ttf"),
    "AK-UI": require("../assets/Fonts/Geist/Geist-VariableFont_wght.ttf"),
    "AK-data": require("../assets/Fonts/Geist_Mono/GeistMono-VariableFont_wght.ttf"),
    "AK-notoJP": require("../assets/Fonts/Noto_Serif_JP/NotoSerifJP-VariableFont_wght.ttf"),
    "AK-notoCH": require("../assets/Fonts/Noto_Serif_SC/NotoSerifSC-VariableFont_wght.ttf"),
    "AK-notoKO": require("../assets/Fonts/Noto_Serif_KR/NotoSerifKR-VariableFont_wght.ttf"),
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
          options={({
            navigation,
            route,
          }: {
            navigation: any;
            route: any;
          }) => ({
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
                  const deckId = route.params?.deckId; // Accede al deckId desde los parámetros
                  navigation.navigate("decks/deck-details", {
                    triggerFunction: true,
                    deckId,
                  });
                }}
              >
                <Text className="text-akira-darkText font-AK_UI text-[14px] tracking-widest">
                  Add Card +
                </Text>
              </Pressable>
            ),
          })}
        />
      </Stack>
    </ThemeProvider>
  );
}
