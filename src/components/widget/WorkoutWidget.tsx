import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

// --- IMPORT ICONS ---
import Icon from "react-native-vector-icons/Ionicons";

interface WorkoutWidgetProps extends TouchableOpacityProps {
  number: number | string;
  label: string;
  subtitle?: string;
  onSettingsPress?: () => void;
}

const WorkoutWidget: React.FC<WorkoutWidgetProps> = ({
  number,
  label,
  subtitle,
  onSettingsPress,
  style,
  ...props
}) => (
  <TouchableOpacity
    className=" bg-zinc-900 p-4 rounded-xl w-[48%] my-2"
    style={style}
    {...props}
  >
    <View className="flex-row justify-between items-start">
      <View className="flex-col">
        <View className="flex-row items-baseline gap-1">
          <View className="bg-zinc-700 rounded-full justify-center items-center px-2 py-2">
            <Icon name="analytics-outline" color={"#fff"} size={35} />
          </View>
        </View>
        <Text className="mt-2 text-lg text-gray-400">{label}</Text>
        {subtitle && <Text className="text-sm text-gray-500">{subtitle}</Text>}
      </View>
      <TouchableOpacity onPress={onSettingsPress}>
        <Icon name="options-outline" color={"#666666"} size={28} />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export default WorkoutWidget;
