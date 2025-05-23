import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

// --- IMPORT ICONS ---
import Icon from "react-native-vector-icons/Ionicons";

// --- IMPORT COMPONENTS ---
import WorkoutWidget from "../../components/widget/WorkoutWidget";
import AddWorkoutModal from "../../components/modals/add/AddWorkoutModal";
import DeleteWorkoutModal from "../../components/modals/delete/DeleteWorkoutModal";

// --- IMPORT CONTEXT HOOK ---
import { useWorkout } from "../../context/ExerciseContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const handleModWorkout = (workouts: any) => {
    console.log("edit");
  };

  // --- DEV USE ONLY ---
  //const handleRESET = async () => {
  //  await AsyncStorage.removeItem("@first_access");
  //  console.log("RESET DONE");
  //};

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
      {workouts && workouts.length > 0 ? (
        <View className="w-[100%] h-[80%] top-[5%] items-center">
          <ScrollView className="w-[100%]">
            <View className="flex-row flex-wrap justify-between  px-4 items-center">
              {workouts.map((workout) => (
                <WorkoutWidget
                  key={workout.id}
                  label={workout.label}
                  subtitle={workout.subtitle}
                  onPress={() => handleWorkoutPress(workout)}
                  onSettingsPress={() => handleSettingsPress(workout)}
                  onLongPress={() => handleModWorkout(workout)}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View className="w-[100%] h-[80%] top-[5%] items-center  justify-center ">
          <Text className="text-3xl font-extralight text-slate-200 bottom-[5%]">
            Pronto ad iniziare il tuo percorso fitness? Tocca il + per creare il
            tuo primo allenamento! 💪
          </Text>
        </View>
      )}

      {/*
        DEV ONLY
        <TouchableOpacity onPress={() => handleRESET()}>
          <Text className="text-white">TEST ME</Text>
        </TouchableOpacity>
      /*}

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
