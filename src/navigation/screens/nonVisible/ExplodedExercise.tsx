import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation";

// --- IMPORT ICONS ---
import Icon from "react-native-vector-icons/Ionicons";

// --- IMPORT COMPONENTS ---
import ExerciseWidget from "../../../components/widget/ExerciseWidget";
import AddExerciseModal from "../../../components/modals/AddExerciseModal";

// --- TYPE DEF ---
type Exercise = {
  name: string;
  description: string;
  rec: number;
};

type Props = NativeStackScreenProps<RootStackParamList, "Exploded">;

const ExplodedExercise: React.FC<Props> = ({ route }) => {
  const { workout } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      name: "Spinte Manubri",
      description: "panca piana, piramidale. All'ultima 50% e max rep",
      rec: 10,
    },
  ]);
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: "",
    description: "",
    rec: 0,
  });

  const handleAddExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise]);
    setNewExercise({ name: "", description: "", rec: 0 });
    setModalVisible(false);
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

      <ScrollView>
        {exercises.map((exercise, index) => (
          <ExerciseWidget
            key={index}
            name={exercise.name}
            description={exercise.description}
            rec={exercise.rec}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ExplodedExercise;
