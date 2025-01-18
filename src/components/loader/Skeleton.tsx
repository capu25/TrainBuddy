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
    <View className="bg-zinc-900 p-5 rounded-3xl overflow-hidden relative h-[55%] justify-center">
      <View className="flex-row items-center mb-4">
        <View className="w-12 h-12 rounded-full bg-zinc-800" />
        <View className="ml-4 flex-1">
          <View className="h-4 bg-zinc-800 rounded-xl w-3/5 mb-2" />

          <View className="h-3 bg-zinc-800 rounded-xl w-2/5" />
        </View>
      </View>
      <View className="space-y-3">
        <View className="h-3 bg-zinc-800 rounded-xl w-full" />
        <View className="h-3 bg-zinc-800 rounded-xl w-full my-3" />
        <View className="h-3 bg-zinc-800 rounded-xl w-[70%]" />
      </View>
      <View className="space-y-3 mt-5">
        <View className="h-3 bg-zinc-800 rounded-xl w-[60%]" />
        <View className="h-3 bg-zinc-800 rounded-xl w-[30%] my-3" />
        <View className="h-3 bg-zinc-800 rounded-xl w-[70%]" />
      </View>
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
