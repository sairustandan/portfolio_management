import React from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "././screens/Dashboard";
import CustomDrawer from "./components/CustomDrawer";
import CustomIcon from "./components/CustomIcon";
import Stock from "././screens/Stock";
const Drawer = createDrawerNavigator();
const Dash = createStackNavigator();
const Polls = createStackNavigator();

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const DashStack = () => {
  return (
    <Dash.Navigator
      screenOptions={{
        headerShown: false,
        initialRouteName: "DashB",
      }}
    >
      <Dash.Screen name="DashB" component={Dashboard} />
    </Dash.Navigator>
  );
};

const PollsStack = () => {
  return (
    <Polls.Navigator
      screenOptions={{
        headerShown: false,
        initialRouteName: "Stockss",
      }}
    >
      <Polls.Screen name="Stockss" component={Stock} />
    </Polls.Navigator>
  );
};

const RootStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dash"
      screenOptions={{
        useLegacyImplementation: true,
        headerShown: true,
        drawerLabelStyle: {
          marginLeft: -15,
          marginTop: 10,
        },
        drawerActiveTintColor: "white",
        unmountOnBlur: true,
        drawerActiveBackgroundColor: "#062680",
        drawerInActiveTintColor: "#333",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashStack}
        options={{
          drawerIcon: ({ color }) => (
            <CustomIcon name="home-outline" color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Stocks"
        component={PollsStack}
        options={{
          drawerIcon: ({ color }) => (
            <CustomIcon name="bar-chart-outline" color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
};

export default RootStack;
