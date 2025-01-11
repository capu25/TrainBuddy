import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

// --- IMPORT ICONS ---
import Icon from "react-native-vector-icons/Ionicons";

// --- IMPORT COMPONENTS ---
import SetModal from "../modals/SetModal";

// --- TYPE DEF ---
interface ExerciseDetails {
  name: string;
  description: string;
  rec: number;
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
  const [sets, setSets] = useState<Set[]>([
    { id: "1", reps: 12, weight: 20, completed: false },
    { id: "2", reps: 10, weight: 22.5, completed: false },
    { id: "3", reps: 8, weight: 25, completed: false },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleSetCompletion = (id: string) => {
    setSets(
      sets.map((set) =>
        set.id === id ? { ...set, completed: !set.completed } : set
      )
    );
  };

  const addSet = (weight: number, reps: number) => {
    const newSet: Set = {
      id: (sets.length + 1).toString(),
      reps,
      weight,
      completed: false,
    };
    setSets([...sets, newSet]);
  };

  return (
    <View className="rounded-lg border border-zinc-800 p-3 mt-8">
      {/* --- WIDGET HEADER ---*/}
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

        {/* --- WIDGET REC BANNER ---*/}
        <View className="border border-zinc-400 rounded-lg px-3 py-1.5 flex-row items-center ml-2">
          <Icon name="timer-outline" color="white" size={22} />
          <Text className="text-white ml-1">{rec}</Text>
        </View>
      </View>

      {/* --- SETS SECTION --- */}
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
    </View>
  );
};

export default ExerciseWidget;
