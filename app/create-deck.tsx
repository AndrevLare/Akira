import { Text } from "@/components/global/Text";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";

interface DeckInfo {
  name: string;
  icon: string;
  color: number;
}

const Icons = ["A", "日", "∫", "⚕", "✓", "π", "♫", "★"];

const ColorsOptions = ["lightFire", "accent"];

export default function CreateDeckModal() {
  const router = useRouter();

  // Deck info
  const [deckInfo, setDeckInfo] = useState<DeckInfo>({
    name: "New deck",
    icon: Icons[0],
    color: 0,
  });

  return (
    <View className="flex-1 bg-akira-paper dark:bg-akira-darkBG p-6 border-t-2 border-akira-boxBorder dark:border-akira-boxDarkBorder p-4 gap-[1.5rem]">
      <View>
        <Text className="text-[40px] font-light text-akira-ink dark:text-akira-paper font-AK_display text-[3rem]">
          Name your deck.
        </Text>
        <Text className="text-akira-darkText font-AK_UI font-semibold text-[1rem]">
          you can change all this later.
        </Text>
      </View>

      <View className="flex-row items-center space-between bg-akira-pureWhite dark:bg-akira-lightDark p-[1rem] rounded-3xl shadow border border-akira-boxBorder dark:border-akira-boxDarkBorder p-5">
        <View className="bg-akira-lightFire rounded-xl  w-[4rem] h-[4rem] flex items-center justify-center">
          <Text className="text-akira-ink font-AK_display text-[2rem]">
            {deckInfo?.icon}
          </Text>
        </View>
        <View className="ml-[1rem] flex-1 gap-[4px]">
          <Text className="text-akira-ink dark:text-akira-paper font-AK_UI font-bold">
            {deckInfo?.name}
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
      <View className="gap-[0.5rem]">
        <Text className="text-akira-darkText font-AK_data font-semibold text-[1rem]">
          NAME
        </Text>
        <TextInput
          className="bg-akira-pureWhite dark:bg-akira-lightDark border border-akira-boxBorder dark:border-akira-boxDarkBorder p-4 rounded-2xl text-akira-ink dark:text-akira-paper font-AK_UI text-[1.15rem]"
          placeholder="Enter deck name..."
          value={deckInfo?.name}
          onChangeText={(text) => setDeckInfo({ ...deckInfo, name: text })}
        />
      </View>
      <View className="gap-[0.5rem]">
        <Text className="text-akira-darkText font-AK_data font-semibold text-[1rem]">
          ICON
        </Text>
        <View className="gap-[0.5rem] flex-row flex-wrap">
          {Icons.map((icon) => (
            <Icon
              icon={icon}
              selected={deckInfo?.icon === icon}
              key={icon}
              color={ColorsOptions[deckInfo.color]}
            />
          ))}
        </View>
      </View>
      <View className="gap-[0.5rem]">
        <Text className="text-akira-darkText font-AK_data font-semibold text-[1rem]">
          COLOR
        </Text>
        <View className="gap-[0.5rem] flex-row flex-wrap">
          {ColorsOptions.map((color) => (
            <ColorOption
              color={color}
              selected={deckInfo?.color === ColorsOptions.indexOf(color)}
              key={color}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const Icon = ({
  icon,
  selected,
  color,
  key,
}: {
  icon: string;
  selected: boolean;
  color: string;
  key: string;
}) => {
  return (
    <View
      className={`${selected ? `bg-akira-${color}` : "bg-akira-pureWhite border-1"} rounded-xl  w-[3.25rem] h-[3.25rem] flex items-center justify-center self-start border-akira-boxBorder dark:border-akira-boxDarkBorder`}
    >
      <Text className="text-akira-ink font-AK_display text-[1.5rem]">
        {icon}
      </Text>
    </View>
  );
};

const ColorOption = ({
  color,
  selected,
  key,
}: {
  color: string;
  selected: boolean;
  key: string;
}) => {
  return (
    <View
      className={`rounded-full w-[3.5rem] h-[3.5rem] flex justify-center align-items self-start ${selected ? "border-2 border-akira-ink" : ""}`}
    >
      <View className={`bg-akira-${color} rounded-full w-[3rem] h-[2.5rem]`} />
    </View>
  );
};
