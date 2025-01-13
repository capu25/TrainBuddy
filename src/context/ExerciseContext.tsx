import React, { createContext, ReactNode, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Workout } from "../types/workout";
import { RootStackParamList } from "../types/navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ExerciseContextType {
  workouts: Workout[];
  handleWorkoutPress: (workout: Workout) => void;
  handleSettingsPress: (workout: Workout) => void;
  addWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined
);

interface ExerciseProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "@workouts";

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({
  children,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  // Load workouts from AsyncStorage when the component mounts
  useEffect(() => {
    loadWorkouts();
  }, []);

  // Load workouts from AsyncStorage
  const loadWorkouts = async () => {
    try {
      const storedWorkouts = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedWorkouts) {
        setWorkouts(JSON.parse(storedWorkouts));
      }
    } catch (error) {
      console.error("Error loading workouts:", error);
    }
  };

  // Save workouts to AsyncStorage
  const saveWorkouts = async (updatedWorkouts: Workout[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWorkouts));
    } catch (error) {
      console.error("Error saving workouts:", error);
    }
  };

  const handleWorkoutPress = (workout: Workout) => {
    navigation.navigate("Exploded", {
      workout: workout,
    });
  };

  const handleSettingsPress = (workout: Workout) => {
    console.log("Settings pressed for workout:", workout);
  };

  const addWorkout = async (workout: Workout) => {
    const updatedWorkouts = [...workouts, workout];
    setWorkouts(updatedWorkouts);
    await saveWorkouts(updatedWorkouts);
  };

  const deleteWorkout = async (id: string) => {
    const updatedWorkouts = workouts.filter((workout) => workout.id !== id);
    setWorkouts(updatedWorkouts);
    await saveWorkouts(updatedWorkouts);
  };

  return (
    <ExerciseContext.Provider
      value={{
        workouts,
        handleWorkoutPress,
        handleSettingsPress,
        addWorkout,
        deleteWorkout,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

// Custom hook to use the context
export const useWorkout = () => {
  const context = useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};
