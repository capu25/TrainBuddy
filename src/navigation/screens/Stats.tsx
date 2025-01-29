import { View, Text } from "react-native";
import React from "react";

// --- IMPORT COMPONENTS ---
import Skeleton from "../../components/loader/Skeleton";
import StatsWidget from "../../components/widget/StatsWidget";

const Stats = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <View className="w-[90%] flex-row justify-between items-center top-[4%] mb-8 mt-[12%]">
        <Text className="text-5xl font-semibold text-zinc-300 top-[60%]">
          Statistiche
        </Text>
      </View>
      {/* SKELETON FOR COMING SOON FEATURES */}
      <View className="w-[90%] top-[7%]">
        <Skeleton />
        <Text className="text-white text-center font-light text-lg">
          | coming soon |
        </Text>
      </View>
      {/* CARDS FOR ABSOLUTE STATS */}
      <View className="w-[95%] bottom-[12%]">
        <StatsWidget />
      </View>
    </View>
  );
};

export default Stats;
