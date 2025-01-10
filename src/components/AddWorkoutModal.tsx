import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useWorkout } from "../context/ExerciseContext";

interface AddWorkoutModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddWorkoutModal: React.FC<AddWorkoutModalProps> = ({
  visible,
  onClose,
}) => {
  const { addWorkout } = useWorkout();
  const [workoutData, setWorkoutData] = useState({
    number: "",
    label: "",
    subtitle: "",
  });

  const handleSubmit = () => {
    if (workoutData.label.trim() && workoutData.number.trim()) {
      addWorkout({
        id: Date.now().toString(), // Simple ID generation
        ...workoutData,
      });
      onClose();
      setWorkoutData({ number: "", label: "", subtitle: "" }); // Reset form
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-end">
          <View className="bg-zinc-800 rounded-t-3xl p-6 h-[70%]">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-8">
              <Text className="text-2xl font-bold text-white">
                Aggiungi allenamento!
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close-outline" color="white" size={28} />
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View className="space-y-4">
              <View>
                <Text className="text-zinc-400 mb-2">Numero Esercizi</Text>
                <TextInput
                  className="bg-zinc-900 text-white p-4 rounded-xl"
                  placeholder="Inserisci numero esercizi"
                  placeholderTextColor="#666"
                  value={workoutData.number}
                  onChangeText={(text) =>
                    setWorkoutData((prev) => ({ ...prev, number: text }))
                  }
                />
              </View>

              <View className="mt-4">
                <Text className="text-zinc-400 mb-2">Distretti muscolari</Text>
                <TextInput
                  className="bg-zinc-900 text-white p-4 rounded-xl"
                  placeholder="(es. Petto + Tricipiti)"
                  placeholderTextColor="#666"
                  value={workoutData.label}
                  onChangeText={(text) =>
                    setWorkoutData((prev) => ({ ...prev, label: text }))
                  }
                />
              </View>

              <View className="mt-4">
                <Text className="text-zinc-400 mb-2">Giorno</Text>
                <TextInput
                  className="bg-zinc-900 text-white p-4 rounded-xl"
                  placeholder="Enter Giorno (es. Lunedì)"
                  placeholderTextColor="#666"
                  value={workoutData.subtitle}
                  onChangeText={(text) =>
                    setWorkoutData((prev) => ({ ...prev, subtitle: text }))
                  }
                />
              </View>

              <TouchableOpacity
                className="bg-zinc-700 p-4 rounded-xl mt-6"
                onPress={handleSubmit}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  Aggiungi alla lista
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddWorkoutModal;
