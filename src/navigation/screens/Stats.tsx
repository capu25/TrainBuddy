import { View, Text } from "react-native";
import React from "react";

// --- IMPORT COMPONENTS ---
import Skeleton from "../../components/loader/Skeleton";
import StatsWidget from "../../components/widget/StatsWidget";

const Stats = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <View className="w-[90%] flex-row justify-between items-center top-[4%] mb-8 mt-[12%]">
        <Text className="text-5xl font-semibold text-zinc-300">
          Statistiche
        </Text>
      </View>
      {/* SKELETON FOR COMING SOON FEATURES */}
      <View className="w-[90%] py-10">
        <Skeleton />
      </View>
      <View className="bottom-[15%]">
        <Text className="text-zinc-400 font-light text-lg">
          !! Questa pagina è un concept in fase di sviluppo !!
        </Text>
      </View>
      {/* CARDS FOR ABSOLUTE STATS */}
      <View className="w-full bottom-[5%]">
        <StatsWidget />
      </View>
    </View>
  );
};

export default Stats;
