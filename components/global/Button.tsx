import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import clsx from "clsx"; // Asegúrate de instalar clsx: npm install clsx

interface ContainerProps extends TouchableOpacityProps {
  children: React.ReactNode;
  onPress?: () => void;
}

const AkiraButton = ({ children, onPress, ...props }: ContainerProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={clsx(
        "bg-akira-ink dark:bg-akira-paper rounded-2xl items-center justify-center mx-[2rem] p-[1.25rem] flex-row gap-[1rem]",
        props.className,
      )}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export default AkiraButton;
