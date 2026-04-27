import { useColorScheme } from "nativewind";
import { TouchableHighlight } from "react-native";
import { Sun, Moon } from "@/components/global/icons";

// 1. Añadimos 'props: any' o una interfaz si usas TS
export default function ThemeToggle(props: any) {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  return (
    <TouchableHighlight
      {...props} // Ahora ya existe porque lo recibimos en la función
      onPress={toggleColorScheme} // NativeWind ya maneja el cambio internamente
      underlayColor={isDarkMode ? "#00000000" : "#00000000"} // Color al presionar
      className={`p-4 rounded-full border border-akira-ink dark:border-akira-paper items-center justify-center self-start ${props.className}`}
      {...props}
    >
      {!isDarkMode ? (
        <Sun className="inline" />
      ) : (
        <Moon className="inline" fill="#9f9f9f" />
      )}
    </TouchableHighlight>
  );
}
