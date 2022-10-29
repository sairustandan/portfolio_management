import React from "react";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const CustomIcon = (props) => {
  return (
    <Ionicons
      name={Platform.OS === "android" ? props.name : `ios-${props.name}`}
      size={props.size}
      color={props.color}
      style={props.style}
    />
  );
};

export default CustomIcon;
