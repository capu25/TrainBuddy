import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// --- IMPORT DUMMYES ---
import { dummyStats } from "../../mock/dummyStats";
import AsyncStorage from "@react-native-async-storage/async-storage";

// --- FUNCTION STATS CARD ---
const getData = async (key: any) => {
  try {
    const current = await AsyncStorage.getItem("@fitness_tracker_weight");
    const currentWeight: number = current ? parseFloat(current) : 0;
    if (currentWeight) {
      const value = currentWeight - 10;
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};

const StatsCard = ({
  iconName,
  title,
  value,
  color,
}: {
  iconName: string;
  title: string;
  value: string;
  color: string;
}) => (
  <View className="bg-zinc-800/80 p-4 rounded-2xl flex-1">
    <View className="bg-zinc-700/50 w-10 h-10 rounded-xl items-center justify-center mb-3">
      <Icon name={iconName} size={20} color={color} />
    </View>
    <Text className="text-zinc-400 text-sm mb-1">{title}</Text>
    <Text className="text-white text-xl font-semibold">{value}</Text>
  </View>
);

const StatsWidget = () => {
  const rows = dummyStats.reduce((acc: any[][], curr, i) => {
    if (i % 2 === 0) acc.push([curr]);
    else acc[acc.length - 1].push(curr);
    return acc;
  }, []);

  return (
    <View className="p-2">
      <Text className="text-zinc-400 text-xl font-medium mb-4">
        Global Stats
      </Text>
      <View className="gap-3">
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row gap-3">
            {row.map((stat, colIndex) => (
              <StatsCard key={`${rowIndex}-${colIndex}`} {...stat} />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default StatsWidget;
