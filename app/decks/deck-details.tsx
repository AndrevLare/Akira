import { useEffect, useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
import { Text } from "@/components/global/Text";
import { SRSSchedule } from "@/components/UI/SRS-Schedule";
import { MagnifyingGlass } from "@/components/global/icons";

import { useLocalSearchParams, useRouter } from "expo-router";
import { GetDeckById, GetDeckCards } from "@/SRC/database/db_decks";

interface DeckInfo {
  id: number;
  name: string;
  created_at: string;
  color: string;
  icon: string;
  card_count: number;
  review_debt: number;
  new_cards: number;
}

export interface CardInfo {
  id: number;
  front: string;
  back: string;
  interval: number;
  next_review_at: string;
  status: number;
  deck_id: number;
}
export default function DeckDetails() {
  const router = useRouter();
  const { deckId } = useLocalSearchParams();

  const [deck, setDeck] = useState<DeckInfo | null>(null);
  const [cards, setCards] = useState<CardInfo[]>([]);

  const [showing, setShowing] = useState(0);

  useEffect(() => {
    const fetchDeckDetails = async () => {
      try {
        const deckData: DeckInfo = (await GetDeckById(
          Number(deckId),
        )) as DeckInfo;
        setDeck(deckData);
      } catch (error) {
        console.error("Error fetching deck details:", error);
      }
    };

    const fetchCards = async () => {
      try {
        const cardsData: CardInfo[] = (await GetDeckCards(
          Number(deckId),
        )) as CardInfo[];
        setCards(cardsData);
        setShowing(
          cardsData.reduce((acc, card) => (card.status > 1 ? acc + 1 : acc), 0),
        );
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchDeckDetails();
    fetchCards();
  }, [deckId]);

  return (
    <ScrollView
      className="flex-1 bg-akira-paper dark:bg-akira-darkBG"
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row items-center p-5 rounded-3xl mx-[2rem]">
        <View
          className={`${deck?.color} rounded-xl w-[12.5vw] h-[12.5vw] items-center justify-center`}
        >
          <Text className="text-akira-pureWhite font-AK_display text-[2rem]">
            {deck?.icon}
          </Text>
        </View>
        <View className="ml-4 flex-1 gap-[2px]">
          <Text className="text-akira-ink dark:text-akira-paper font-AK_display text-[7.5vw]">
            {deck?.name || "Untitled Deck"}
          </Text>
          <Text className="text-akira-darkText font-AK_data text-[3.25vw]">
            {deck?.card_count} cards · {deck?.review_debt} due
          </Text>
        </View>
      </View>
      <View className="mx-[2rem]">
        <SRSSchedule cards={cards} />
      </View>
      <View className="mx-[2rem] mt-[1.5rem] bg-akira-pureWhite dark:bg-akira-lightDark border border-akira-boxBorder dark:border-akira-boxDarkBorder px-4 rounded-2xl text-akira-ink dark:text-akira-paper font-AK_UI text-[1.15rem] flex-row items-center gap-3">
        <MagnifyingGlass size={20} />
        <TextInput
          className="dark:text-akira-paper text-akira-ink flex-1 py-3"
          placeholder="Search Cards..."
          placeholderTextColor="#9f9f9f"
        />
      </View>
      <View className="flex-row justify-between mx-[2rem] mt-[1rem]">
        <Text className="text-akira-darkText font-AK_data tracking-widest text-[3vw]">
          ALL CARDS
        </Text>
        <Text className="text-akira-darkText text-[3vw] font-AK_data tracking-widest">
          {showing} showing
        </Text>
      </View>
    </ScrollView>
  );
}
