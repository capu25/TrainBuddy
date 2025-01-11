import React from "react";
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

type Exercise = {
  name: string;
  description: string;
  rec: number;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (exercise: Exercise) => void;
  exercise: Exercise;
  setExercise: (exercise: Exercise) => void;
};

const AddExerciseModal: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  exercise,
  setExercise,
}) => {
  const handleSubmit = () => {
    if (exercise.name.trim() && exercise.description.trim() && exercise.rec) {
      onSubmit(exercise);
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
                Aggiungi esercizio!
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close-outline" color="white" size={28} />
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View className="space-y-4">
              <View>
                <Text className="text-zinc-400 mb-2">Nome Esercizio</Text>
                <TextInput
                  className="bg-zinc-900 text-white p-4 rounded-xl"
                  placeholder="Inserisci nome esercizio"
                  placeholderTextColor="#666"
                  value={exercise.name}
                  onChangeText={(text) =>
                    setExercise({ ...exercise, name: text })
                  }
                />
              </View>

              <View className="mt-4">
                <Text className="text-zinc-400 mb-2">Descrizione</Text>
                <TextInput
                  className="bg-zinc-900 text-white p-4 rounded-xl"
                  placeholder="Inserisci descrizione"
                  placeholderTextColor="#666"
                  value={exercise.description}
                  multiline
                  onChangeText={(text) =>
                    setExercise({ ...exercise, description: text })
                  }
                />
              </View>

              <View className="mt-4">
                <Text className="text-zinc-400 mb-2">Recupero</Text>
                <TextInput
                  className="bg-zinc-900 text-white p-4 rounded-xl"
                  placeholder="Inserisci tempo di recupero"
                  placeholderTextColor="#666"
                  value={exercise.rec.toString()}
                  onChangeText={(text) =>
                    setExercise({ ...exercise, rec: parseFloat(text) || 0 })
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

export default AddExerciseModal;
