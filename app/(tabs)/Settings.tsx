import { Pressable, ScrollView, View, useWindowDimensions } from "react-native";
import { Text } from "@/components/global/Text";
import { initialWindowMetrics } from "react-native-safe-area-context";
import { UserInfo } from "@/SRC/Types/types";
import { useState } from "react";

export default function Settings() {
  const { width, height } = useWindowDimensions();
  const topInset = initialWindowMetrics?.insets.top ?? 0;

  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: 0,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    created_at: "19/04/2026",
    plan: "Free",
    color: "#69737d",
  });

  return (
    <ScrollView className="flex-1">
      <View
        className="flex-1 bg-akira-paper dark:bg-akira-darkBG px-[2rem] py-[1rem]"
        style={{ paddingTop: topInset, minHeight: height }}
      >
        <Text className="text-[4vw] text-akira-darkText  mt-[1.5rem]">
          セティングズ · Settings
        </Text>
        <Text
          className="text-[9vw] text-akira-text dark:text-akira-darkText"
          variant="display"
        >
          Settings
        </Text>

        <View className="flex-row items-center bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm gap-[1rem] mt-[1.5rem]">
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
            <Text className="font-semibold text-[4vw]">{userInfo.name}</Text>
            <Text className="text-akira-darkText font-AK_data text-[3vw] tracking-tighter">
              {userInfo.email}
            </Text>
          </View>
          <Pressable className="rounded-full px-6 py-3 self-center border border-akira-boxBorder dark:border-akira-boxDarkBorder ml-auto">
            <Text>Edit</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
