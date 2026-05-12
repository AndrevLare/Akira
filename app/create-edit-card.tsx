import { Text } from "@/components/global/Text";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, ScrollView, View } from "react-native";
import { InputText } from "@/components/global/Text";
import { CardInfo } from "@/SRC/Types/types";
import { createCard, updateCard, deleteCard } from "@/SRC/database/db_cards";
import AkiraButton from "@/components/global/Button";
import { AkiraRedButton } from "@/components/global/Button";
import { FullArrowRight } from "@/components/global/icons";

interface RouteParams {
  cardInfo?: string;
  triggerFunction?: boolean;
}

export default function CreateEditCard() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  const { deckId, newDeck: _newDeck } = useLocalSearchParams();
  const [newDeck, setNewDeck] = useState(_newDeck === "1");

  const router = useRouter();
  const route = useRoute<RouteProp<{ params: RouteParams }>>();

  const [showingFront, setShowingFront] = useState(true);
  const position = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // Card info
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [id, setId] = useState<number>(-1);

  const [delayedShowingFront, setDelayedShowingFront] = useState(showingFront);

  const _createCard = async () => {
    try {
      const response = await createCard(
        frontText,
        backText,
        parseInt(deckId as string),
      );

      if (response && typeof response === "number") {
        console.log("Tarjeta creada con ID:", response);
        setNewDeck(false);
      }
    } catch (error) {
      console.error("Error al crear la tarjeta:", error);
    }
  };

  const _updateCard = async () => {
    try {
      const response = await updateCard(
        id,
        frontText,
        backText,
        parseInt(deckId as string),
      );

      if (response && typeof response === "number") {
        console.log("Tarjeta actualizada con ID:", response);
        setNewDeck(false);
      }
    } catch (error) {
      console.error("Error al actualizar la tarjeta:", error);
    }
  };

  const _deleteCard = async () => {
    try {
      const response = await deleteCard(id);

      if (response) {
        console.log("Tarjeta eliminada con ID:", id);
        setNewDeck(false);
      }
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
    }
  };

  useEffect(() => {
    if (route.params?.cardInfo) {
      console.log(
        "(create-edit-card) Editing card with info:",
        route.params.cardInfo,
      );
      const { front, back, id } = JSON.parse(route.params.cardInfo);
      setFrontText(front);
      setBackText(back);
      setId(id);
    }

    if (route.params?.triggerFunction && id == -1) {
      console.log("(create-edit-card) Función disparada desde el header");
      if (frontText && backText) _createCard();
      router.push({
        pathname: "/decks/deck-details",
        params: { deckId: deckId.toString() },
      });
    } else if (route.params?.triggerFunction && id != -1) {
      console.log(
        "(create-edit-card) Función de actualización disparada desde el header",
      );
      if (frontText && backText) _updateCard();
      router.push({
        pathname: "/decks/deck-details",
        params: { deckId: deckId.toString() },
      });
    }
  }, [route.params]);

  const togglePosition = (isFront: boolean) => {
    setShowingFront(isFront);
    Animated.timing(position, {
      toValue: isFront ? 0 : 1,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const leftPosition = position.interpolate({
    inputRange: [0, 1],
    outputRange: [10, width / 2 - 10],
  });

  const flipCard = () => {
    Animated.timing(position, {
      toValue: showingFront ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      setShowingFront(!showingFront);
    });
  };

  const zRotation = position.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const flipCardInverse = () => {
    Animated.timing(position, {
      toValue: showingFront ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start(() => {
      setShowingFront(!showingFront);
    });
  };

  const zRotationInverse = position.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedShowingFront(showingFront);
    }, 150);

    return () => clearTimeout(timer);
  }, [showingFront]);

  return (
    <ScrollView
      className="flex-1 bg-akira-paper dark:bg-akira-darkBG gap-[1.5rem] px-[2rem] py-[1rem]"
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View>
        <Text className="text-[3rem] font-light text-akira-ink dark:text-akira-paper font-AK_display">
          {id === -1 ? "Add" : "Edit"} your {newDeck ? "first" : ""}card.
        </Text>
        <Text className="text-akira-darkText font-AK_UI text-[1rem]">
          You'll see this on your notifications soon. Or you can do a review
          session to see it right away.
        </Text>
      </View>
      {/* Card Editor */}
      <Pressable
        className="flex-row justify-between mt-[1.5rem] rounded-full bg-akira-whiteVoid dark:bg-akira-altLightDark py-5 relative"
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setWidth(width);
          setHeight(height);
        }}
        onPress={() => {
          togglePosition(false);
          flipCard();
          flipCardInverse();
        }}
      >
        <Text
          className={`font-AK_UI h-full text-[3.5vw] font-bold text-center w-[50%] z-20 ${showingFront ? "text-akira-paper dark:text-akira-ink" : "text-akira-ink dark:text-akira-paper"} pl-[15px]`}
        >
          Front · Question
        </Text>
        <Text
          className={`font-AK_UI h-full text-[3.5vw] font-bold text-center w-[50%] z-20 ${!showingFront ? "text-akira-paper dark:text-akira-ink" : "text-akira-ink dark:text-akira-paper"} pr-[15px]`}
        >
          Back · Answer
        </Text>
        <Animated.View
          style={{
            position: "absolute",
            backgroundColor: isDarkMode ? "#f4f2ed" : "#141414",
            width: "50%",
            height: height - 17.5,
            borderRadius: 9999,
            top: 17.5 / 2,
            left: leftPosition,
          }}
        />
      </Pressable>
      <Animated.View
        className="flex items-start bg-akira-pureWhite dark:bg-akira-lightDark p-5 rounded-3xl border border-akira-boxBorder dark:border-akira-boxDarkBorder shadow-sm mt-[1.5rem] h-[15rem] mb-[3rem]"
        style={{ transform: [{ rotateY: zRotation }] }}
      >
        <Animated.View
          className="flex-1 w-full"
          style={{ transform: [{ rotateY: zRotation }] }}
        >
          <Text className="text-akira-darkText font-AK_UI text-[1.15rem] tracking-widest">
            {delayedShowingFront ? "Question" : "Answer"}
          </Text>

          <InputText
            className="text-akira-ink dark:text-akira-paper font-AK_display text-[2rem] flex-1 h-full w-full align-top pt-1"
            placeholder={
              delayedShowingFront
                ? "Enter your question here..."
                : "Enter your answer here..."
            }
            // El valor y el cambio de texto DEBEN seguir vinculados al estado real
            // para que la escritura no tenga lag, solo el placeholder/etiqueta cambia
            value={showingFront ? frontText : backText}
            onChangeText={showingFront ? setFrontText : setBackText}
            multiline={true}
          />
        </Animated.View>
      </Animated.View>
      {id == -1 ? (
        <AkiraButton
          onPress={() => {
            _createCard();
            setFrontText("");
            setBackText("");
            if (!showingFront) {
              togglePosition(false);
              flipCard();
              flipCardInverse();
            }
          }}
        >
          <Text className="text-akira-paper dark:text-akira-ink font-AK_UI font-semibold tracking-widest text-[4.5vw] mb-[2px]">
            Create another card
          </Text>
          <FullArrowRight />
        </AkiraButton>
      ) : (
        <AkiraRedButton
          onPress={() => {
            _deleteCard();
            router.push({
              pathname: "/decks/deck-details",
              params: { deckId: deckId.toString() },
            });
          }}
        >
          <Text className="text-akira-paper font-AK_UI font-semibold tracking-widest text-[4.5vw] mb-[2px]">
            Delete card
          </Text>
        </AkiraRedButton>
      )}
    </ScrollView>
  );
}
