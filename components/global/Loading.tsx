import { View } from "react-native";
import { Text } from "@/components/global/Text";

interface AkiraInputProps {
  kanji: string;
  title: string;
  leyend: string;
}

export default function Loading({
  kanji,
  title,
  leyend,
  ...props
}: AkiraInputProps) {
  return (
    <View className="flex-1 bg-akira-paper dark:bg-akira-darkBG items-center justify-center">
      <Text
        className="text-akira-translucentWhite text-[90vw] absolute"
        variant="display"
      >
        {kanji}
      </Text>
      <View className="my-auto">
        <Text className="font-AK_data text-akira-darkText tracking-wider">
          アキラ · AKIRA
        </Text>
        <Text className="text-center text-[10vw]" variant="display">
          {title}
        </Text>
      </View>
      <Text className="font-AK_data text-akira-darkText tracking-wider bottom-[5rem] absolute">
        {leyend}
      </Text>
    </View>
  );
}
