import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// --- IMPORT DUMMYES ---
import { dummyStats } from "../../mock/dummyStats";

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
  return (
    <View className="p-2">
      <Text className="text-zinc-400 text-xl font-medium mb-4">
        Global Stats
      </Text>
      <View className="flex-row gap-3">
        {dummyStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </View>
    </View>
  );
};

export default StatsWidget;
