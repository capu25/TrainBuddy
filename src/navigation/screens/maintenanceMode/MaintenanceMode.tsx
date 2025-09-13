import { View, Text } from "react-native";
import React from "react";

// --- IMPORT ICONS ---
import Icon from "react-native-vector-icons/Ionicons";

const Maintenance = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      {/* GEARS SECTION */}
      <View className="w-full items-center mb-8">
        <View className="flex-row items-center justify-center">
          <Icon name="settings-outline" size={50} color="#71717a" />
          <Icon
            name="cog-outline"
            size={60}
            color="#a1a1aa"
            style={{ marginHorizontal: 20 }}
          />
          <Icon name="settings-outline" size={50} color="#71717a" />
        </View>
      </View>

      {/* MAIN CONTENT */}
      <View className="w-full top-[5%] items-center">
        {/* MAINTENANCE MESSAGE */}
        <Text className="text-white text-center font-light text-xl mb-4">
          Manutenzione in corso
        </Text>

        {/* ADDITIONAL INFO */}
        <View className="w-full px-4">
          <Text className="text-zinc-500 text-center font-light text-base mb-2">
            Ci scusiamo per il disagio.
          </Text>
          <Text className="text-zinc-500 text-center font-light text-sm mb-2">
            Il servizio tornerà disponibile nel più breve tempo possibile.
          </Text>
        </View>

        {/* ADDITIONAL INFO */}
        <View className="w-full px-4 mt-[60%]">
          <Text className="text-zinc-500 text-center font-light text-lg">
            TrainBuddy
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Maintenance;
