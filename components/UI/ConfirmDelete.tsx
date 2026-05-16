import { Modal, Pressable, View } from "react-native";
import { useState } from "react";
import { Text } from "@/components/global/Text";
import { DeckInfo as Deck } from "@/SRC/Types/types";
import { BlurView } from "expo-blur";
import { TrashCan } from "../global/icons";

export default function DeleteDeckModal({
  visible,
  deck,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  deck: Deck | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <BlurView
        intensity={80}
        tint="dark" // "light" | "dark" | "default"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 32,
        }}
      >
        <Pressable style={{ width: "100%" }} onPress={onCancel}>
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="bg-akira-paper dark:bg-akira-darkCard rounded-3xl p-6 w-full gap-5"
          >
            {/* Icono */}
            <View className="bg-akira-lightRed w-12 h-12 rounded-2xl items-center justify-center">
              <TrashCan />
            </View>

            {/* Título */}
            <Text className="text-akira-ink dark:text-akira-paper font-AK_display text-[7vw]">
              Delete {deck?.name}?
            </Text>

            {/* Descripción */}
            <Text className="text-akira-darkText font-AK_UI text-[3.5vw] leading-5">
              <Text className="font-bold text-akira-ink dark:text-akira-paper">
                {deck?.card_count} cards
              </Text>{" "}
              and{" "}
              <Text className="font-bold text-akira-ink dark:text-akira-paper">
                X days of progress
              </Text>{" "}
              will be removed. This can't be undone.
            </Text>

            {/* Tip */}
            <View className="bg-akira-whiteVoid dark:bg-akira-darkGrey rounded-2xl px-4 py-3">
              <Text className="text-akira-darkText font-AK_data text-[3vw]">
                Tip – try <Text className="font-bold">Archive</Text> to keep
                your stats but pause reviews.
              </Text>
            </View>

            {/* Botones */}
            <View className="flex-row gap-3 mt-2">
              <Pressable
                className="flex-1 border border-akira-boxBorder dark:border-akira-boxDarkBorder rounded-2xl py-4 items-center"
                onPress={onCancel}
              >
                <Text className="text-akira-ink dark:text-akira-paper font-AK_UI font-semibold">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                className="flex-1 bg-akira-red rounded-2xl py-4 items-center"
                onPress={onConfirm}
              >
                <Text className="text-white font-AK_UI font-semibold">
                  Delete deck
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </BlurView>
    </Modal>
  );
}
