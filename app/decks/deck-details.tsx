import { useEffect, useState } from "react";
import { View, TextInput, ScrollView, Pressable } from "react-native";
import { Text } from "@/components/global/Text";
import { SRSSchedule } from "@/components/UI/SRS-Schedule";
import { FullArrowRight, MagnifyingGlass } from "@/components/global/icons";

import { useLocalSearchParams, useRouter } from "expo-router";
import { GetDeckById, GetDeckCards } from "@/SRC/database/db_decks";
import { RouteProp, useRoute } from "@react-navigation/native";
import AkiraButton from "@/components/global/Button";

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

interface RouteParams {
  triggerFunction?: boolean;
}

export default function DeckDetails() {
  const router = useRouter();
  const route = useRoute<RouteProp<{ params: RouteParams }>>();

  useEffect(() => {
    if (route.params?.triggerFunction) {
      console.log("(deck-details) Función disparada desde el header");
      router.push({
        pathname: "/create-edit-card",
        params: { deckId, newDeck: deck?.card_count == 0 ? 1 : 0 },
      });
    }
  }, [route.params]);

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
        setShowing(cardsData.length);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchDeckDetails();
    fetchCards();
  }, [deckId]);

  return (
    <View className="flex-1 bg-akira-paper dark:bg-akira-darkBG pb-[2rem]">
      <View className="flex-row items-center p-5 rounded-3xl mx-[2rem]">
        <View
          className={`${deck?.color} rounded-xl w-[12.5vw] h-[12.5vw] items-center justify-center`}
        >
          <Text className="text-akira-pureWhite font-AK_display text-[2rem]">
            {deck?.icon}
          </Text>
        </View>
        <View className="ml-4 flex-1 gap-[2px]">
          <Text
            className="text-akira-ink dark:text-akira-paper text-[7.5vw]"
            variant="display"
          >
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
        <Text className="text-akira-darkText dark:text-akira-darkPaper font-AK_data tracking-widest text-[3vw]">
          ALL CARDS
        </Text>
        <Text className="text-akira-darkText dark:text-akira-darkPaper text-[3vw] font-AK_data tracking-widest">
          {showing} total
        </Text>
      </View>
      <ScrollView
        className="mt-[2rem] flex-1"
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {cards.map((card, index) => {
          const isLastChild = index === cards.length - 1;
          return (
            <View key={card.id}>
              <Card front={card.front} back={card.back} status={card.status} />
              {!isLastChild && (
                <View className="mx-[2rem] my-[1.5rem] border-[0.75px] border-akira-darkPaper dark:border-akira-boxDarkBorder" />
              )}
            </View>
          );
        })}
      </ScrollView>
      {cards.length > 0 && (
        <AkiraButton onPress={() => console.log("Start review session")}>
          <Text className="text-akira-paper dark:text-akira-ink font-AK_UI font-semibold tracking-widest text-[4.5vw] mb-[2px]">
            review {showing} {showing === 1 ? "card" : "cards"}
          </Text>
          <FullArrowRight />
        </AkiraButton>
      )}
    </View>
  );
}
const getStatusColor = (status: number) => {
  if (status == 1) return "bg-akira-hard";
  if (status == 2) return "bg-akira-blue";
  if (status == 3) return "bg-akira-accent";
};

function Card({
  front,
  back,
  status,
}: {
  front: string;
  back: string;
  status: number;
}) {
  return (
    <Pressable className={`flex-row items-center mx-[2rem] gap-1`}>
      <View className={`${getStatusColor(status)} w-4 h-4 rounded-full mr-4`} />
      <Text
        className="text-akira-ink dark:text-akira-paper text-[5vw] w-[30%] text-ellipsis"
        variant="display"
      >
        {front}
      </Text>
      <Text className="text-akira-darkText dark:text-akira-darkPaper text-[3vw]">
        {back}
      </Text>
      <Text className="text-akira-darkText dark:text-akira-darkPaper text-[3vw] ml-auto">
        {status == 1 ? "NEW" : status == 2 ? "YOUNG" : "MATURE"}
      </Text>
    </Pressable>
  );
}
