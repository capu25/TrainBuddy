import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "http";

// --- CHIAVE PESO UTENTE ---
// @fitness_tracker_weight

const getData = async (key: any) => {
  try {
    const current = await AsyncStorage.getItem("@fitness_tracker_weight");
    const currentWeight: number = current ? parseFloat(current) : 0;
    if (currentWeight) {
      const value = currentWeight - 10;
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};

interface Set {
  id: string;
  reps: number;
  weight: number;
  completed: boolean;
}

const getTotalWeight = async () => {
  try {
    const storedSets = await AsyncStorage.getItem("primaryStorageKey");
    if (storedSets) {
      const sets: Set[] = JSON.parse(storedSets);
      const totalWeight = sets.reduce((sum, set) => sum + set.weight, 0);
      return totalWeight;
    }
    return 0;
  } catch (e) {
    console.error(e);
  }
};

export const dummyStats = [
  {
    iconName: "barbell-outline",
    title: "Total lift",
    value: "+2.5 kg",
    color: "#22c55e",
  },
  {
    iconName: "flame-outline",
    title: "Calorie Perse",
    value: "1,280 kcal",
    color: "#f97316",
  },
  {
    iconName: "scale-outline",
    title: "Peso guadagnato",
    value: "+2.5 kg",
    color: "#3b82f6",
  },
  {
    iconName: "scale-outline",
    title: "Peso guadagnato",
    value: "+2.5 kg",
    color: "#3b82f6",
  },
];
