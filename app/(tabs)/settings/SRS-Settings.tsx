import { BackIcon, Sum } from "@/components/global/icons";
import { Text } from "@/components/global/Text";
import { useRouter } from "expo-router";
import { Pressable, useWindowDimensions } from "react-native";
import { View, ScrollView } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import { SRS_Settings } from "@/SRC/Types/types";
import { useState } from "react";
import { useColorScheme } from "nativewind";

export default function SRSSettings() {
  const { width, height } = useWindowDimensions();
  const topInset = initialWindowMetrics?.insets.top ?? 0;

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const router = useRouter();

  const [srsSettings, setSRS_Settings] = useState<SRS_Settings>({
    daily_notifications: 10,
    daily_new_cards: 5,
    daily_cards_limit: 30,
    algorithm: "SM-2",
    order: 0,
  });

  return (
    <ScrollView className="flex-1">
      <View
        className="flex-1 bg-akira-paper dark:bg-akira-darkBG px-[2rem] py-[1rem] gap-[1rem]"
        style={{ paddingTop: topInset, minHeight: height }}
      >
        <Pressable
          className="mt-[2rem]"
          onPress={() => router.replace("/Settings")}
        >
          <BackIcon />
        </Pressable>
        <View>
          <Text className="text-[2.75vw] text-akira-darkText font-bold mt-[1.5rem] tracking-widest">
            SETTINGS · REVIEW
          </Text>
          <Text
            className="text-[9vw] text-akira-text dark:text-akira-darkText"
            variant="display"
          >
            Reviews & Schedule
          </Text>
        </View>

        {/* Section */}

        <Text className="text-akira-darkText tracking-widest font-bold font-AK_data text-[2.75vw]">
          DAILY VOLUME
        </Text>
        <View className="flex bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm gap-[1rem] ">
          <Pressable className="flex-row gap-[1rem] items-center">
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Sum size={20} />
            </View>
            <View className="flex-1">
              <View className="flex-1 flex-row items-center justify-between">
                <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                  Cards per day
                </Text>
                <Text className="text-akira-ink dark:text-akira-paper font-AK_data text-[7vw] tracking-tighter font-AK_display">
                  30{" "}
                  <Text className="text-[2.75vw] font-bold font-AK_data tracking-widest text-akira-darkText">
                    CARDS
                  </Text>
                </Text>
              </View>
              import Slider from "@react-native-community/slider";
              <Slider
                minimumValue={5}
                maximumValue={120}
                value={20}
                onValueChange={(val) =>
                  setSRS_Settings({ ...srsSettings, daily_cards_limit: val })
                }
                step={1} // incrementos
                minimumTrackTintColor="#7cb342" // color izquierda
                maximumTrackTintColor={
                  colorScheme === "dark" ? "#2b2b2f" : "#f2f2f2"
                } // color derecha
                thumbTintColor="#f4f2ed" // color del thumb
              />
            </View>
          </Pressable>

          {/* Separador */}
          <View className="border-b border-akira-boxBorder dark:border-akira-boxDarkBorder w-full" />
        </View>
      </View>
    </ScrollView>
  );
}
