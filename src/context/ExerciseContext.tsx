import React, { createContext, ReactNode, useEffect, useState } from "react";

// --- TYPE IMPORT ---
import { Workout } from "../types/workout";
import { useContext } from "react";

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

// --- TESTING ---
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
import { RootStackParamList } from "../types/navigation";

export const ExerciseProvider: React.FC<ExerciseProviderProps> = ({
  children,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: "1",
      label: "Petto + Tricipiti",
      subtitle: "Lunedì",
    },
    {
      id: "2",
      label: "Schiena + Bicipiti",
      subtitle: "Martedì",
    },
    // Aggiungi altri workout secondo necessità
  ]);
  const handleWorkoutPress = (workout: Workout) => {
    // Implementa la logica per gestire il click sul workout
    //console.log("Workout pressed:", workout);
    navigation.navigate("Exploded", {
      workout: workout,
    });
  };

  const handleSettingsPress = (workout: Workout) => {
    // Implementa la logica per gestire il click sulle impostazioni
    console.log("Settings pressed for workout:", workout);
  };

  const addWorkout = (workout: Workout) => {
    setWorkouts((prevWorkouts) => [...prevWorkouts, workout]);
  };

  const deleteWorkout = (id: string) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.filter((workout) => workout.id !== id)
    );
  };

  // Qui puoi aggiungere funzioni per caricare i dati da un'API
  useEffect(() => {
    // Esempio di caricamento dati
    // fetchWorkouts().then(setWorkouts);
  }, []);

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

// Hook personalizzato per utilizzare il context
export const useWorkout = () => {
  const context = useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};
