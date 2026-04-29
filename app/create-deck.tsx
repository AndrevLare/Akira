import { useState } from "react";
import { View } from "react-native";
import { Text } from "@/components/global/Text";
import { useRouter } from "expo-router";
import { Button } from "react-native";

interface DeckInfo {
  name: string;
  icon: string;
  color: string;
}

export default function CreateDeckModal() {
  const router = useRouter();

  // Deck info
  const [deckName, setDeckName] = useState<DeckInfo>();

  return (
    <View className="flex-1 bg-akira-paper dark:bg-akira-darkBG p-6 border-t-2 border-akira-boxBorder dark:border-akira-boxDarkBorder p-4">
      <Text className="text-[40px] font-light text-akira-ink dark:text-akira-paper font-AK_display text-[3rem]">
        Name your deck.
      </Text>
      <Text className="mb-[1.5rem] text-akira-darkText font-AK_UI font-semibold text-[1rem]">
        you can change all this later.
      </Text>

      <View className="flex-row items-center space-between bg-akira-pureWhite dark:bg-akira-lightDark p-[1rem] rounded-3xl shadow border border-akira-boxBorder dark:border-akira-boxDarkBorder p-5">
        <View className="p-[10px] bg-akira-lightFire rounded-xl  w-[4rem] h-[4rem] flex items-center justify-center">
          <Text className="text-akira-ink dark:text-akira-paper font-AK_display text-[2rem]">
            日
          </Text>
        </View>
        <View className="ml-[1rem] flex-1 gap-[4px]">
          <Text className="text-akira-ink dark:text-akira-paper font-AK_UI font-bold tracking-widest">
            YOUR STREAK
          </Text>
          <Text className="text-akira-darkText font-AK_data text-[1rem]">
            0 cards · just now
          </Text>
        </View>
        <View className="bg-akira-darkWhite rounded-full px-[10px] py-[5px]">
          <Text className="text-akira-darkText font-semibold text-[0.875rem]">
            preview
          </Text>
        </View>
      </View>
    </View>
  );
}
