import { Dimensions, View } from "react-native";
import { Text } from "@/components/global/Text";

import { CardInfo } from "@/app/decks/deck-details";
import { useEffect, useState } from "react";

const screenWidth = Dimensions.get("window").width;
const calculatedWidth = screenWidth / 13 - 10; // 10 is the total horizontal margin (5 on each side) for each bar

export function SRSSchedule({ cards }: { cards: CardInfo[] }) {
  const [reviewCounts, setReviewCounts] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    // Calculate the number of reviews for the next 12 days using the cards' next_review_at property and the current date.
    const today = new Date();
    const reviewCounts = Array(12).fill(0);
    cards.forEach((card) => {
      const nextReviewDate = new Date(card.next_review_at);
      const diffInDays = Math.floor(
        (nextReviewDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (diffInDays >= 0 && diffInDays < 12) {
        reviewCounts[diffInDays]++;
      }
    });
    const reviewMax = Math.max(...reviewCounts);
    reviewCounts.forEach((count, index) => {
      count = reviewMax > 0 ? count * (75 / reviewMax) : 5;
    });
    setReviewCounts(reviewCounts);
  }, [cards]);

  return (
    <View className="bg-akira-pureWhite dark:bg-akira-lightDark border border-akira-boxBorder dark:border-akira-boxDarkBorder rounded-2xl py-3 px-5 shadow-sm gap-2">
      <Text className="text-akira-grey font-AK_UI  mb-2">Upcoming Reviews</Text>
      <View className="flex-row justify-between items-end h-[75px]">
        {Array.from({ length: 12 }).map((_, i) => (
          <View
            className={`${i == 0 ? "bg-akira-green" : "bg-akira-darkGrey"} rounded`}
            key={i}
            style={{
              width: calculatedWidth,
              height: reviewCounts[i] || 5,
            }}
          />
        ))}
      </View>
    </View>
  );
}
