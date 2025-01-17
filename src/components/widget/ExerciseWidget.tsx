import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import SetModal from "../modals/SetModal";
import ModSetModal from "../modals/mod/ModSetModal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

// --- TESTING ---

// --- TESTING ---

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ExerciseDetails {
  name: string;
  description: string;
  rec: number;
  onDelete?: () => void;
}

interface Set {
  id: string;
  reps: number;
  weight: number;
  completed: boolean;
}

const ExerciseWidget: React.FC<ExerciseDetails> = ({
  name,
  description,
  rec,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const [sets, setSets] = useState<Set[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModModalVisible, setIsModModalVisible] = useState(false);
  const [selectedSet, setSelectedSet] = useState<Set | null>(null);

  // Chiave unica per ogni esercizio
  const storageKey = `exercise_sets_${name.toLowerCase().replace(/\s+/g, "_")}`;

  // Carica le serie salvate all'avvio del componente
  useEffect(() => {
    loadSets();
  }, []);

  // Carica le serie da AsyncStorage
  const loadSets = async () => {
    try {
      const savedSets = await AsyncStorage.getItem(storageKey);
      if (savedSets) {
        setSets(JSON.parse(savedSets));
      }
    } catch (error) {
      console.error("Errore nel caricamento delle serie:", error);
    }
  };

  // Salva le serie in AsyncStorage
  const saveSets = async (newSets: Set[]) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(newSets));
    } catch (error) {
      console.error("Errore nel salvataggio delle serie:", error);
    }
  };

  // Gestisce il toggle del completamento
  const toggleSetCompletion = async (id: string) => {
    const updatedSets = sets.map((set) =>
      set.id === id ? { ...set, completed: !set.completed } : set
    );
    setSets(updatedSets);
    await saveSets(updatedSets);
  };

  // Aggiunge una nuova serie
  const addSet = async (weight: number, reps: number) => {
    const newSet: Set = {
      id: (sets.length + 1).toString(),
      reps,
      weight,
      completed: false,
    };
    const updatedSets = [...sets, newSet];
    setSets(updatedSets);
    await saveSets(updatedSets);
  };

  // Modifica una serie esistente
  const handleSetModification = async (weight: number, reps: number) => {
    if (selectedSet) {
      const updatedSets = sets.map((set) =>
        set.id === selectedSet.id ? { ...set, weight, reps } : set
      );
      setSets(updatedSets);
      await saveSets(updatedSets);
    }
  };

  const handleLongPress = (set: Set) => {
    setSelectedSet(set);
    setIsModModalVisible(true);
  };

  const handleDeleteSet = async () => {
    if (selectedSet) {
      const updatedSets = sets.filter((set) => set.id !== selectedSet.id);
      setSets(updatedSets);
      await saveSets(updatedSets);
      setIsModModalVisible(false);
      setSelectedSet(null);
    }
  };

  return (
    <View className="rounded-lg border border-zinc-800 p-3 mt-8">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="w-14 h-14 border-2 rounded-lg justify-center items-center bg-zinc-800">
            <Icon name="barbell-outline" color="white" size={35} />
          </View>
          <View className="ml-2">
            <Text className="text-white text-xl">{name}</Text>
            <Text className="text-zinc-400 text-base max-w-[92%]">
              {description}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Timer", { time: rec })}
          className="border border-zinc-400 rounded-lg px-3 py-1.5 flex-row items-center ml-2"
        >
          <Icon name="timer-outline" color="white" size={22} />
          <Text className="text-white ml-1">{rec}</Text>
        </TouchableOpacity>
      </View>

      {/* Sezione serie */}
      <View className="mt-4 border-t border-zinc-800 pt-3">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-zinc-400">Serie completate</Text>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            className="flex-row items-center bg-zinc-800 px-3 py-1.5 rounded-lg"
          >
            <Icon name="add-outline" color="white" size={20} />
            <Text className="text-white ml-1">Aggiungi serie</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2 mt-4">
            {sets.map((set) => (
              <TouchableOpacity
                key={set.id}
                onLongPress={() => handleLongPress(set)}
                onPress={() => toggleSetCompletion(set.id)}
                className={`border ${
                  set.completed
                    ? "border-green-500 bg-green-500/10"
                    : "border-zinc-700"
                } rounded-lg p-2 min-w-[80px]`}
              >
                <Text className="text-white text-center">{set.weight}kg</Text>
                <Text className="text-zinc-400 text-center">
                  {set.reps} rep
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <SetModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={addSet}
      />

      <ModSetModal
        visible={isModModalVisible}
        onClose={() => {
          setIsModModalVisible(false);
          setSelectedSet(null);
        }}
        onSave={handleSetModification}
        onDelete={handleDeleteSet}
        currentWeight={selectedSet?.weight || 0}
        currentReps={selectedSet?.reps || 0}
      />
    </View>
  );
};

export default ExerciseWidget;
