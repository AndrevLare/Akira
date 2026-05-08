import { useState, useEffect, useCallback } from "react";
import { GetAllDecks } from "@/SRC/database/db_decks";
import { Text } from "@/components/global/Text";
import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

interface Deck {
  id: number;
  name: string;
  created_at: string;
  color: string;
  icon: string;
  card_count: number;
  review_debt: number;
  new_cards: number;
}

export default function DecksContainer({ showInfo = false }) {
  const router = useRouter();

  const [decks, setDecks] = useState<Deck[]>([]);

  const fetchDecks = async () => {
    try {
      const allDecks: Deck[] = await GetAllDecks();
      setDecks(allDecks);
    } catch (error) {
      console.error("Error fetching decks:", error);
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDecks();
    }, []),
  );

  return (
    <View className="mx-[2rem] mt-[1.5rem] flex-1 items-center gap-[1.5rem]">
      {showInfo && (
        <View className="flex-row items-center justify-between w-full mb-[1.5rem]">
          <Text className="text-akira-darkText font-bold tracking-widest">
            YOUR DECKS
          </Text>
          <Text className="text-akira-darkText font-bold tracking-widest">
            {decks.length} total
          </Text>
        </View>
      )}
      {decks.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-akira-darkText font-AK_data text-[4vw] text-center">
            You haven't created any decks yet.
          </Text>
        </View>
      ) : (
        decks.map((deck) => (
          <Pressable
            className="flex-row items-center bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm"
            key={deck.id}
            onPress={() =>
              router.push({
                pathname: "/decks/deck-details",
                params: { deckId: deck.id },
              })
            }
          >
            <View
              className={`${deck.color} rounded-xl w-[12.5vw] h-[12.5vw] items-center justify-center`}
            >
              <Text className="text-akira-pureWhite font-AK_display text-[2rem]">
                {deck.icon}
              </Text>
            </View>
            <View className="ml-4 flex-1 gap-[2px]">
              <Text className="text-akira-ink dark:text-akira-paper font-AK_UI font-bold text-lg">
                {deck.name || "Untitled Deck"}
              </Text>
              <Text className="text-akira-darkText font-AK_data text-[3.25vw]">
                {deck.card_count} cards · {deck.new_cards} new
              </Text>
            </View>
            <View
              className={`${deck.review_debt > 0 ? "bg-akira-lightGreen" : "bg-akira-lightGrey dark:bg-akira-darkGrey"} rounded-full px-3 py-1 self-center`}
            >
              <Text
                className={`${deck.review_debt > 0 ? "text-akira-darkGreen" : "text-akira-grey"} font-semibold text-[2.75vw]`}
              >
                {deck.review_debt > 0
                  ? `${deck.review_debt} due`
                  : "All caught up!"}
              </Text>
            </View>
          </Pressable>
        ))
      )}
    </View>
  );
}
