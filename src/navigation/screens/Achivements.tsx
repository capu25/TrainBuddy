import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

// --- IMPORT ICONS ---
import Icon from "react-native-vector-icons/Ionicons";

const Achivements = () => {
  const isComplete: Boolean = false;

  return isComplete ? (
    <View className="flex-1 justify-center items-center bg-black">
      <View className="w-[90%] flex-row justify-between items-center top-[2%]">
        <Text className="text-5xl font-semibold text-zinc-300">Add new</Text>
        <TouchableOpacity
          onPress={() => null}
          className="border-2 rounded-full justify-center items-center p-2 bg-zinc-800"
        >
          <Icon name="add-outline" color="white" size={28} />
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-5xl text-zinc-600">Coming soon!</Text>
    </View>
  );
};

export default Achivements;
