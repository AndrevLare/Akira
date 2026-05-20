import { useColorScheme } from "nativewind";
import {
  Text as RNText,
  TextInput,
  TextProps,
  TextInputProps,
} from "react-native";

/**
 * UTILITY: getAkiraFont
 * Centraliza la lógica de selección de fuente para toda la app.
 */
const getAkiraFont = (
  content: any,
  variant: "display" | "UI" | "data" = "UI",
): string => {
  const text = typeof content === "string" ? content : "";

  // 1. Detección de alfabetos asiáticos
  if (/[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f]/.test(text))
    return "font-AK_kr";
  if (/[\u3040-\u30ff\u31f0-\u31ff\u4e00-\u9fff]/.test(text))
    return "font-AK_jp";

  // 2. Mapeo de variantes para Latín/Números
  const fontVariants = {
    display: "font-AK_display",
    data: "font-AK_data",
    UI: "font-AK_ui",
  };

  return fontVariants[variant] || fontVariants.UI;
};

// --- COMPONENTE TEXT ---
interface AkiraTextProps extends TextProps {
  variant?: "display" | "UI" | "data";
}

export const Text = ({
  children,
  variant = "UI",
  className,
  ...props
}: AkiraTextProps) => {
  const hasExplicitFont = className?.includes("font-");
  const selectedFont = hasExplicitFont ? "" : getAkiraFont(children, variant);

  return (
    <RNText
      // leading-tight o un valor específico como leading-5
      className={`${selectedFont} leading-tight ${className ?? ""}`}
      style={{ includeFontPadding: false }}
      {...props}
    >
      {children}
    </RNText>
  );
};

// --- COMPONENTE INPUT ---
interface AkiraInputProps extends TextInputProps {
  variant?: "display" | "UI" | "data";
}

export const InputText = ({
  value,
  placeholder,
  variant = "UI",
  className,
  ...props
}: AkiraInputProps) => {
  const selectedFont = getAkiraFont(value || placeholder, variant);

  return (
    <TextInput
      className={`${selectedFont} ${className}`}
      style={{
        paddingVertical: 0, // Elimina el padding interno que infla la línea
        includeFontPadding: false,
        height: 40, // O el alto que desees para normalizar todas las fuentes
      }}
      value={value}
      placeholderTextColor={"#9f9f9f"}
      placeholder={placeholder}
      {...props}
    />
  );
};
