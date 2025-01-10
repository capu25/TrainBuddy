import React from "react";

// --- IMPORT MAIN TAB NAV ---
import MainTabNav from "../components/MainTabNav";

// --- IMPORT SCREEN(S) ---
import ExplodedExercise from "./screens/nonVisible/ExplodedExercise";

// --- IMPORT NAVIGATION UTILITIES ---
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// --- IMPORT CONTEXT ---
import { ExerciseProvider } from "../context/ExerciseContext";

// --- TESTING ---
import { RootStackParamList } from "../types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();

//const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <ExerciseProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* --- MAIN TAB NAV --- */}
          <Stack.Screen
            name="MainNav"
            component={MainTabNav}
            options={{ gestureEnabled: false }}
          />
          {/* --- NON VISIBLE TAB --- */}
          <Stack.Screen name="Exploded" component={ExplodedExercise} />
        </Stack.Navigator>
      </ExerciseProvider>
    </NavigationContainer>
  );
};

export default MainStack;
