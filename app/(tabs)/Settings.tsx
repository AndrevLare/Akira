import { Pressable, ScrollView, View, useWindowDimensions } from "react-native";
import { Text } from "@/components/global/Text";
import { initialWindowMetrics } from "react-native-safe-area-context";
import {
  UserInfo,
  SRS_Settings,
  Settings as SettingsType,
  Notification_Settings,
} from "@/SRC/Types/types";
import { useCallback, useEffect, useState } from "react";
import {
  Archive,
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
import { useFocusEffect, useRouter } from "expo-router";
import { getSettingsSet, updateSettingsSet } from "@/SRC/database/db_settings";
import Loading from "@/components/global/Loading";

export default function Settings() {
  const { width, height } = useWindowDimensions();
  const topInset = initialWindowMetrics?.insets.top ?? 0;
  const router = useRouter();

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [userInfo, setUserInfo] = useState<UserInfo>();

  const [appSettings, setAppSettings] = useState<SettingsType>();

  const [notificationsSettings, setNotificationsSettings] =
    useState<Notification_Settings>();

  const [srsSettings, setSRS_Settings] = useState<SRS_Settings>();

  useFocusEffect(
    useCallback(() => {
      const loadSettings = async () => {
        const _userInfo = await getSettingsSet("user_data");
        const _appSettings = await getSettingsSet("settings");
        const _notificationsSettings = await getSettingsSet(
          "notification_settings",
        );
        const _srsSettings = await getSettingsSet("srs_settings");

        if (_userInfo) setUserInfo(_userInfo as UserInfo);
        if (_appSettings) setAppSettings(_appSettings as SettingsType);
        if (_notificationsSettings)
          setNotificationsSettings(
            _notificationsSettings as Notification_Settings,
          );
        if (_srsSettings) setSRS_Settings(_srsSettings as SRS_Settings);
      };

      loadSettings();
    }, []),
  );

  const setSetting = async (settingsTable: string, value: any) => {
    try {
      await updateSettingsSet(settingsTable, value);
    } catch (error) {
      console.error("Error updating setting:", error);
    }
  };

  if (!userInfo || !appSettings || !notificationsSettings || !srsSettings) {
    return <Loading kanji="設" title="Settings" leyend="Reading Settings..." />;
  }
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
            <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter">
              {/* {userInfo.email} */} {userInfo.total_decks} decks
            </Text>
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
                {srsSettings.daily_cards_limit} / day ·{" "}
                {srsSettings.daily_new_cards} new
              </Text>
            </View>
            <View className="ml-auto items-center justify-center">
              <ArrowRight fill="#9f9f9f" />
            </View>
          </Pressable>

          {/* Separador */}
          <View className="border-b border-akira-boxBorder dark:border-akira-boxDarkBorder w-full" />

          <Pressable
            className="flex-row gap-[1rem] items-center"
            onPress={() =>
              router.push({
                pathname: "/settings/Notification-Settings",
              })
            }
          >
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Bell size={20} />
            </View>
            <View>
              <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                Notifications
              </Text>
              <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter">
                {notificationsSettings.from_time} -{" "}
                {notificationsSettings.to_time}
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
            onPress={() => {
              setSetting("settings", {
                dark_mode: colorScheme === "dark" ? 0 : 1,
              });
              toggleColorScheme();
            }}
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
                value={appSettings.haptics === 1}
                onValueChange={(val) => {
                  setSetting("settings", { haptics: val === true ? 1 : 0 });
                  setAppSettings((prev) =>
                    prev ? { ...prev, haptics: val === true ? 1 : 0 } : prev,
                  );
                }}
                trackColor={{ false: "#8a8a8a", true: "#83c575" }}
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
                value={appSettings.sounds === 1}
                onValueChange={(val) => {
                  setSetting("settings", { sounds: val === true ? 1 : 0 });
                  setAppSettings((prev) =>
                    prev ? { ...prev, sounds: val === true ? 1 : 0 } : prev,
                  );
                }}
                trackColor={{ false: "#8a8a8a", true: "#83c575" }}
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
          <Pressable
            className="flex-row gap-[1rem] items-center"
            onPress={() => router.push("/settings/Archive")}
          >
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Archive size={20} />
            </View>
            <View>
              <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                Archived decks
              </Text>
              <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter">
                {userInfo.archived_decks}
              </Text>
            </View>
            <View className="ml-auto items-center justify-center">
              <ArrowRight fill="#9f9f9f" />
            </View>
          </Pressable>
        </View>

        {/* Section */}

        <Text className="text-akira-darkText tracking-widest font-bold font-AK_data text-[2.75vw]">
          ABOUT
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
                v0.1.0 · build 4
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
