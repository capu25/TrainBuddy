import React, { useEffect } from "react";
import { View, Animated, Dimensions } from "react-native";

const Skeleton = () => {
  const shimmerAnimation = new Animated.Value(0);

  useEffect(() => {
    const startShimmerAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startShimmerAnimation();
  }, []);

  const { width } = Dimensions.get("window");
  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View className="bg-zinc-900 p-5 rounded-3xl overflow-hidden relative h-[60%] justify-end">
      {/* Y-axis labels */}
      <View className="absolute left-2 top-8 bottom-8 justify-between">
        <View className="h-2 w-8 bg-zinc-800 rounded-full" />
        <View className="h-2 w-6 bg-zinc-800 rounded-full" />
        <View className="h-2 w-8 bg-zinc-800 rounded-full" />
        <View className="h-2 w-6 bg-zinc-800 rounded-full" />
      </View>

      {/* Graph content */}
      <View className="ml-14 flex-1 justify-end">
        {/* Line graph overlay */}
        <View className="absolute top-0 left-0 right-0 bottom-8 flex-row justify-between items-end">
          <View className="absolute top-[20%] left-0 right-0 h-[1.5px] bg-zinc-800/50" />
          <View className="absolute top-[40%] left-0 right-0 h-[1.5px] bg-zinc-800/50" />
          <View className="absolute top-[60%] left-0 right-0 h-[1.5px] bg-zinc-800/50" />
          <View className="absolute top-[80%] left-0 right-0 h-[1.5px] bg-zinc-800/50" />

          {/* Trend line */}
          <View
            className="absolute flex-row justify-between items-center w-full"
            style={{ height: "100%" }}
          >
            <View
              className="absolute h-2 w-2 rounded-full bg-zinc-700"
              style={{ left: "0%", top: "40%" }}
            />
            <View
              className="absolute h-2 w-2 rounded-full bg-zinc-700"
              style={{ left: "20%", top: "20%" }}
            />
            <View
              className="absolute h-2 w-2 rounded-full bg-zinc-700"
              style={{ left: "40%", top: "60%" }}
            />
            <View
              className="absolute h-2 w-2 rounded-full bg-zinc-700"
              style={{ left: "60%", top: "30%" }}
            />
            <View
              className="absolute h-2 w-2 rounded-full bg-zinc-700"
              style={{ left: "80%", top: "50%" }}
            />
            <View
              className="absolute h-2 w-2 rounded-full bg-zinc-700"
              style={{ left: "100%", top: "40%" }}
            />
          </View>
        </View>

        <View className="flex-row justify-between items-end mb-8">
          <View className="w-4 h-[60%] bg-zinc-800 rounded-t-lg" />
          <View className="w-4 h-[80%] bg-zinc-800 rounded-t-lg" />
          <View className="w-4 h-[40%] bg-zinc-800 rounded-t-lg" />
          <View className="w-4 h-[90%] bg-zinc-800 rounded-t-lg" />
          <View className="w-4 h-[70%] bg-zinc-800 rounded-t-lg" />
          <View className="w-4 h-[50%] bg-zinc-800 rounded-t-lg" />
        </View>

        {/* X-axis labels */}
        <View className="flex-row justify-between">
          <View className="h-2 w-6 bg-zinc-800 rounded-full" />
          <View className="h-2 w-6 bg-zinc-800 rounded-full" />
          <View className="h-2 w-6 bg-zinc-800 rounded-full" />
          <View className="h-2 w-6 bg-zinc-800 rounded-full" />
          <View className="h-2 w-6 bg-zinc-800 rounded-full" />
          <View className="h-2 w-6 bg-zinc-800 rounded-full" />
        </View>
      </View>

      {/* Shimmer effect */}
      <Animated.View
        className="absolute inset-0 bg-zinc-700 opacity-5"
        style={{
          transform: [{ translateX }],
        }}
      />
    </View>
  );
};

export default Skeleton;
