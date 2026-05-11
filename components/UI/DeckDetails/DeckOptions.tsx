import { Modal, Animated, Pressable, View } from "react-native";
import { useEffect, useRef } from "react";
import { Text } from "@/components/global/Text";
import {
  Pencil,
  Add,
  Export,
  TrashCan,
  Archive,
} from "@/components/global/icons";

interface DeckOptionsSheetProps {
  visible: boolean;
  deck: { name: string } | null;
  onClose: () => void;
  onDelete: () => void;
}

const OPTIONS = [
  {
    icon: <Pencil />,
    label: "Edit deck",
    sub: "Name, icon, color",
    danger: false,
  },
  {
    icon: <Add />,
    label: "Add cards",
    sub: "Bulk import or one-by-one",
    danger: false,
  },
  {
    icon: <Export />,
    label: "Export",
    sub: "Anki / CSV / JSON",
    danger: false,
  },
  {
    icon: <Archive />,
    label: "Archive",
    sub: "Keep stats, pause reviews",
    danger: false,
  },
  {
    icon: <TrashCan />,
    label: "Delete deck",
    sub: "Permanent — confirms next",
    danger: true,
  },
];

export default function DeckOptionsSheet({
  visible,
  deck,
  onClose,
  onDelete,
}: DeckOptionsSheetProps) {
  const translateY = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: visible ? 0 : 500,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start();
  }, [visible]);

  const handlePress = (danger: boolean) => {
    if (danger) {
      onDelete(); // onDelete ya maneja el cierre
    } else {
      onClose();
    }
  };

  if (!deck) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Fondo oscuro — toca fuera para cerrar */}
      <Pressable
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
        onPress={onClose}
      />

      {/* Sheet */}
      <Animated.View
        style={{
          transform: [{ translateY }],
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: 40,
        }}
        className="bg-akira-pureWhite dark:bg-akira-lightDark"
      >
        {/* Handle */}
        <View className="w-10 h-1 bg-akira-lightGrey rounded-full self-center mb-4" />

        {/* Título */}
        <Text className="text-akira-darkText font-AK_data tracking-widest text-[3vw] mb-2">
          {deck.name.toUpperCase()}
        </Text>

        {OPTIONS.map((opt) => (
          <Pressable
            key={opt.label}
            className="flex-row items-center py-4 gap-4"
            onPress={() => handlePress(opt.danger)}
          >
            <View
              className={`w-14 h-14 rounded-xl items-center justify-center ${
                opt.danger
                  ? "bg-akira-lightRed"
                  : "bg-akira-lightGrey dark:bg-akira-darkGrey"
              }`}
            >
              {opt.icon}
            </View>
            <View className="flex-1">
              <Text
                className={`font-AK_UI font-semibold text-[3.75vw] ${
                  opt.danger
                    ? "text-akira-red"
                    : "text-akira-ink dark:text-akira-paper"
                }`}
              >
                {opt.label}
              </Text>
              <Text className="text-akira-darkText font-AK_data text-[3vw]">
                {opt.sub}
              </Text>
            </View>
          </Pressable>
        ))}
      </Animated.View>
    </Modal>
  );
}
