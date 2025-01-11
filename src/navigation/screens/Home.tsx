import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

// --- IMPORT ICONS ---
import Icon from "react-native-vector-icons/Ionicons";

// --- IMPORT COMPONENTS ---
import WorkoutWidget from "../../components/widget/WorkoutWidget";
import AddWorkoutModal from "../../components/modals/AddWorkoutModal";
import DeleteWorkoutModal from "../../components/modals/DeleteWorkoutModal";

// --- IMPORT CONTEXT HOOK ---
import { useWorkout } from "../../context/ExerciseContext";

const Home = () => {
  const { workouts, handleWorkoutPress } = useWorkout();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState<{
    visible: boolean;
    workout: { id: string; label: string } | null;
  }>({
    visible: false,
    workout: null,
  });

  const handleSettingsPress = (workout: any) => {
    setDeleteModalData({
      visible: true,
      workout: { id: workout.id, label: workout.label },
    });
  };

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <View className="w-[90%] flex-row justify-between items-center top-[2%]">
        <Text className="text-5xl font-semibold text-zinc-300">Workouts</Text>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          className="border-2 rounded-full justify-center items-center p-2 bg-zinc-800"
        >
          <Icon name="add-outline" color="white" size={28} />
        </TouchableOpacity>
      </View>
      {/* --- MAIN WIDGET CONTAINER --- */}
      <View className="w-[100%] h-[80%] top-[5%] items-center">
        <ScrollView className="w-[100%]">
          <View className="flex-row flex-wrap justify-between  px-4 items-center">
            {workouts.map((workout) => (
              <WorkoutWidget
                key={workout.id}
                number={workout.number}
                label={workout.label}
                subtitle={workout.subtitle}
                onPress={() => handleWorkoutPress(workout)}
                onSettingsPress={() => handleSettingsPress(workout)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      {/* --- ADD EXERCISE MODAL --- */}
      <AddWorkoutModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
      {/* --- DELETE ROUTE MODAL --- */}
      <DeleteWorkoutModal
        visible={deleteModalData.visible}
        workout={deleteModalData.workout}
        onClose={() => setDeleteModalData({ visible: false, workout: null })}
      />
    </View>
  );
};

export default Home;
