import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Chiavi specifiche per AsyncStorage
const WEIGHT_STORAGE_KEY = "@fitness_tracker_weight";
const PR_STORAGE_KEY = "@fitness_tracker_personal_records";

const Achievements = () => {
  const [personalRecords, setPersonalRecords] = useState<
    Array<{ exercise: string; weight: string }>
  >([]);
  const [showPRInput, setShowPRInput] = useState<boolean>(false);
  const [exercise, setExercise] = useState<string>("");
  const [prWeight, setPRWeight] = useState<string>("");
  const [currentWeight, setCurrentWeight] = useState<string>("70");
  const [isEditingWeight, setIsEditingWeight] = useState<boolean>(false);
  const [tempWeight, setTempWeight] = useState<string>("");

  // Carica i dati salvati all'avvio
  useEffect(() => {
    loadSavedData();
  }, []);

  // Carica i dati da AsyncStorage
  const loadSavedData = async () => {
    try {
      const savedWeight = await AsyncStorage.getItem(WEIGHT_STORAGE_KEY);
      const savedPRs = await AsyncStorage.getItem(PR_STORAGE_KEY);

      if (savedWeight) {
        setCurrentWeight(savedWeight);
      }
      if (savedPRs) {
        setPersonalRecords(JSON.parse(savedPRs));
      }
    } catch (error) {
      console.error("Errore nel caricamento dei dati:", error);
    }
  };

  // Salva il peso corrente
  const saveWeight = async (weight: string) => {
    try {
      await AsyncStorage.setItem(WEIGHT_STORAGE_KEY, weight);
    } catch (error) {
      console.error("Errore nel salvare il peso:", error);
    }
  };

  // Salva i PR
  const savePRs = async (prs: Array<{ exercise: string; weight: string }>) => {
    try {
      await AsyncStorage.setItem(PR_STORAGE_KEY, JSON.stringify(prs));
    } catch (error) {
      console.error("Errore nel salvare i PR:", error);
    }
  };

  const addPR = () => {
    if (exercise && prWeight) {
      const newPR = {
        exercise: exercise,
        weight: prWeight,
      };
      const updatedPRs = [...personalRecords, newPR];
      setPersonalRecords(updatedPRs);
      savePRs(updatedPRs);
      setExercise("");
      setPRWeight("");
      setShowPRInput(false);
    }
  };

  const deletePR = (index: number) => {
    const updatedPRs = personalRecords.filter((_, i) => i !== index);
    setPersonalRecords(updatedPRs);
    savePRs(updatedPRs);
  };

  const adjustWeight = (increment: boolean) => {
    const weight = parseFloat(currentWeight) || 0;
    const newWeight = increment ? weight + 0.5 : weight - 0.5;
    const weightString = newWeight.toString();
    setCurrentWeight(weightString);
    saveWeight(weightString);
  };

  const handleSetWeight = () => {
    setIsEditingWeight(true);
    setTempWeight(currentWeight);
  };

  const handleWeightSubmit = () => {
    if (tempWeight) {
      const newWeight = parseFloat(tempWeight).toFixed(1);
      setCurrentWeight(newWeight);
      saveWeight(newWeight);
    }
    setIsEditingWeight(false);
  };

  return (
    <View className="flex-1 justify-start items-center bg-black">
      <View className="w-[90%] flex-row justify-between items-center top-[2%] mb-8 mt-[12%]">
        <Text className="text-5xl font-semibold text-zinc-300">Tracker</Text>
      </View>

      {/* Weight Tracker Section */}
      <View className="w-[90%] bg-zinc-900 rounded-xl p-4 mb-4">
        <View className="items-center">
          <Text className="text-xl font-bold text-zinc-300 mb-4">
            Peso Attuale
          </Text>
          <View className="flex-row items-center justify-center w-full">
            <TouchableOpacity
              onPress={() => adjustWeight(false)}
              className="bg-zinc-800 w-12 h-12 rounded-full items-center justify-center"
            >
              <Icon name="remove" color="white" size={24} />
            </TouchableOpacity>
            <View className="mx-4 items-center w-[40%]">
              {isEditingWeight ? (
                <View className="flex-row items-center">
                  <TextInput
                    value={tempWeight}
                    onChangeText={setTempWeight}
                    keyboardType="numeric"
                    autoFocus={true}
                    className="text-4xl font-bold text-zinc-300 text-center w-24"
                    onSubmitEditing={handleWeightSubmit}
                    onBlur={handleWeightSubmit}
                  />
                  <Text className="text-sm text-zinc-500 ml-1">kg</Text>
                </View>
              ) : (
                <TouchableOpacity
                  onLongPress={handleSetWeight}
                  className="items-center"
                >
                  <Text className="text-4xl font-bold text-zinc-300">
                    {currentWeight}
                  </Text>
                  <Text className="text-sm text-zinc-500">kg</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              onPress={() => adjustWeight(true)}
              className="bg-zinc-800 w-12 h-12 rounded-full items-center justify-center"
            >
              <Icon name="add" color="white" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* PR Tracker Section with Delete and ScrollView */}

      <View className="w-[90%] h-[65%] bg-black rounded-xl p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-2xl font-bold text-zinc-300">PR Tracker</Text>
          <TouchableOpacity
            onPress={() => setShowPRInput((prevState) => !prevState)}
          >
            {showPRInput ? (
              <Icon name="close-circle-outline" color="white" size={32} />
            ) : (
              <Icon name="add-circle-outline" color="white" size={32} />
            )}
          </TouchableOpacity>
        </View>

        {showPRInput && (
          <View className="mb-5 rounded-lg bg-zinc-800 p-3">
            <TextInput
              value={exercise}
              onChangeText={setExercise}
              placeholder="Nome Esercizio"
              placeholderTextColor="#666"
              className="bg-zinc-900 text-white py-2 px-1 text-base rounded-lg mb-4"
            />
            <View className="flex-row items-center">
              <TextInput
                value={prWeight}
                onChangeText={setPRWeight}
                placeholder="Peso"
                placeholderTextColor="#666"
                keyboardType="numeric"
                className="flex-1 bg-zinc-900 text-white py-2 px-1 text-base rounded-lg mr-2"
              />
              <TouchableOpacity onPress={addPR}>
                <Icon name="checkmark-circle" color="white" size={42} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <ScrollView
          className="max-h-[100%]"
          showsVerticalScrollIndicator={false}
        >
          {personalRecords.map((record, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center bg-zinc-800 p-3 rounded-lg mb-3"
            >
              <View className="flex-1">
                <Text className="text-zinc-300 text-lg">{record.exercise}</Text>
                <Text className="text-emerald-500 text-base font-bold">
                  {record.weight} kg
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => deletePR(index)}
                className="ml-2"
              >
                <Icon name="trash-outline" color="#ef4444" size={20} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Achievements;
