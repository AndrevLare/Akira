import { useWindowDimensions, View } from "react-native";
import { useColorScheme } from "nativewind";

import {
  ArrowRight,
  Fire,
  Fire_2,
  FullArrowRight,
} from "@/components/global/icons";
import { Text } from "@/components/global/Text";
import CircularProgress from "@/components/UI/ProgressBar";
import ThemeToggle from "@/components/UI/ThemeToggle";
import AkiraButton from "@/components/UI/Button";

import { Link } from "expo-router";

import { useState, useEffect } from "react";

interface DashboardDate {
  day: string;
  month: string;
  date: number;
}

export default function HomeScreen() {
  // Other
  const { width } = useWindowDimensions();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  useEffect(() => {
    // runs at the start of the app to make the stupidiest fix in the history of programming: force the app to load with the correct height changing the theme two times.
    try {
      toggleColorScheme();
      toggleColorScheme();
    } catch (error) {
      console.error("Error toggling color scheme:", error);
    }
  }, []);

  // Greeting
  const [name, setName] = useState("Gorje");
  const [greeting, setGreeting] = useState("");
  const [date, setDate] = useState<DashboardDate>({
    day: "",
    month: "",
    date: 0,
  });

  // Dashboard Card
  const [reviewDebt, setReviewDebt] = useState(44);
  const [totalDaily, setTotalDaily] = useState(77);

  const [progress, setProgress] = useState(0);

  // Streak
  const [streak, setStreak] = useState(12);

  useEffect(() => {
    if (totalDaily > 0) {
      setProgress(Math.round(((totalDaily - reviewDebt) / totalDaily) * 100));
    } else {
      setProgress(0);
    }
  }, [reviewDebt, totalDaily]);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting("Morning");
    } else if (hours < 18) {
      setGreeting("Afternoon");
    } else {
      setGreeting("Evening");
    }
  }, []);

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(now);
    const day = parts.find((part) => part.type === "weekday")?.value || "";
    const month = parts.find((part) => part.type === "month")?.value || "";
    const date = now.getDate();

    setDate({ day, month, date });
  }, []);

  return (
    <View className="flex-1 bg-akira-paper dark:bg-akira-darkBG">
      <View className="mx-[24px] mt-[48px]">
        <Text className="text-akira-darkText font-AK_data font-bold tracking-widest text-[14px]">
          {date.day.toUpperCase()} · {date.month.toUpperCase()} {date.date}
        </Text>
        <Text className="text-[40px] font-light text-akira-ink dark:text-akira-paper font-AK_display text-[3rem]">
          {`Good ${greeting}, \n${name}.`}
        </Text>
      </View>
      <ThemeToggle className="absolute top-[54px] right-[32px]" />
      <View className="flex-row items-center space-between bg-akira-pureWhite dark:bg-akira-lightDark p-[1rem] mx-[2rem] mt-[1.5rem] rounded-3xl shadow border border-akira-boxBorder dark:border-akira-boxDarkBorder p-5">
        <CircularProgress percentage={progress} size={100} strokeWidth={10} />
        <View className="ml-[2rem] flex">
          <Text className="text-akira-darkText font-AK_UI font-bold tracking-widest">
            REVIEW DEBT
          </Text>
          <Text className="text-akira-darkText font-AK_data text-[1.5rem]">
            <Text className="text-[40px] font-light text-akira-ink dark:text-akira-paper font-AK_display text-[3.25rem]">
              {reviewDebt}
            </Text>{" "}
            / {totalDaily}
          </Text>
          <Text
            className={`text-akira-darkText font-AK_data font-semibold flex-1 ${width > 390 ? "" : "text-[3vw]"}`}
          >
            {totalDaily - reviewDebt} done · {reviewDebt} to go{" "}
          </Text>
        </View>
      </View>
      <View className="m-[2rem] p-[1rem] bg-akira-darkWhite dark:bg-akira-altLightDark rounded-3xl shadow flex-row justify-start items-center">
        <View className="p-[10px] bg-akira-lightFire rounded-xl">
          <Fire_2 />
        </View>
        <View className="ml-[1rem] flex-1 gap-[4px]">
          <Text className="text-akira-ink dark:text-akira-paper font-AK_UI font-bold tracking-widest">
            YOUR STREAK
          </Text>
          <Text className="text-akira-darkText font-AK_data text-[1.25rem]">
            {streak} days <Fire className="inline" size={16} />
          </Text>
          <Text className="text-akira-darkText font-AK_UI tracking-widest">
            You're on fire!!
          </Text>
        </View>
        <ArrowRight size={24} fill="#9f9f9f" />
      </View>
      <AkiraButton onPress={() => console.log("Start review session")}>
        <Text className="text-akira-paper dark:text-akira-ink font-AK_UI font-semibold tracking-widest text-[4.5vw] mb-[2px]">
          Start review session
        </Text>
        <FullArrowRight />
      </AkiraButton>
    </View>
  );
}
