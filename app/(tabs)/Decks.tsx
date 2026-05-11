import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";

import { Text } from "@/components/global/Text";
import { Plus } from "@/components/global/icons";
import DecksContainer from "@/components/UI/index/DecksContainer";

export default function Decks() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colorScheme } = useColorScheme();

  return (
    <View
      className="flex-1 bg-akira-paper dark:bg-akira-darkBG "
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <View className="w-full flex-row justify-between items-center mt-[1.5rem] px-[2rem]">
        <Text className="text-[40px] font-light text-akira-ink dark:text-akira-paper font-AK_display text-[3rem]">
          Decks
        </Text>
        <TouchableOpacity
          className="bg-akira-ink dark:bg-akira-paper p-[12px] rounded-2xl"
          onPress={() => router.push("/create-edit-deck")}
          activeOpacity={0.7}
        >
          <Plus size={16} color={colorScheme === "dark" ? "#000" : "#fff"} />
        </TouchableOpacity>
      </View>
      <DecksContainer></DecksContainer>
    </View>
  );
}
