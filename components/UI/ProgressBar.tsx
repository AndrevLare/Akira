import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useColorScheme } from "nativewind";

const CircularProgress = ({
  percentage = 44,
  size = 100,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  return (
    <View
      className="items-center justify-center"
      style={{ width: size, height: size }}
    >
      <Svg width={size} height={size}>
        {/* Círculo de fondo (Gris claro) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={isDarkMode ? "#353439" : "#F3F4F6"} // gray-100
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Círculo de progreso (Verde) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#84c476" // Tu color verde de AKIRA
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round" // Hace que las puntas sean redondeadas
          rotation="-90" // Empezar desde arriba
          origin={`${size / 2}, ${size / 2}`}
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
