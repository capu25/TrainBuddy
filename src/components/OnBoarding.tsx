import { useRef, useState, useEffect } from "react";
import {
  Dimensions,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";

const { width } = Dimensions.get("window");

type OnboardingItem = {
  id: string;
  title: string;
  description: string;
  lottie: string;
};

const onboardingData: OnboardingItem[] = [
  {
    id: "1",
    title: "Benvenuto in TrainBuddy",
    description: "L'app perfetta per il tracking dei tuoi workout!",
    lottie: require("../../assets/onboardingItems/standingMan.png"),
  },
  {
    id: "2",
    title: "Inserisci i tuoi allenamenti",
    description:
      "Aggiungi le tue route di allenamento per averle sempre accessibili.",
    lottie: require("../../assets/onboardingItems/calendar.png"),
  },
  {
    id: "3",
    title: "Traccia, tutto, sempre!",
    description:
      "Tieni traccia dei tuoi miglioramenti, PR, peso e molto altro.",
    lottie: require("../../assets/onboardingItems/objects.png"),
  },
  {
    id: "4",
    title: "Cosa aspetti?",
    description: "Sblocca il tuo potenziale con TrainBuddy.",
    lottie: require("../../assets/onboardingItems/rack.png"),
  },
];

import { NavigationProp } from "@react-navigation/native";

type OnBoardingProps = {
  navigation: NavigationProp<any>;
};

const OnBoarding: React.FC<OnBoardingProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Crea l'animazione di floating
    const floatingAnimation = Animated.sequence([
      Animated.timing(floatAnim, {
        toValue: -15,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(floatAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(floatingAnimation).start();
  }, []);

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNextPress = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: currentIndex + 1,
      });
    } else {
      try {
        console.log("onboarding completed!");
        navigation.navigate("MainNav");
      } catch (error) {
        console.error("Error saving onboarding status: ", error);
      }
    }
  };

  return (
    <View className="flex-1 bg-black">
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View className="flex-1 w-screen px-4">
            <View className="h-[60%] justify-center items-center">
              <Animated.Image
                source={item.lottie}
                style={[
                  {
                    flex: 1,
                    width: "100%",
                    marginTop: "20%",
                    transform: [{ translateY: floatAnim }],
                  },
                ]}
              />
            </View>
            <View className="h-40%] justify-start items-center px-6 mt-20">
              <Text className="text-3xl font-bold text-center text-zinc-400 mb-4">
                {item.title}
              </Text>
              <Text className="text-lg text-slate-500 text-center leading-6">
                {item.description}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View className="flex flex-row justify-center items-center mb-8">
        {onboardingData.map((_, index) => (
          <View
            key={index}
            className={`w-3 h-3 rounded-full mx-2 ${
              currentIndex === index ? "bg-emerald-500" : "bg-zinc-500"
            }`}
          />
        ))}
      </View>
      <TouchableOpacity
        className="bg-slate-800 rounded-lg py-2 px-8 self-center mb-[15%]"
        onPress={handleNextPress}
      >
        <Text className="text-zinc-200 font-semibold text-lg">
          {currentIndex === onboardingData.length - 1
            ? "Comincia Subito!"
            : "Avanti"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnBoarding;
