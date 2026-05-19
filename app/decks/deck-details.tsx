import { useEffect, useState, useCallback } from "react";
import { View, TextInput, ScrollView, Pressable } from "react-native";
import { Text } from "@/components/global/Text";
import { SRSSchedule } from "@/components/UI/SRS-Schedule";
import { FullArrowRight, MagnifyingGlass } from "@/components/global/icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GetDeckById, GetDeckCards, deleteDeck } from "@/SRC/database/db_decks";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import AkiraButton from "@/components/global/Button";
import DeckOptionsSheet from "@/components/UI/DeckDetails/DeckOptions";
import DeleteDeckModal from "@/components/UI/ConfirmDelete";
import { DeckInfo, CardInfo } from "@/SRC/Types/types";

interface RouteParams {
  triggerFunction?: boolean;
}

export default function DeckDetails() {
  const router = useRouter();
  const route = useRoute<RouteProp<{ params: RouteParams }>>();
  const { deckId } = useLocalSearchParams();

  const [deck, setDeck] = useState<DeckInfo | null>(null);
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [search, setSearch] = useState("");

  const [sheetVisible, setSheetVisible] = useState(false);
  const [deckToDelete, setDeckToDelete] = useState<DeckInfo | null>(null);

  // Abre el sheet si se navega con triggerFunction (botón del header)
  useEffect(() => {
    if (route.params?.triggerFunction) {
      setSheetVisible(true);
    }
  }, [route.params]);

  const fetchData = async () => {
    try {
      const [deckData, cardsData] = await Promise.all([
        GetDeckById(Number(deckId)) as Promise<DeckInfo>,
        GetDeckCards(Number(deckId)) as Promise<CardInfo[]>,
      ]);
      setDeck(deckData);
      setCards(cardsData);
    } catch (error) {
      console.error("Error fetching deck details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [deckId]);

  // Refresca al volver a la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [deckId]),
  );

  const confirmDelete = async () => {
    if (!deckToDelete) return;
    try {
      await deleteDeck(deckToDelete.id);
      setDeckToDelete(null);
      console.log("(DeckDetails) Deck deleted, navigating back to decks list");
      router.replace("/(tabs)/Decks");
    } catch (error) {
      console.error("(DecksContainer) Error deleting deck:", error);
    }
  };

  // Filtra las cartas según el texto de búsqueda
  const filteredCards = cards.filter(
    (card) =>
      card.front.toLowerCase().includes(search.toLowerCase()) ||
      card.back.toLowerCase().includes(search.toLowerCase()),
  );

  if (!deck) return null;

  return (
    <View className="flex-1 bg-akira-paper dark:bg-akira-darkBG pb-[2rem]">
      {/* Header del deck */}
      <View className="flex-row items-center p-5 rounded-3xl mx-[2rem]">
        <View
          className={`${deck.color} rounded-xl w-[12.5vw] h-[12.5vw] items-center justify-center`}
        >
          <Text className="text-akira-pureWhite font-AK_display text-[2rem]">
            {deck.icon}
          </Text>
        </View>
        <View className="ml-4 flex-1 gap-[2px]">
          <Text
            className="text-akira-ink dark:text-akira-paper text-[7.5vw]"
            variant="display"
          >
            {deck.name || "Untitled Deck"}
          </Text>
          <Text className="text-akira-darkText font-AK_data text-[3.25vw]">
            {deck.card_count} cards · {deck.review_debt} due ·{" "}
            {deck.status === "archived" ? "Archived" : "Active"}
          </Text>
        </View>
      </View>

      {/* SRS Schedule */}
      <View className="mx-[2rem]">
        <SRSSchedule cards={cards} />
      </View>

      {/* Buscador */}
      <View className="mx-[2rem] mt-[1.5rem] bg-akira-pureWhite dark:bg-akira-lightDark border border-akira-boxBorder dark:border-akira-boxDarkBorder px-4 rounded-2xl flex-row items-center gap-3">
        <MagnifyingGlass size={20} />
        <TextInput
          className="dark:text-akira-paper text-akira-ink flex-1 py-3"
          placeholder="Search cards..."
          placeholderTextColor="#9f9f9f"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Cabecera de la lista */}
      <View className="flex-row justify-between mx-[2rem] mt-[1rem]">
        <Text className="text-akira-darkText font-AK_data tracking-widest text-[3vw]">
          ALL CARDS
        </Text>
        <Text className="text-akira-darkText font-AK_data tracking-widest text-[3vw]">
          {filteredCards.length} showing
        </Text>
      </View>

      {/* Lista de cartas */}
      <ScrollView
        className="mt-[1rem] flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredCards.length === 0 ? (
          <View className="items-center py-8">
            <Text className="text-akira-darkText font-AK_data text-[3.5vw]">
              No cards found.
            </Text>
          </View>
        ) : (
          filteredCards.map((card, index) => (
            <View key={card.id}>
              <Card
                front={card.front}
                back={card.back}
                status={card.status}
                id={card.id}
                deck={deck}
              />
              {index < filteredCards.length - 1 && (
                <View className="mx-[2rem] my-[1.5rem] border-[0.75px] border-akira-darkPaper dark:border-akira-boxDarkBorder" />
              )}
            </View>
          ))
        )}
      </ScrollView>

      {/* Botón de review */}
      {cards.length > 0 && (
        <AkiraButton onPress={() => console.log("Start review session")}>
          <Text className="text-akira-paper dark:text-akira-ink font-AK_UI font-semibold tracking-widest text-[4.5vw] mb-[2px]">
            Review {cards.length} {cards.length === 1 ? "card" : "cards"}
          </Text>
          <FullArrowRight />
        </AkiraButton>
      )}

      {/* Bottom sheet de opciones */}
      <DeckOptionsSheet
        visible={sheetVisible}
        deck={deck}
        onClose={() => setSheetVisible(false)}
        onDelete={() => {
          setSheetVisible(false);
          setDeckToDelete(deck as unknown as DeckInfo);
        }}
      />

      {/* Modal de confirmación de borrado */}
      {deckToDelete && (
        <DeleteDeckModal
          visible={true}
          deck={deck}
          onCancel={() => setDeckToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </View>
  );
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const getStatusColor = (status: number) => {
  if (status === 1) return "bg-akira-hard";
  if (status === 2) return "bg-akira-blue";
  return "bg-akira-accent";
};

const getStatusLabel = (status: number) => {
  if (status === 1) return "NEW";
  if (status === 2) return "YOUNG";
  return "MATURE";
};

// ─── Card Item ───────────────────────────────────────────────────────────────

function Card({
  front,
  back,
  status,
  id,
  deck,
}: {
  front: string;
  back: string;
  status: number;
  id: number;
  deck: DeckInfo;
}) {
  const router = useRouter();

  const editCard = () => {
    router.push({
      pathname: "/create-edit-card",
      params: {
        deckId: deck.id,
        newDeck: deck.card_count === 0 ? 1 : 0,
        cardInfo: JSON.stringify({ front, back, id }),
      },
    });
  };

  return (
    <Pressable
      className="flex-row items-center mx-[2rem] gap-1"
      onPress={editCard}
    >
      <View className={`${getStatusColor(status)} w-4 h-4 rounded-full mr-4`} />
      <Text
        className="text-akira-ink dark:text-akira-paper text-[5vw] w-[30%]"
        variant="display"
        numberOfLines={1}
      >
        {front}
      </Text>
      <Text
        className="text-akira-darkText dark:text-akira-darkPaper text-[3vw] flex-1"
        numberOfLines={1}
        variant="display"
      >
        {back}
      </Text>
      <Text className="text-akira-darkText dark:text-akira-darkPaper text-[3vw] ml-auto">
        {getStatusLabel(status)}
      </Text>
    </Pressable>
  );
}
