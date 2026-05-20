import { BackIcon, Order, Spark, Sum } from "@/components/global/icons";
import { Text } from "@/components/global/Text";
import { useFocusEffect, useRouter } from "expo-router";
import { Pressable, useWindowDimensions } from "react-native";
import { View, ScrollView } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import { SRS_Settings } from "@/SRC/Types/types";
import { useCallback, useState } from "react";
import { useColorScheme } from "nativewind";
import { getSettingsSet, updateSettingsSet } from "@/SRC/database/db_settings";
import Loading from "@/components/global/Loading";

export default function SRSSettings() {
  const { width, height } = useWindowDimensions();
  const topInset = initialWindowMetrics?.insets.top ?? 0;

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const router = useRouter();

  const [srsSettings, setSRS_Settings] = useState<SRS_Settings>();

  useFocusEffect(
    useCallback(() => {
      const loadSettings = async () => {
        const _srsSettings = await getSettingsSet("srs_settings");

        if (_srsSettings) setSRS_Settings(_srsSettings as SRS_Settings);
      };
      loadSettings();
    }, []),
  );

  const setSetting = async (values: Record<string, any>) => {
    try {
      await updateSettingsSet("srs_settings", values);
      console.log("(srs settings) Settings saved: ", values);
    } catch (e) {
      console.log("(srs settings) Error saving settings: ", e);
    }
  };

  if (!srsSettings) {
    return <Loading kanji="設" title="Reviews" leyend="Reading Settings..." />;
  }

  return (
    <ScrollView className="flex-1">
      <View
        className="flex-1 bg-akira-paper dark:bg-akira-darkBG px-[2rem] pb-[1rem] gap-[1rem]"
        style={{ paddingTop: topInset / 2, minHeight: height }}
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
            className="text-[9vw] text-akira-text dark:text-akira-darkText mb-[1rem]"
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
                  {srsSettings.daily_cards_limit}{" "}
                  <Text className="text-[2.75vw] font-bold font-AK_data tracking-widest text-akira-darkText">
                    CARDS
                  </Text>
                </Text>
              </View>
              <Slider
                minimumValue={5}
                maximumValue={120}
                value={srsSettings.daily_cards_limit}
                onValueChange={(val) => {
                  setSRS_Settings({ ...srsSettings, daily_cards_limit: val });
                  setSetting({ daily_cards_limit: val });
                }}
                step={1} // incrementos
                minimumTrackTintColor="#83c575" // color izquierda
                maximumTrackTintColor={
                  colorScheme !== "dark" ? "#2b2b2f" : "#f2f2f2"
                } // color derecha
                thumbTintColor={colorScheme === "dark" ? "#f4f2ed" : "#83c575"} // color del thumb
              />
            </View>
          </Pressable>

          {/* Separador */}
          <View className="border-b border-akira-boxBorder dark:border-akira-boxDarkBorder w-full" />

          <Pressable className="flex-row gap-[1rem] items-center">
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Spark size={20} />
            </View>
            <View className="flex-1">
              <View className="flex-1 flex-row items-center justify-between">
                <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                  New cards per day
                </Text>
                <Text className="text-akira-ink dark:text-akira-paper font-AK_data text-[7vw] tracking-tighter font-AK_display">
                  {srsSettings.daily_new_cards}{" "}
                  <Text className="text-[2.75vw] font-bold font-AK_data tracking-widest text-akira-darkText">
                    NEW
                  </Text>
                </Text>
              </View>
              <Slider
                minimumValue={0}
                maximumValue={30}
                value={srsSettings.daily_new_cards}
                onValueChange={(val) => {
                  setSRS_Settings({ ...srsSettings, daily_new_cards: val });
                  setSetting({ daily_new_cards: val });
                }}
                step={1} // incrementos
                minimumTrackTintColor="#83c575" // color izquierda
                maximumTrackTintColor={
                  colorScheme !== "dark" ? "#2b2b2f" : "#f2f2f2"
                } // color derecha
                thumbTintColor={colorScheme === "dark" ? "#f4f2ed" : "#83c575"} // color del thumb
              />
            </View>
          </Pressable>
        </View>
        <View className="bg-akira-whiteVoid p-[1rem] rounded-2xl">
          <Text className="font-AK_data text-akira-darkText tracking-wider">
            Estimated{" "}
            <Text className="text-akira-ink dark:text-akira-paper tracking-wider">
              ~{Math.round((srsSettings.daily_cards_limit * 10) / 60)} min
            </Text>{" "}
            per day at current pace.
          </Text>
        </View>
        {/* Section */}

        <Text className="text-akira-darkText tracking-widest font-bold font-AK_data text-[2.75vw]">
          BEHAVIOUR
        </Text>
        <View className="flex bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm gap-[1rem] ">
          <Pressable className="flex-row gap-[1rem] items-center">
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Order size={20} />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper mb-2">
                Card order
              </Text>
              <View className="flex-row bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-1 gap-1">
                {["Mixed", "New first", "Due first"].map((option, index) => (
                  <Pressable
                    key={option}
                    onPress={() => {
                      setSetting({ order_type: index as 0 | 1 | 2 });
                      setSRS_Settings({
                        ...srsSettings,
                        order_type: index as 0 | 1 | 2,
                      });
                    }}
                    className={`flex-1 items-center py-2 rounded-xl ${
                      srsSettings.order_type === index
                        ? "bg-akira-pureWhite dark:bg-akira-lightDark"
                        : ""
                    }`}
                  >
                    <Text
                      className={`text-[3vw] font-AK_UI font-semibold ${
                        srsSettings.order_type === index
                          ? "text-akira-ink dark:text-akira-paper"
                          : "text-akira-darkText"
                      }`}
                    >
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
