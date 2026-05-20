import {
  BackIcon,
  Beach,
  Bell,
  DownArrow,
  Sandclock,
} from "@/components/global/icons";
import { Text } from "@/components/global/Text";
import { Notification_Settings } from "@/SRC/Types/types";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
import { Switch, View } from "react-native";
import { Pressable, ScrollView, useWindowDimensions } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getSettingsSet, updateSettingsSet } from "@/SRC/database/db_settings";
import Loading from "@/components/global/Loading";

export default function NotificationSettings() {
  const { width, height } = useWindowDimensions();
  const topInset = initialWindowMetrics?.insets.top ?? 0;

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const router = useRouter();

  const intervals = [30, 60, 120, 240]; // en minutos

  const [notificationSettings, setNotificationSettings] =
    useState<Notification_Settings>();

  const [showPicker, setShowPicker] = useState<"from" | "to" | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadSettings = async () => {
        const _notificationSettings = await getSettingsSet(
          "notification_settings",
        );

        if (_notificationSettings)
          setNotificationSettings(
            _notificationSettings as Notification_Settings,
          );
      };
      loadSettings();
    }, []),
  );

  const setSetting = async (tableName: string, values: Record<string, any>) => {
    try {
      await updateSettingsSet(tableName, values);
      console.log("(notification settings) Settings saved: ", values);
    } catch (e) {
      console.log("(notification settings) Error saving settings: ", e);
    }
  };

  if (!notificationSettings) {
    return (
      <Loading kanji="設" title="Notifications" leyend="Reading Settings..." />
    );
  }

  const timeStringToDate = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
  };

  const dateToTimeString = (date: Date) => {
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  const fromHour = Number(notificationSettings.from_time.split(":")[0]);
  const toHour = Number(notificationSettings.to_time.split(":")[0]);

  const leftPercent = (fromHour / 24) * 100;
  const widthPercent = ((toHour - fromHour) / 24) * 100;

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
            SETTINGS · NOTIFICATIONS
          </Text>
          <Text
            className="text-[9vw] text-akira-text dark:text-akira-darkText mb-[1rem]"
            variant="display"
          >
            NOTIFICATIONS
          </Text>
        </View>

        {/* Section */}

        <Text className="text-akira-darkText tracking-widest font-bold font-AK_data text-[2.75vw]">
          NOTIFICATION REVIEW
        </Text>
        <View className="flex bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm gap-[1rem] ">
          <Pressable className="flex-row gap-[1rem] items-center">
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Bell size={20} />
            </View>
            <View>
              <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                Send Notifications
              </Text>
              <Text className="text-akira-darkText font-AK_data text-[2.75vw] tracking-tighter">
                The headline feature - keep on
              </Text>
            </View>
            <View className="ml-auto items-center justify-center">
              <Switch
                value={notificationSettings.notifications === 1}
                onValueChange={(val) => {
                  setSetting("notification_settings", {
                    notifications: val === true ? 1 : 0,
                  });
                  setNotificationSettings((prev) =>
                    prev
                      ? { ...prev, notifications: val === true ? 1 : 0 }
                      : prev,
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
          WINDOW
        </Text>
        <View className="flex bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm gap-[1rem] ">
          <Pressable
            className="flex-row gap-[1rem] items-center"
            onPress={() => setShowPicker("from")}
          >
            <Text className="text-akira-darkText font-AK_data text-[3.5vw] tracking-wider font-bold  w-[15vw]">
              FROM
            </Text>
            {/*convertir de de HH:MM a HH:MM am-pm */}
            <Text
              className="text-[6.5vw] text-akira-ink dark:text-akira-paper"
              variant="display"
            >
              {formatTime(notificationSettings.from_time)}
            </Text>
            <View className=" ml-auto">
              <DownArrow size={15} />
            </View>
          </Pressable>

          {/* Separador */}
          <View className="border-b border-akira-boxBorder dark:border-akira-boxDarkBorder w-full" />

          <Pressable
            className="flex-row gap-[1rem] items-center"
            onPress={() => setShowPicker("to")}
          >
            <Text className="text-akira-darkText font-AK_data text-[3.5vw] tracking-wider font-bold  w-[15vw]">
              TO
            </Text>
            {/*convertir de de HH:MM a HH:MM am-pm */}
            <Text
              className="text-[6.5vw] text-akira-ink dark:text-akira-paper"
              variant="display"
            >
              {formatTime(notificationSettings.to_time)}
            </Text>
            <View className=" ml-auto">
              <DownArrow size={15} />
            </View>
          </Pressable>
        </View>
        <View className="flex bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm gap-[1rem]">
          <Text className="text-akira-darkText font-AK_data text-[2.75vw] tracking-widest font-bold">
            ACTIVE HOURS
          </Text>

          {/* Barra */}
          <View className="h-[1.5rem] bg-akira-lightGrey dark:bg-akira-darkGrey rounded overflow-hidden">
            <View
              className="absolute h-full bg-akira-green rounded"
              style={{
                left: `${leftPercent}%`,
                width: `${widthPercent}%`,
              }}
            />
          </View>

          {/* Labels */}
          <View className="flex-row justify-between">
            {["00", "06", "12", "18", "24"].map((label) => (
              <Text
                key={label}
                className="text-akira-darkText font-AK_data text-[2.75vw]"
              >
                {label}
              </Text>
            ))}
          </View>
        </View>

        {/* Section */}

        <Text className="text-akira-darkText tracking-widest font-bold font-AK_data text-[2.75vw]">
          BEHAVIOUR
        </Text>
        <View className="flex bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm gap-[1rem] ">
          <Pressable className="flex-row gap-[1rem] items-center">
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Sandclock size={20} />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper mb-2">
                Minimum interval
              </Text>
              <View className="flex-row bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-1 gap-1">
                {["30m", "1h", "2h", "4h"].map((option, index) => (
                  <Pressable
                    key={option}
                    onPress={() => {
                      setNotificationSettings({
                        ...notificationSettings,
                        minimun_interval: intervals[index],
                      });
                      setSetting("notification_settings", {
                        minimun_interval: intervals[index],
                      });
                    }}
                    className={`flex-1 items-center py-2 rounded-xl ${
                      notificationSettings.minimun_interval === intervals[index]
                        ? "bg-akira-pureWhite dark:bg-akira-lightDark"
                        : ""
                    }`}
                  >
                    <Text
                      className={`text-[3vw] font-AK_UI font-semibold ${
                        notificationSettings.minimun_interval ===
                        intervals[index]
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

          {/* Separador */}
          <View className="border-b border-akira-boxBorder dark:border-akira-boxDarkBorder w-full" />

          <Pressable className="flex-row gap-[1rem] items-center">
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Beach size={20} />
            </View>
            <View>
              <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                Weekend mode
              </Text>
              <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter">
                Lighter cadence on Sat & Sun
              </Text>
            </View>
            <View className="ml-auto items-center justify-center">
              <Switch
                value={notificationSettings.weekend_mode === 1}
                onValueChange={(val) => {
                  setSetting("notification_settings", {
                    weekend_mode: val === true ? 1 : 0,
                  });
                  setNotificationSettings((prev) =>
                    prev
                      ? { ...prev, weekend_mode: val === true ? 1 : 0 }
                      : prev,
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
          DELIVERY
        </Text>
        <View className="flex bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm gap-[1rem] ">
          <Pressable className="flex-row gap-[1rem] items-center">
            <View className="bg-akira-lightGrey dark:bg-akira-darkGrey rounded-2xl p-3">
              <Bell size={20} />
            </View>
            <View>
              <Text className="font-semibold text-[4vw] text-akira-ink dark:text-akira-paper">
                Silent delivery
              </Text>
              <Text className="text-akira-darkText font-AK_data text-[2.75vw] tracking-tighter">
                no sound or vibration
              </Text>
            </View>
            <View className="ml-auto items-center justify-center">
              <Switch
                value={notificationSettings.silent_mode === 1}
                onValueChange={(val) => {
                  setSetting("notification_settings", {
                    silent_mode: val === true ? 1 : 0,
                  });
                  setNotificationSettings((prev) =>
                    prev
                      ? { ...prev, silent_mode: val === true ? 1 : 0 }
                      : prev,
                  );
                }}
                trackColor={{ false: "#8a8a8a", true: "#83c575" }}
                thumbColor="#f4f2ed"
              />
            </View>
          </Pressable>
        </View>
      </View>
      {showPicker && (
        <DateTimePicker
          mode="time"
          value={timeStringToDate(
            showPicker === "from"
              ? notificationSettings.from_time
              : notificationSettings.to_time,
          )}
          onChange={(_, date) => {
            setShowPicker(null);
            if (!date) return;
            const key = showPicker === "from" ? "from_time" : "to_time";
            setSetting("notification_settings", {
              [key]: dateToTimeString(date),
            });
            setNotificationSettings((prev) =>
              prev
                ? {
                    ...prev,
                    [key]: dateToTimeString(date),
                  }
                : prev,
            );
          }}
        />
      )}
    </ScrollView>
  );
}
