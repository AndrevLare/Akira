import { Text as RNText, TextProps } from "react-native";

export function Text(props: TextProps) {
  // Aplicamos 'font-sans' por defecto, pero permitimos sobrescribirla
  return <RNText {...props} className={`${props.className || ""}`} font-sans />;
}
