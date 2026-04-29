import { Tabs } from "expo-router";
import React from "react";
import { Home, Decks } from "@/components/global/icons";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDarkMode ? "#ffd1ad" : "#141414", // Color cuando haces clic (Verde Akira)
        tabBarInactiveTintColor: isDarkMode ? "#9f9f9f" : "#9c9789", // Color cuando no está seleccionado
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: isDarkMode ? "#141414" : "#f4f2ed",
          borderTopWidth: 1,
          borderTopColor: isDarkMode ? "#28272c" : "#e0e0e0",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today",
          tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Decks"
        options={{
          title: "Decks",
          tabBarIcon: ({ size, color }) => <Decks size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
