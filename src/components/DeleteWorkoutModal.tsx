import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useWorkout } from "../context/ExerciseContext";

interface DeleteWorkoutModalProps {
  visible: boolean;
  onClose: () => void;
  workout: {
    id: string;
    label: string;
  } | null;
}

const DeleteWorkoutModal: React.FC<DeleteWorkoutModalProps> = ({
  visible,
  onClose,
  workout,
}) => {
  const { deleteWorkout } = useWorkout();

  const handleDelete = () => {
    if (workout) {
      deleteWorkout(workout.id);
      onClose();
    }
  };

  if (!workout) return null;

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback>
            <View className="bg-zinc-900 w-[80%] rounded-2xl p-4">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-semibold text-white">
                  Cancella Allenamento
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <Icon name="close-outline" color="white" size={24} />
                </TouchableOpacity>
              </View>

              {/* Content */}
              <Text className="text-zinc-400 mb-6">
                Sei sicuro di voler eliminare "{workout.label}"? Questa azione è
                irreversibile.
              </Text>

              {/* Buttons */}
              <View className="flex-row justify-end gap-3">
                <TouchableOpacity
                  className="px-4 py-2 rounded-lg bg-zinc-800"
                  onPress={onClose}
                >
                  <Text className="text-white">Annulla</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-4 py-2 rounded-lg bg-red-500"
                  onPress={handleDelete}
                >
                  <Text className="text-white">Elimina</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DeleteWorkoutModal;
