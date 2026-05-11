import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface AkiraBackgroundProps {
  children: React.ReactNode;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  colors?: [string, string, ...string[]];
}

export const Gradient = ({
  children,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  colors = ["#f0a266", "#f18c77"],
}: AkiraBackgroundProps) => {
  return (
    <View>
      <LinearGradient
        colors={colors}
        style={StyleSheet.absoluteFill}
        start={start}
        end={end}
      />
      {children}
    </View>
  );
};
