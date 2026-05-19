import { useWindowDimensions, View } from "react-native";
import { initialWindowMetrics } from "react-native-safe-area-context";

import { Fire_2, FullArrowRight } from "@/components/global/icons";
import { Text } from "@/components/global/Text";
import CircularProgress from "@/components/UI/ProgressBar";
import ThemeToggle from "@/components/UI/ThemeToggle";
import AkiraButton from "@/components/global/Button";

import { useState, useMemo } from "react";
import DecksContainer from "@/components/UI/index/DecksContainer";
import { Gradient } from "@/components/global/Gradient";

interface DashboardDate {
  day: string;
  month: string;
  date: number;
}

export default function HomeScreen() {
  // Other
  const { width, height } = useWindowDimensions();
  const topInset = initialWindowMetrics?.insets.top ?? 0;

  /*  SE QUEDA PORQUE FUE INCREIBLE
  useEffect(() => {
    // runs at the start of the app to make the stupidiest fix in the history of programming: force the app to load with the correct height changing the theme two times.
    try {
      toggleColorScheme();
      toggleColorScheme();
    } catch (error) {
      console.error("Error toggling color scheme:", error);
    }
  }, []);
  */

  // Greeting
  const [name] = useState("Gorje");

  const greeting = useMemo(() => {
    const hours = new Date().getHours();
    if (hours < 12) return "Morning";
    if (hours < 18) return "Afternoon";
    return "Evening";
  }, []);

  const date = useMemo<DashboardDate>(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
    };
    const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(now);
    return {
      day: parts.find((p) => p.type === "weekday")?.value || "",
      month: parts.find((p) => p.type === "month")?.value || "",
      date: now.getDate(),
    };
  }, []);

  // Dashboard Card
  const [reviewDebt, setReviewDebt] = useState(44);
  const [totalDaily, setTotalDaily] = useState(70);

  const progress = useMemo(() => {
    if (totalDaily > 0)
      return Math.round(((totalDaily - reviewDebt) / totalDaily) * 100);
    return 0;
  }, [reviewDebt, totalDaily]);

  // Streak
  const [streak, setStreak] = useState(12);

  return (
    <View className="flex-1 bg-akira-paper dark:bg-akira-darkBG">
      <View
        className="flex-1 bg-akira-paper dark:bg-akira-darkBG"
        style={{ paddingTop: topInset, minHeight: height }}
      >
        <View className="mx-[24px]">
          <View className="flex-row align-center justify-between">
            <View>
              <Text className="text-akira-darkText font-AK_data font-bold tracking-widest text-[14px] mt-[1.5rem]">
                {date.day.toUpperCase()} · {date.month.toUpperCase()}{" "}
                {date.date}
              </Text>
              <Text className="text-[10vw] font-light text-akira-ink dark:text-akira-paper font-AK_display text-[8vw]">
                {`Good ${greeting}, \n${name}.`}
              </Text>
            </View>
            <View className="items-center justify-center p-5">
              <CircularProgress
                percentage={progress}
                size={70}
                strokeWidth={7}
                scale={width <= 400 ? 0.8 : 1}
              />
            </View>
          </View>
        </View>
        {streak > 0 && (
          <View className="mx-[2rem] mt-[1.5rem] rounded-3xl overflow-hidden">
            <Gradient>
              <View className="p-[1rem] rounded-3xl flex-row justify-start items-center">
                <View className="p-[10px] bg-akira-lightFire rounded-xl">
                  <Fire_2 />
                </View>
                <View className="ml-[1rem] flex-1 gap-[4px]">
                  <Text className="dark:text-akira-ink text-akira-paper font-AK_UI font-bold text-[4vw]">
                    {streak === 1 ? "1 day" : `${streak} days`} streak
                  </Text>
                  <Text className="dark:text-akira-ink text-akira-paper font-AK_data tracking-wider text-[3vw]">
                    Finish today to keep it alive!
                  </Text>
                </View>
                <Text
                  variant="display"
                  className="text-[8vw] dark:text-akira-ink text-akira-paper"
                >
                  {streak}
                </Text>
              </View>
            </Gradient>
          </View>
        )}
        <View className="flex-row items-center justify-center gap-[1.5rem] mx-[2rem] my-[1rem]">
          <View className="flex w-[50%] bg-akira-pureWhite dark:bg-akira-lightDark px-[1rem] py-[1rem] rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm">
            <View className="">
              <Text className="text-akira-darkText font-AK_UI font-bold tracking-widest text-[3vw]">
                DUE
              </Text>
              <Text className="text-[10vw] font-light text-akira-ink dark:text-akira-paper font-AK_display">
                {reviewDebt}
              </Text>
              <Text
                className={`text-akira-darkText font-AK_data font-semibold text-[3vw]`}
              >
                cards waiting
              </Text>
            </View>
          </View>
          <View className="flex w-[50%] dark:bg-akira-pureWhite bg-akira-lightDark px-[1rem] py-[1rem] rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm">
            <View className="">
              <Text className="text-akira-darkText font-AK_UI font-bold tracking-widest text-[3vw]">
                DONE
              </Text>
              <Text className="text-[10vw] font-light dark:text-akira-ink text-akira-paper font-AK_display">
                {totalDaily - reviewDebt}
              </Text>
              <Text
                className={`text-akira-darkText font-AK_data font-semibold text-[3vw]`}
              >
                today
              </Text>
            </View>
          </View>
        </View>
        <DecksContainer
          showInfo={"RECENT DECKS"}
          showLimitedCards={3}
        ></DecksContainer>
        {/* <View className="mt-auto mb-[1rem]">
          <AkiraButton onPress={() => setStreak(streak + 1)}>
            <Text className="text-akira-paper dark:text-akira-ink font-AK_UI font-semibold tracking-widest text-[4.5vw] mb-[2px]">
              Start review session
            </Text>
            <FullArrowRight />
          </AkiraButton>
        </View> */}
      </View>
    </View>
  );
}
