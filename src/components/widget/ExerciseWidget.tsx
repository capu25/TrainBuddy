import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import SetModal from "../modals/SetModal";
import ModSetModal from "../modals/mod/ModSetModal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

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
  const [secondarySets, setSecondarySets] = useState<Set[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondaryModalVisible, setIsSecondaryModalVisible] = useState(false);
  const [isModModalVisible, setIsModModalVisible] = useState(false);
  const [selectedSet, setSelectedSet] = useState<Set | null>(null);
  const [isSecondaryRow, setIsSecondaryRow] = useState(false);
  const [activeSetType, setActiveSetType] = useState<"primary" | "secondary">(
    "primary"
  );

  const primaryStorageKey = `exercise_sets_${name
    .toLowerCase()
    .replace(/\s+/g, "_")}`;
  const secondaryStorageKey = `exercise_secondary_sets_${name
    .toLowerCase()
    .replace(/\s+/g, "_")}`;

  useEffect(() => {
    loadSets();
  }, []);

  const loadSets = async () => {
    try {
      const [savedPrimarySets, savedSecondarySets] = await Promise.all([
        AsyncStorage.getItem(primaryStorageKey),
        AsyncStorage.getItem(secondaryStorageKey),
      ]);

      if (savedPrimarySets) setSets(JSON.parse(savedPrimarySets));
      if (savedSecondarySets) {
        const parsedSets = JSON.parse(savedSecondarySets);
        setSecondarySets(parsedSets);
        if (parsedSets.length > 0) setIsSecondaryRow(true);
      }
    } catch (error) {
      console.error("Errore nel caricamento delle serie:", error);
    }
  };

  const saveSets = async (newSets: Set[], isSecondary: boolean = false) => {
    try {
      const key = isSecondary ? secondaryStorageKey : primaryStorageKey;
      await AsyncStorage.setItem(key, JSON.stringify(newSets));
    } catch (error) {
      console.error("Errore nel salvataggio delle serie:", error);
    }
  };

  const toggleSetCompletion = async (
    id: string,
    isSecondary: boolean = false
  ) => {
    const targetSets = isSecondary ? secondarySets : sets;
    const setStateFn = isSecondary ? setSecondarySets : setSets;

    const updatedSets = targetSets.map((set) =>
      set.id === id ? { ...set, completed: !set.completed } : set
    );

    setStateFn(updatedSets);
    await saveSets(updatedSets, isSecondary);
  };

  const addSet = async (weight: number, reps: number) => {
    const isSecondary = activeSetType === "secondary";
    const targetSets = isSecondary ? secondarySets : sets;
    const setStateFn = isSecondary ? setSecondarySets : setSets;

    const newSet: Set = {
      id: Date.now().toString(),
      reps,
      weight,
      completed: false,
    };

    const updatedSets = [...targetSets, newSet];
    setStateFn(updatedSets);
    await saveSets(updatedSets, isSecondary);
  };

  const handleSetModification = async (weight: number, reps: number) => {
    if (!selectedSet) return;

    const isSecondary = activeSetType === "secondary";
    const targetSets = isSecondary ? secondarySets : sets;
    const setStateFn = isSecondary ? setSecondarySets : setSets;

    const updatedSets = targetSets.map((set) =>
      set.id === selectedSet.id ? { ...set, weight, reps } : set
    );

    setStateFn(updatedSets);
    await saveSets(updatedSets, isSecondary);
  };

  const handleLongPress = (set: Set, isSecondary: boolean = false) => {
    setSelectedSet(set);
    setActiveSetType(isSecondary ? "secondary" : "primary");
    setIsModModalVisible(true);
  };

  const handleDeleteSet = async () => {
    if (!selectedSet) return;

    const isSecondary = activeSetType === "secondary";
    const targetSets = isSecondary ? secondarySets : sets;
    const setStateFn = isSecondary ? setSecondarySets : setSets;

    const updatedSets = targetSets.filter((set) => set.id !== selectedSet.id);
    setStateFn(updatedSets);
    await saveSets(updatedSets, isSecondary);
    setIsModModalVisible(false);
    setSelectedSet(null);
  };

  const toggleSecondaryRow = () => {
    setIsSecondaryRow(!isSecondaryRow);
  };

  const renderSetRow = (isSecondary: boolean = false) => {
    const currentSets = isSecondary ? secondarySets : sets;

    return (
      <View className="mt-4">
        <View className="flex-row justify-between items-center mb-2">
          {isSecondary ? (
            <Text className="text-zinc-400 text-base">
              Ripetizioni SuperSerie
            </Text>
          ) : (
            <Text className="text-zinc-400 text-base">Serie completate</Text>
          )}
          <View className="flex-row gap-0.5 items-center">
            <View>
              <TouchableOpacity
                onPress={() => {
                  setActiveSetType(isSecondary ? "secondary" : "primary");
                  isSecondary
                    ? setIsSecondaryModalVisible(true)
                    : setIsModalVisible(true);
                }}
                className="flex-row items-center bg-zinc-800 px-3 py-1.5 rounded-lg"
              >
                <Icon name="add-outline" color="white" size={20} />
                <Text className="text-white ml-1">Aggiungi serie</Text>
              </TouchableOpacity>
              {!isSecondary && (
                <View className="flex-row items-center justify-center mt-2">
                  <Text className="text-zinc-400 text-sm mx-1">SuperSerie</Text>
                  <TouchableOpacity onPress={toggleSecondaryRow}>
                    <Icon
                      name="flash-outline"
                      color={isSecondaryRow ? "#10b981" : "#71717a"}
                      size={22}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-2 mt-4">
            {currentSets.map((set) => (
              <TouchableOpacity
                key={set.id}
                onLongPress={() => handleLongPress(set, isSecondary)}
                onPress={() => toggleSetCompletion(set.id, isSecondary)}
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
    );
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

      <View className="mt-4 border-t border-zinc-800 pt-3">
        {renderSetRow()}
        {isSecondaryRow && renderSetRow(true)}
      </View>

      <SetModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={addSet}
      />

      <SetModal
        visible={isSecondaryModalVisible}
        onClose={() => setIsSecondaryModalVisible(false)}
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
