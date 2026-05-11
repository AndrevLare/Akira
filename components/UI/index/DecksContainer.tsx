import { useState, useEffect, useCallback } from "react";
import { GetAllDecks } from "@/SRC/database/db_decks";
import { Text } from "@/components/global/Text";
import { Pressable, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import DeleteDeckModal from "@/components/UI/ConfirmDelete";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useRef } from "react";
import { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";

export interface Deck {
  id: number;
  name: string;
  created_at: string;
  color: string;
  icon: string;
  card_count: number;
  review_debt: number;
  new_cards: number;
}

export default function DecksContainer({
  showInfo = "YOUR DECKS",
  showLimitedCards = 0,
}: {
  showInfo?: string;
  showLimitedCards?: number;
}) {
  const router = useRouter();

  const [decks, setDecks] = useState<Deck[]>([]);
  const [deckToDelete, setDeckToDelete] = useState<Deck | null>(null);

  const fetchDecks = async () => {
    try {
      const allDecks: Deck[] = await GetAllDecks();
      setDecks(allDecks.sort((a, b) => b.review_debt - a.review_debt));
    } catch (error) {
      console.error("Error fetching decks:", error);
    }
  };

  const handleDelete = (deck: Deck) => {
    setDeckToDelete(deck);
  };

  const confirmDelete = () => {
    if (!deckToDelete) return;
    // DeleteDeck(deckToDelete.id);
    setDecks((prev) => prev.filter((d) => d.id !== deckToDelete.id));
    setDeckToDelete(null);
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
    <ScrollView
      className="mx-[2rem] mt-[1rem]"
      contentContainerStyle={{
        paddingBottom: 20,
        gap: 12,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row items-center justify-between w-full">
        <Text className="text-akira-darkText font-bold tracking-widest">
          {showInfo}
        </Text>
        <Text className="text-akira-darkText font-bold tracking-widest">
          {showInfo === "RECENT DECKS" ? `` : `${decks.length} total`}
        </Text>
      </View>

      {decks.length === 0 ? (
        <View className="justify-center items-center py-4">
          <Text className="text-akira-darkText font-AK_data text-[4vw] text-center">
            You haven't created any decks yet.
          </Text>
        </View>
      ) : (
        (showLimitedCards > 0 ? decks.slice(0, showLimitedCards) : decks).map(
          (deck) => (
            <DeckItem
              key={deck.id}
              deck={deck}
              router={router}
              onDelete={handleDelete}
            />
          ),
        )
      )}
      {deckToDelete && (
        <DeleteDeckModal
          visible={!!deckToDelete}
          deck={deckToDelete}
          onCancel={() => setDeckToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </ScrollView>
  );
}

function DeleteAction({ prog }: { prog: SharedValue<number> }) {
  const animStyle = useAnimatedStyle(() => ({
    opacity: prog.value,
    transform: [{ translateX: (1 - prog.value) * 80 }],
  }));

  return (
    <Reanimated.View
      style={animStyle}
      className="bg-red-500 justify-center items-center rounded-3xl ml-2 px-6"
    >
      <Text className="text-white font-AK_UI font-bold text-[3.5vw]">
        Delete
      </Text>
    </Reanimated.View>
  );
}

function DeckItem({
  deck,
  router,
  onDelete,
}: {
  deck: Deck;
  router: any;
  onDelete: (deck: Deck) => void;
}) {
  const renderRightActions = (prog: SharedValue<number>) => (
    <DeleteAction prog={prog} />
  );

  const swipeableRef = useRef<SwipeableMethods>(null);

  const handleSwipeOpen = () => {
    swipeableRef.current?.close();
    onDelete(deck);
  };

  return (
    <ReanimatedSwipeable
      friction={2} // más fricción = más lento al arrastrar
      overshootFriction={10} // muy lento una vez que supera el límite
      overshootLeft={false} // no permite pasar del límite por la izquierda
      rightThreshold={40}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={handleSwipeOpen}
      ref={swipeableRef}
    >
      <Pressable
        className="flex-row items-center bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm"
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
    </ReanimatedSwipeable>
  );
}
