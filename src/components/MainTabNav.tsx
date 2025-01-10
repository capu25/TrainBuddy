import React from "react";

// --- IMPORT NAV UTILITIES ---
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// --- IMPORT SCREENS ---
import Home from "../navigation/screens/Home";
import Settings from "../navigation/screens/Settings";
import Stats from "../navigation/screens/Stats";
import Schedule from "../navigation/screens/Schedule";

// --- IMPORT ICONS ---
import Icon from "react-native-vector-icons/Ionicons";
import { MainTabParamList } from "../types/navigation";

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#d4d4d8",
        tabBarInactiveTintColor: "#27272a",
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "#000",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="grid-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="calendar-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="stats-chart-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="options-outline" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNav;
