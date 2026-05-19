import {
  initialWindowMetrics,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Pressable,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";

import { Text } from "@/components/global/Text";
import { BackIcon, Plus } from "@/components/global/icons";
import DecksContainer from "@/components/UI/index/DecksContainer";

export default function Decks() {
  const router = useRouter();

  const { width, height } = useWindowDimensions();
  const topInset = initialWindowMetrics?.insets.top ?? 0;

  return (
    <View
      className="flex-1 bg-akira-paper dark:bg-akira-darkBG py-[1rem] gap-[1rem]"
      style={{ paddingTop: topInset / 2, minHeight: height }}
    >
      <Pressable
        className="mt-[2rem] mx-[2rem]"
        onPress={() => router.replace("/Settings")}
      >
        <BackIcon />
      </Pressable>
      <View className="mx-[2rem]">
        <Text className="text-[2.75vw] text-akira-darkText font-bold mt-[1.5rem] tracking-widest">
          SETTINGS · ARCHIVE
        </Text>
        <Text
          className="text-[9vw] text-akira-text dark:text-akira-darkText mb-[1rem]"
          variant="display"
        >
          Archive
        </Text>
      </View>
      <DecksContainer
        showArchive={true}
        showInfo={"DECKS ARCHIVED"}
      ></DecksContainer>
    </View>
  );
}
