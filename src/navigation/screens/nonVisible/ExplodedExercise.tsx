import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "../../../types/navigation";
import ExerciseWidget from "../../../components/widget/ExerciseWidget";
import AddExerciseModal from "../../../components/modals/add/AddExerciseModal";

type Exercise = {
  name: string;
  description: string;
  rec: number;
};

type Props = NativeStackScreenProps<RootStackParamList, "Exploded">;

const ExplodedExercise: React.FC<Props> = ({ route }) => {
  const { workout } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: "",
    description: "",
    rec: 0,
  });

  // Generate a unique storage key for each workout
  const STORAGE_KEY = `@exercises_${workout.id}`;

  // Load exercises when component mounts
  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const storedExercises = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedExercises) {
        setExercises(JSON.parse(storedExercises));
      }
    } catch (error) {
      console.error("Error loading exercises:", error);
    }
  };

  const saveExercises = async (updatedExercises: Exercise[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedExercises));
    } catch (error) {
      console.error("Error saving exercises:", error);
    }
  };

  const handleAddExercise = async (exercise: Exercise) => {
    const updatedExercises = [...exercises, exercise];
    setExercises(updatedExercises);
    await saveExercises(updatedExercises);
    setNewExercise({ name: "", description: "", rec: 0 });
    setModalVisible(false);
  };

  const handleDeleteExercise = async (index: number) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
    await saveExercises(updatedExercises);
  };

  return (
    <View className="flex-1 bg-black p-4 justify-center">
      <AddExerciseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddExercise}
        exercise={newExercise}
        setExercise={setNewExercise}
      />

      <View className="w-[100%] flex-row justify-between items-center top-[5%]">
        <View>
          <Text className="text-3xl font-semibold text-zinc-400">
            {workout.label}
          </Text>
          <Text className="text-2xl text-zinc-400">{workout.subtitle}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="border-2 rounded-full justify-center items-center p-2 bg-zinc-800"
        >
          <Icon name="add-outline" color="white" size={28} />
        </TouchableOpacity>
      </View>

      <Text className="text-zinc-400 text-xl mt-14">
        Esercizi: {exercises.length}
      </Text>

      {exercises && exercises.length > 0 ? (
        <ScrollView className="mb-10">
          {exercises.map((exercise, index) => (
            <ExerciseWidget
              key={index}
              name={exercise.name}
              description={exercise.description}
              rec={exercise.rec}
              onDelete={() => handleDeleteExercise(index)}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="w-[100%] h-[80%] top-[5%] items-center justify-center">
          <Text className="text-3xl font-extralight text-slate-200 bottom-[20%] text-center px-4">
            Ottimo! 🎯 Ora aggiungi i tuoi esercizi e inizia a tracciare i tuoi
            progressi
          </Text>
        </View>
      )}
    </View>
  );
};

export default ExplodedExercise;
