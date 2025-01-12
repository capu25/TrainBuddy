import { useState, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// --- IMPORT ICONS ---
import Icon from "react-native-vector-icons/Ionicons";

// --- TYPE DEF ---
interface ModSetModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (weight: number, reps: number) => void;
  currentWeight: number;
  currentReps: number;
}

const ModSetModal: React.FC<ModSetModalProps> = ({
  visible,
  onClose,
  onSave,
  currentWeight,
  currentReps,
}) => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  // Populate fields with current values when modal opens
  useEffect(() => {
    if (visible) {
      setWeight(currentWeight.toString());
      setReps(currentReps.toString());
    }
  }, [visible, currentWeight, currentReps]);

  const handleSave = () => {
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps);
    if (!isNaN(weightNum) && !isNaN(repsNum)) {
      onSave(weightNum, repsNum);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-zinc-800 p-4 rounded-t-3xl">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-2xl font-bold">
                Modifica Serie
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close-outline" color="white" size={24} />
              </TouchableOpacity>
            </View>

            <View className="space-y-4 mb-6">
              <View className="mt-4">
                <Text className="text-zinc-400 mb-2">Peso (kg)</Text>
                <TextInput
                  className="bg-zinc-900 text-white p-4 rounded-xl"
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="Inserisci il peso"
                  placeholderTextColor="#666"
                />
              </View>

              <View className="mt-4">
                <Text className="text-zinc-400 mb-2">Ripetizioni</Text>
                <TextInput
                  className="bg-zinc-900 text-white p-4 rounded-xl"
                  keyboardType="numeric"
                  value={reps}
                  onChangeText={setReps}
                  placeholder="Inserisci le ripetizioni"
                  placeholderTextColor="#666"
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSave}
              className="bg-zinc-700 p-4 rounded-xl mb-6"
            >
              <Text className="text-white text-center font-semibold text-lg">
                Salva Modifiche
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModSetModal;
