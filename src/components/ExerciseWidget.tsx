import { Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";

// --- IMPORT ICONS ---
import Icon from "react-native-vector-icons/Ionicons";

export class ExerciseWidget extends Component {
  render() {
    return (
      <View className="border-2 border-zinc-800 mt-8 p-4 rounded-lg">
        <Text className="text-zinc-200 text-xl font-semibold">
          Spinte panca piana (manubri)
        </Text>
        <View className="bg-zinc-800 p-4 rounded mt-2 flex-row border justify-around items-center">
          <View>
            <Text className="text-white text-lg">Reps | 12-10-8-8</Text>
            <Text className="text-white text-lg">Rec | 130''</Text>
            <Text className="text-white text-lg">KGs | 18-20-22</Text>
          </View>
          <TouchableOpacity className="rounded-full justify-center items-center p-3 bg-zinc-900">
            <Icon name="options-outline" color="white" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ExerciseWidget;
