import AkiraButton from "@/components/global/Button";
import { FullArrowRight } from "@/components/global/icons";
import { Text } from "@/components/global/Text";
import { createDeck } from "@/SRC/database/db_decks";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TextInput, View, Pressable, ScrollView } from "react-native";

interface DeckInfo {
  name: string;
  icon: string;
  color: number;
}
interface RouteParams {
  triggerFunction?: boolean;
}

const Icons = ["A", "日", "∫", "⚕", "✓", "π", "♫", "★"];

const ColorsOptions = [
  "red",
  "gold",
  "green",
  "cyan",
  "blue",
  "purple",
  "pink",
  "grey",
];

// Mapeo de clases para que Tailwind las detecte correctamente
const deckColorClasses: { [key: string]: string } = {
  red: "bg-decks-red",
  gold: "bg-decks-gold",
  green: "bg-decks-green",
  cyan: "bg-decks-cyan",
  blue: "bg-decks-blue",
  purple: "bg-decks-purple",
  pink: "bg-decks-pink",
  grey: "bg-decks-grey",
};

export default function CreateDeckModal() {
  const router = useRouter();
  const route = useRoute<RouteProp<{ params: RouteParams }>>();

  const [deckInfo, setDeckInfo] = useState<DeckInfo>({
    name: "New deck",
    icon: Icons[0],
    color: 0,
  });

  const currentColorClass = deckColorClasses[ColorsOptions[deckInfo.color]];

  const _createDeck = async () => {
    try {
      const response: number = await createDeck(
        deckInfo.name,
        currentColorClass,
        deckInfo.icon,
      );
      if (response != null) {
        console.log("Deck created successfully, ID:", response);
        router.push({
          pathname: "/create-edit-card",
          params: { deckId: response, newDeck: 1 },
        });
      } else {
        console.error("Failed to create deck");
      }
    } catch (error) {
      console.error("Error fetching decks:", error);
    }
  };

  useEffect(() => {
    if (route.params?.triggerFunction) {
      _createDeck();
    }
  }, [route.params]);

  return (
    <ScrollView
      className="flex-1 bg-akira-paper dark:bg-akira-darkBG"
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      showsVerticalScrollIndicator={false} // Limpia la interfaz ocultando la barra
    >
      <View className="flex-1 bg-akira-paper dark:bg-akira-darkBG p-6 border-t-2 border-akira-boxBorder dark:border-akira-boxDarkBorder gap-[1.5rem]">
        {/* Header */}
        <View>
          <Text className="text-[3rem] font-light text-akira-ink dark:text-akira-paper font-AK_display">
            Name your deck.
          </Text>
          <Text className="text-akira-darkText font-AK_UI font-normal text-[1rem]">
            You can change all this later.
          </Text>
        </View>

        {/* Preview Card */}
        <View className="flex-row items-center bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm">
          <View
            className={`${currentColorClass} rounded-xl w-[12.5vw] h-[12.5vw] items-center justify-center`}
          >
            <Text className="text-akira-pureWhite font-AK_display text-[2rem]">
              {deckInfo.icon}
            </Text>
          </View>
          <View className="ml-4 flex-1 gap-[2px]">
            <Text className="text-akira-ink dark:text-akira-paper font-AK_UI font-bold text-lg">
              {deckInfo.name || "Untitled Deck"}
            </Text>
            <Text className="text-akira-darkText font-AK_data text-[3.25vw]">
              0 cards · just now
            </Text>
          </View>
          <View className="bg-akira-darkWhite dark:bg-akira-altLightDark rounded-full px-3 py-1 self-center">
            <Text className="text-akira-darkPaper font-semibold text-[2.75vw]">
              preview
            </Text>
          </View>
        </View>

        {/* Input Name */}
        <View className="gap-[0.5rem]">
          <Text className="text-akira-darkText font-AK_data font-bold text-[0.75rem] tracking-widest uppercase">
            Name
          </Text>
          <TextInput
            className="bg-akira-pureWhite dark:bg-akira-lightDark border border-akira-boxBorder dark:border-akira-boxDarkBorder p-4 rounded-2xl text-akira-ink dark:text-akira-paper font-AK_UI text-[1.15rem]"
            placeholder="Enter deck name..."
            placeholderTextColor="#9f9f9f"
            value={deckInfo.name}
            onChangeText={(text) => setDeckInfo({ ...deckInfo, name: text })}
          />
        </View>

        {/* Icon Selector */}
        <View className="gap-[0.5rem]">
          <Text className="text-akira-darkText font-AK_data font-bold text-[0.75rem] tracking-widest uppercase">
            Icon
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {Icons.map((icon) => (
              <IconItem
                key={icon}
                icon={icon}
                selected={deckInfo.icon === icon}
                activeColorClass={currentColorClass}
                onPress={() => setDeckInfo({ ...deckInfo, icon })}
              />
            ))}
          </View>
        </View>

        {/* Color Selector */}
        <View className="gap-[0.5rem]">
          <Text className="text-akira-darkText font-AK_data font-bold text-[0.75rem] tracking-widest uppercase">
            Color
          </Text>
          <View className="flex-row flex-wrap gap-[1.5vw]">
            {ColorsOptions.map((color, index) => (
              <ColorOption
                key={color}
                color={color}
                selected={deckInfo.color === index}
                onPress={() => setDeckInfo({ ...deckInfo, color: index })}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

/* --- Subcomponentes --- */

const IconItem = ({ icon, selected, activeColorClass, onPress }: any) => (
  <Pressable
    onPress={onPress}
    className={`w-14 h-14 rounded-xl items-center justify-center border ${
      selected
        ? `${activeColorClass} border-transparent`
        : "bg-akira-pureWhite dark:bg-akira-lightDark border-akira-boxBorder dark:border-akira-boxDarkBorder"
    }`}
  >
    <Text
      className={`font-AK_display text-[1.75rem] ${selected ? "text-akira-pureWhite" : "text-akira-ink dark:text-akira-paper"}`}
    >
      {icon}
    </Text>
  </Pressable>
);

const ColorOption = ({ color, selected, onPress }: any) => (
  <Pressable
    onPress={onPress}
    className={`w-12 h-12 rounded-full items-center justify-center border-2 ${
      selected
        ? "border-akira-ink dark:border-akira-paper"
        : "border-transparent"
    }`}
  >
    <View className={`${deckColorClasses[color]} w-9 h-9 rounded-full`} />
  </Pressable>
);
