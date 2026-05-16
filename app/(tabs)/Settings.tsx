import { Pressable, ScrollView, View, useWindowDimensions } from "react-native";
import { Text } from "@/components/global/Text";
import { initialWindowMetrics } from "react-native-safe-area-context";
import {
  UserInfo,
  SRS_Settings,
  Settings as SettingsIcon,
} from "@/SRC/Types/types";
import { useState } from "react";
import {
  ArrowRight,
  Bell,
  Clock,
  Quaver,
  Swap,
  Theme,
  Wave,
} from "@/components/global/icons";
import { useColorScheme } from "nativewind";
import { Switch } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export default function Settings() {
  const { width, height } = useWindowDimensions();
  const topInset = initialWindowMetrics?.insets.top ?? 0;
  const router = useRouter();

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: 0,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    created_at: "19/04/2026",
    plan: "Free",
    color: "#69737d",
  });

  const [srsSettings, setSRS_Settings] = useState<SRS_Settings>({
    daily_notifications: 10,
    daily_new_cards: 5,
    daily_cards_limit: 30,
    algorithm: "SM-2",
    order: 0,
  });

  const [appSettings, setAppSettings] = useState<SettingsIcon[]>([
    { key: "NotificationsStart", value: "08:00" },
    { key: "NotificationsEnd", value: "20:00" },
    { key: "DarkMode", value: "true" },
    { key: "Haptics", value: "true" },
    { key: "Sounds", value: "true" },
  ]);

  return (
    <ScrollView className="flex-1">
      <View
        className="flex-1 bg-akira-paper dark:bg-akira-darkBG px-[2rem] py-[1rem] gap-[1rem]"
        style={{ paddingTop: topInset, minHeight: height }}
      >
        <View>
          <Text className="text-[4vw] text-akira-darkText mt-[1.5rem]">
            アキラ's Settings
          </Text>
          <Text
            className="text-[9vw] text-akira-text dark:text-akira-darkText"
            variant="display"
          >
            Settings
          </Text>
        </View>

        <View className="flex-row items-center bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm gap-[1rem] ">
          <View
            style={{
              backgroundColor: userInfo.color,
              width: width * 0.125,
              height: width * 0.125,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Text className="text-akira-paper text-[5vw]" variant="display">
              {userInfo.name[0]}
            </Text>
          </View>
          <View>
            <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
              {userInfo.name}
            </Text>
            {/* <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter">
              {userInfo.email}
            </Text> */}
          </View>
          <Pressable className="rounded-full px-6 py-3 self-center border border-akira-boxBorder dark:border-akira-boxDarkBorder ml-auto">
            <Text className="text-akira-ink dark:text-akira-paper">Edit</Text>
          </Pressable>
        </View>

        {/* Section */}

        <Text className="text-akira-darkText tracking-widest font-bold font-AK_data text-[2.75vw]">
          REVIEW
        </Text>
        <View className="flex bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm gap-[1rem] ">
          <Pressable
            className="flex-row gap-[1rem] items-center"
            onPress={() =>
              router.push({
                pathname: "/settings/SRS-Settings",
              })
            }
          >
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Clock size={20} />
            </View>
            <View>
              <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                Reviews & Schedule
              </Text>
              <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter">
                {srsSettings.daily_notifications} / day ·{" "}
                {srsSettings.daily_new_cards} new
              </Text>
            </View>
            <View className="ml-auto items-center justify-center">
              <ArrowRight fill="#9f9f9f" />
            </View>
          </Pressable>

          {/* Separador */}
          <View className="border-b border-akira-boxBorder dark:border-akira-boxDarkBorder w-full" />

          <Pressable className="flex-row gap-[1rem] items-center">
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Bell size={20} />
            </View>
            <View>
              <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                Notifications
              </Text>
              <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter">
                {appSettings.find((s) => s.key === "NotificationsStart")?.value}{" "}
                - {appSettings.find((s) => s.key === "NotificationsEnd")?.value}
              </Text>
            </View>
            <View className="ml-auto items-center justify-center">
              <ArrowRight fill="#9f9f9f" />
            </View>
          </Pressable>
        </View>

        {/* Section */}

        <Text className="text-akira-darkText tracking-widest font-bold font-AK_data text-[2.75vw]">
          APPEARENCE
        </Text>
        <View className="flex bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm gap-[1rem] ">
          <Pressable
            className="flex-row gap-[1rem] items-center"
            onPress={toggleColorScheme}
          >
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Theme size={20} />
            </View>
            <View>
              <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                Theme
              </Text>
              <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter">
                {colorScheme === "dark" ? "Dark Mode" : "Light Mode"}
              </Text>
            </View>
            <View className="ml-auto items-center justify-center">
              <Swap fill="#9f9f9f" size={15} />
            </View>
          </Pressable>
        </View>

        {/* Section */}

        <Text className="text-akira-darkText tracking-widest font-bold font-AK_data text-[2.75vw]">
          FEEDBACK
        </Text>
        <View className="flex bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm gap-[1rem] ">
          <Pressable className="flex-row gap-[1rem] items-center">
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Wave size={20} />
            </View>
            <View>
              <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                Haptics
              </Text>
              <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter">
                Light tap on reveal
              </Text>
            </View>
            <View className="ml-auto items-center justify-center">
              <Switch
                value={
                  appSettings.find((s) => s.key === "Haptics")?.value === "true"
                }
                onValueChange={(val) =>
                  setAppSettings((prev) => {
                    const newSettings = prev.map((s) =>
                      s.key === "Haptics" ? { ...s, value: val.toString() } : s,
                    );
                    return newSettings;
                  })
                }
                trackColor={{ false: "#8a8a8a", true: "#7cb342" }}
                thumbColor="#f4f2ed"
              />
            </View>
          </Pressable>

          {/* Separador */}
          <View className="border-b border-akira-boxBorder dark:border-akira-boxDarkBorder w-full" />

          <Pressable className="flex-row gap-[1rem] items-center">
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Quaver size={20} />
            </View>
            <View>
              <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                Sounds
              </Text>
              <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter">
                Subtle click on confirm
              </Text>
            </View>
            <View className="ml-auto items-center justify-center">
              <Switch
                value={
                  appSettings.find((s) => s.key === "Sounds")?.value === "true"
                }
                onValueChange={(val) =>
                  setAppSettings((prev) => {
                    const newSettings = prev.map((s) =>
                      s.key === "Sounds" ? { ...s, value: val.toString() } : s,
                    );
                    return newSettings;
                  })
                }
                trackColor={{ false: "#8a8a8a", true: "#7cb342" }}
                thumbColor="#f4f2ed"
              />
            </View>
          </Pressable>
        </View>
        {/* Section */}

        <Text className="text-akira-darkText tracking-widest font-bold font-AK_data text-[2.75vw]">
          REVIEW
        </Text>
        <View className="flex bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm gap-[1rem] ">
          <Pressable className="flex-row gap-[1rem] items-center">
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Clock size={20} />
            </View>
            <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
              Help & Feedback
            </Text>
            <View className="ml-auto items-center justify-center">
              <ArrowRight fill="#9f9f9f" />
            </View>
          </Pressable>

          {/* Separador */}
          <View className="border-b border-akira-boxBorder dark:border-akira-boxDarkBorder w-full" />

          <Pressable className="flex-row gap-[1rem] items-center">
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Bell size={20} />
            </View>
            <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
              Privacy policy
            </Text>
            <View className="ml-auto items-center justify-center">
              <ArrowRight fill="#9f9f9f" />
            </View>
          </Pressable>

          {/* Separador */}
          <View className="border-b border-akira-boxBorder dark:border-akira-boxDarkBorder w-full" />

          <Pressable className="flex-row gap-[1rem] items-center">
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Text
                className="text-[4vw] text-akira-ink dark:text-akira-paper text-[#9f9f9f] mx-2"
                variant="display"
              >
                A
              </Text>
            </View>
            <View>
              <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                アキラ{" "}
                <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                  · AKIRA
                </Text>
              </Text>
              <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter">
                v0.1.0 · build 2
              </Text>
            </View>
            <View className="ml-auto items-center justify-center">
              <ArrowRight fill="#9f9f9f" />
            </View>
          </Pressable>
        </View>

        <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter text-center mt-[2rem]">
          アキラ{" "}
          <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter text-center">
            · MADE WITH CARE
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
