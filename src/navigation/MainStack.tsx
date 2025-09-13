import React, { useEffect, useState } from "react";

// --- IMPORT ONBOARDING ---
import OnBoarding from "../components/OnBoarding";

// --- IMPORT MAIN TAB NAV ---
import MainTabNav from "../components/MainTabNav";

// --- IMPORT SCREEN(S) ---
import ExplodedExercise from "./screens/nonVisible/ExplodedExercise";
import Timer from "./screens/nonVisible/Timer";
import MaintenanceMode from "./screens/maintenanceMode/MaintenanceMode";

// --- IMPORT NAVIGATION UTILITIES ---
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// --- IMPORT CONTEXT ---
import { ExerciseProvider } from "../context/ExerciseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator<RootStackParamList>();

const FIRST_ACCESS_KEY = "@first_access";

const MainStack = () => {
  //const isFirstAccess: Boolean = true;

  const [isFirstAccess, setIsFirstAccess] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkFirstAccess();
  }, []);

  const checkFirstAccess = async () => {
    try {
      const value = await AsyncStorage.getItem(FIRST_ACCESS_KEY);
      if (value === null) {
        await AsyncStorage.setItem(FIRST_ACCESS_KEY, "false");
      } else {
        setIsFirstAccess(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return null;

  return (
    <NavigationContainer>
      <ExerciseProvider>
        <Stack.Navigator
          initialRouteName="Maintenance"
          //initialRouteName={isFirstAccess ? "Onboarding" : "MainNav"}
          screenOptions={{ headerShown: false }}
        >
          {/* --- MAINTENANCE MODE --- */}
          <Stack.Screen
            name="Maintenance"
            component={MaintenanceMode}
            options={{ gestureEnabled: false }}
          />
          {/* --- FIRST ACCESS --- */}
          <Stack.Screen
            name="Onboarding"
            component={OnBoarding}
            options={{ gestureEnabled: false }}
          />
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
