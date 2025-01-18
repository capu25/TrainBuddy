import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
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
  const [editingExercise, setEditingExercise] = useState<{
    index: number;
    exercise: Exercise;
  } | null>(null);
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: "",
    description: "",
    rec: 0,
  });

  // Ref per tenere traccia dello Swipeable attualmente aperto
  const swipeableRefs = useRef<(Swipeable | null)[]>([]);

  const STORAGE_KEY = `@exercises_${workout.id}`;

  useEffect(() => {
    loadExercises();
  }, []);

  // Aggiorna refs quando cambia il numero di esercizi
  useEffect(() => {
    swipeableRefs.current = exercises.map(() => null);
  }, [exercises.length]);

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

  const closeAllSwipeables = (exceptIndex?: number) => {
    swipeableRefs.current.forEach((ref, index) => {
      if (ref && index !== exceptIndex) {
        ref.close();
      }
    });
  };

  const handleAddExercise = async (exercise: Exercise) => {
    if (editingExercise !== null) {
      const updatedExercises = [...exercises];
      updatedExercises[editingExercise.index] = exercise;
      setExercises(updatedExercises);
      await saveExercises(updatedExercises);
      setEditingExercise(null);
    } else {
      const updatedExercises = [...exercises, exercise];
      setExercises(updatedExercises);
      await saveExercises(updatedExercises);
    }
    setNewExercise({ name: "", description: "", rec: 0 });
    setModalVisible(false);
  };

  const handleDeleteExercise = async (index: number) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
    await saveExercises(updatedExercises);
    swipeableRefs.current[index]?.close();
  };

  const handleEditExercise = (index: number) => {
    setEditingExercise({ index, exercise: exercises[index] });
    setNewExercise(exercises[index]);
    setModalVisible(true);
    swipeableRefs.current[index]?.close();
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    index: number
  ) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        className="flex-row h-[85%] self-center mr-[2%] top-[6%]"
        style={{ transform: [{ translateX: trans }] }}
      >
        <TouchableOpacity
          onPress={() => handleEditExercise(index)}
          className="bg-zinc-800 justify-center items-center w-[45] rounded-l-lg"
        >
          <Icon name="pencil" size={35} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDeleteExercise(index)}
          className="bg-zinc-700 justify-center items-center w-[45] rounded-r-lg"
        >
          <Icon name="trash" size={35} color="#ef4444" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-black p-4 justify-center">
        <AddExerciseModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(false);
            setEditingExercise(null);
            setNewExercise({ name: "", description: "", rec: 0 });
          }}
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
              <Swipeable
                key={index}
                ref={(ref) => (swipeableRefs.current[index] = ref)}
                renderRightActions={(progress, dragX) =>
                  renderRightActions(progress, dragX, index)
                }
                friction={2}
                rightThreshold={40}
                onSwipeableOpen={() => closeAllSwipeables(index)}
              >
                <ExerciseWidget
                  name={exercise.name}
                  description={exercise.description}
                  rec={exercise.rec}
                  onDelete={() => handleDeleteExercise(index)}
                />
              </Swipeable>
            ))}
          </ScrollView>
        ) : (
          <View className="w-[100%] h-[80%] top-[5%] items-center justify-center">
            <Text className="text-3xl font-extralight text-slate-200 bottom-[20%] text-center px-4">
              Ottimo! 🎯 Ora aggiungi i tuoi esercizi e inizia a tracciare i
              tuoi progressi
            </Text>
          </View>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default ExplodedExercise;
