import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation";

// --- IMPORT ICONS ---
import Icon from "react-native-vector-icons/Ionicons";

// --- IMPORT COMPONENTS ---
import ExerciseWidget from "../../../components/ExerciseWidget";

type Props = NativeStackScreenProps<RootStackParamList, "Exploded">;

const ExplodedExercise: React.FC<Props> = ({ route }) => {
  const { workout } = route.params;

  return (
    <View className="flex-1 bg-black p-4 justify-center">
      <View className="w-[100%] flex-row justify-between items-center top-[2%]">
        <View>
          <Text className="text-3xl font-semibold text-zinc-400">
            {workout.label}
          </Text>
          <Text className="text-2xl text-zinc-400">{workout.subtitle}</Text>
        </View>
        <TouchableOpacity
          onPress={() => null}
          className="border-2 rounded-full justify-center items-center p-2 bg-zinc-800"
        >
          <Icon name="add-outline" color="white" size={28} />
        </TouchableOpacity>
      </View>
      <Text className="text-zinc-400 text-xl mt-10">
        Esercizi: {workout.number}
      </Text>
      {/* --- EXERCISE WIDGET ---*/}
      <ExerciseWidget />
    </View>
  );
};

export default ExplodedExercise;
