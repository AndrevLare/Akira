import { useState, useEffect } from "react";
import { GetAllDecks } from "@/SRC/database/db_decks";
import { Text } from "@/components/global/Text";
import { View } from "react-native";

interface Deck {
  id: number;
  name: string;
  created_at: string;
  color: string;
  icon: string;
  card_count: number;
  review_debt: number;
}

export default function DecksContainer({ showInfo = false }) {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const allDecks: Deck[] = await GetAllDecks();
        setDecks(allDecks);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };

    fetchDecks();
  }, []);

  return (
    <View className="mx-[2rem] mt-[1.5rem] flex-1 items-center">
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
      {decks.map((deck) => (
        <View
          key={deck.id}
          className="flex-row items-center space-between bg-akira-pureWhite dark:bg-akira-lightDark p-[1rem] mx-[2rem] mt-[1.5rem] rounded-3xl shadow border border-akira-boxBorder dark:border-akira-boxDarkBorder p-5"
        >
          <Text>{deck.icon}</Text>
          <View>
            <Text>{deck.name}</Text>
            <Text>{deck.card_count} cards</Text>
          </View>
          <Text>{deck.review_debt} due</Text>
        </View>
      ))}
    </View>
  );
}
