import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useColorScheme } from "nativewind";

const CircularProgress = ({
  percentage = 44,
  size = 100,
  strokeWidth = 10,
  scale = 1,
}) => {
  const radius = (size * scale - strokeWidth * scale) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  return (
    <View
      className="items-center justify-center"
      style={{ width: size * scale, height: size * scale }}
    >
      <Svg width={size * scale} height={size * scale}>
        {/* Círculo de fondo (Gris claro) */}
        <Circle
          cx={(size * scale) / 2}
          cy={(size * scale) / 2}
          r={radius}
          stroke={isDarkMode ? "#353439" : "#F3F4F6"} // gray-100
          strokeWidth={strokeWidth * scale}
          fill="none"
        />
        {/* Círculo de progreso (Verde) */}
        <Circle
          cx={(size * scale) / 2}
          cy={(size * scale) / 2}
          r={radius}
          stroke="#84c476" // Tu color verde de AKIRA
          strokeWidth={strokeWidth * scale}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round" // Hace que las puntas sean redondeadas
          rotation="-90" // Empezar desde arriba
          origin={`${(size * scale) / 2}, ${(size * scale) / 2}`}
        />
      </Svg>
      {/* Texto en el centro */}
      <View className="absolute">
        <Text className="text-xl font-AK_display font-bold text-akira-ink dark:text-akira-paper">
          {percentage}%
        </Text>
      </View>
    </View>
  );
};

export default CircularProgress;
