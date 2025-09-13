import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";

// --- IMPORT KEEPAWAKE ---
import { useKeepAwake } from "expo-keep-awake";

// --- IMPORT AUDIO STUFF ---
import { AudioPlayer } from "expo-audio";

// --- TYPE DEF ---
type TimerScreenRouteProp = RouteProp<RootStackParamList, "Timer">;

type TimerScreenProps = {
  route: TimerScreenRouteProp;
};

const TimerScreen: React.FC<TimerScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const initialTime = route.params.time;
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [progress, setProgress] = useState<number>(0);
  const progressAnim = useState(new Animated.Value(0))[0];

  // --- KEEP THE SCREEN ON DURING TIMER ---
  useKeepAwake();

  const [sound, setSound] = useState<AudioPlayer | null>(null);

  useEffect(() => {
    const loadSound = async () => {
      try {
        // Crea il player audio
        const player = new AudioPlayer(
          require("../../../../assets/audio/timeUp.mp3")
        );

        // Configura per riprodurre anche in modalità silenziosa su iOS
        await player.setAudioModeAsync({
          playsInSilentModeIOS: true,
        });

        setSound(player);
      } catch (e) {
        console.error("Errore nel caricamento del suono:", e);
      }
    };

    loadSound();

    // Cleanup quando il componente viene smontato
    return () => {
      if (sound) {
        sound.remove();
      }
    };
  }, []);

  const playSound = async () => {
    try {
      if (sound) {
        await sound.replayAsync();
      }
    } catch (e) {
      console.error("Errore nella riproduzione del suono:", e);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playSound();
      clearInterval(interval!);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeLeft]);

  useEffect(() => {
    if (initialTime > 0) {
      const newProgress = ((initialTime - timeLeft) / initialTime) * 100;
      setProgress(newProgress);

      Animated.timing(progressAnim, {
        toValue: newProgress,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [timeLeft]);

  const animatedHeight = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className="w-[90%] flex-row justify-between items-center self-center top-[10%]">
        <Text className="text-5xl font-semibold text-zinc-400">Timer</Text>
      </View>

      {/* Timer Container */}
      <View className="flex-1 items-center justify-center">
        {/* Progress bar */}
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: animatedHeight,
            backgroundColor: "#10b981",
            opacity: 1,
          }}
        />

        {/* Timer display */}
        {timeLeft > 0 ? (
          <Text className="text-8xl font-bold text-white">{timeLeft}s</Text>
        ) : (
          <>
            <Text className="text-5xl font-semibold text-zinc-950">
              Tempo scaduto!
            </Text>

            {/* Buttons Container */}
            <View className="mt-8 gap-4">
              {/* Reset button */}
              <TouchableOpacity
                onPress={() => setTimeLeft(initialTime)}
                className="border-2 border-zinc-700 rounded-full justify-center items-center p-4 bg-zinc-800"
              >
                <Icon name="refresh-outline" color="#d4d4d8" size={28} />
              </TouchableOpacity>

              {/* Back button */}
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="border-2 border-zinc-700 rounded-full justify-center items-center p-4 bg-zinc-800"
              >
                <Icon name="arrow-back-outline" color="#d4d4d8" size={28} />
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Reset button during countdown */}
        {timeLeft > 0 && (
          <TouchableOpacity
            onPress={() => setTimeLeft(initialTime)}
            className="border-2 border-zinc-700 rounded-full justify-center items-center p-4 bg-zinc-800 mt-8"
          >
            <Icon name="refresh-outline" color="#d4d4d8" size={28} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TimerScreen;
