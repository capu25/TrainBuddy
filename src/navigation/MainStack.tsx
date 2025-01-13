import React from "react";

// --- IMPORT ONBOARDING ---
import OnBoarding from "../components/OnBoarding";

// --- IMPORT MAIN TAB NAV ---
import MainTabNav from "../components/MainTabNav";

// --- IMPORT SCREEN(S) ---
import ExplodedExercise from "./screens/nonVisible/ExplodedExercise";
import Timer from "./screens/nonVisible/Timer";

// --- IMPORT NAVIGATION UTILITIES ---
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// --- IMPORT CONTEXT ---
import { ExerciseProvider } from "../context/ExerciseContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  const isFirstAccess: Boolean = false;
  return (
    <NavigationContainer>
      <ExerciseProvider>
        <Stack.Navigator
          initialRouteName={isFirstAccess ? "Onboarding" : "MainNav"}
          screenOptions={{ headerShown: false }}
        >
          {/* --- FIRST ACCESS --- */}
          <Stack.Screen name="Onboarding" component={OnBoarding} />
          {/* --- MAIN TAB NAV --- */}
          <Stack.Screen
            name="MainNav"
            component={MainTabNav}
            options={{ gestureEnabled: false }}
          />
          {/* --- NON VISIBLE TAB --- */}
          <Stack.Screen name="Exploded" component={ExplodedExercise} />
          <Stack.Screen name="Timer" component={Timer} />
        </Stack.Navigator>
      </ExerciseProvider>
    </NavigationContainer>
  );
};

export default MainStack;
