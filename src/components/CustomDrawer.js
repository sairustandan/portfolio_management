import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#F5F6FF" }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    marginTop: 25,
    fontSize: 45,
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontFamily: "montserrat-bold",
  },
  h2: {
    marginBottom: 25,
    fontSize: 35,
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 20,
    fontFamily: "montserrat-regular",
  },
  drawerList: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  footer: {
    padding: width > 400 ? 20 : 10,
    marginHorizontal: width > 400 ? 0 : 10,
    borderTopWidth: 1,
    borderTopColor: "#CCC",
  },
});

export default CustomDrawer;
