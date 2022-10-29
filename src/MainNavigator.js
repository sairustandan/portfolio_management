import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import RootStack from "./RootStack";
import { NavigationContainer } from "@react-navigation/native";

const MainNavigator = ({ navigation }) => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default MainNavigator;
