import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleAdvice = () => {
    Alert.alert(
      "Coming Soon!",
      "Questa funzionalità sarà presto disponibile, ricorda che sei un beta tester! :D"
    );
  };

  const handleDeleteData = async () => {
    Alert.alert(
      "Attenzione!",
      "Stai per cancellare, in maniera permanente, tutti i dati e i progressi registrati in TrainBuddy, sei sicuro di voler effettuare questa operazione?",
      [
        { text: "Annulla", style: "cancel" },
        {
          text: "Elimina",
          style: "destructive",
          onPress: async () => {
            try {
              //await AsyncStorage.clear();
              //navigation.navigate('ROOT');
              console.log("ELIMINATO TUTTO! BOOM");
            } catch (e) {
              console.error(e);
            }
          },
        },
      ]
    );
  };

  const handleHelp = () => {
    const email = "antonio.pio25a@gmail.com";
    const subject = "Richiesta da @TrainBuddy";

    const mailtoUrl = `mailto:${encodeURIComponent(
      email
    )}?subject=${encodeURIComponent(subject)}`;

    Linking.openURL(mailtoUrl);
  };

  return (
    <View className="flex-1 justify-start items-center bg-black">
      <View className="w-[90%] flex-row justify-between items-center top-[2%] mb-8 mt-[12%]">
        <Text className="text-5xl font-semibold text-zinc-300">Settings</Text>
      </View>

      <ScrollView
        className="w-full"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="items-center pb-8"
      >
        {/* Preferences Section */}
        <View className="w-[90%] bg-zinc-900 rounded-xl p-4 mb-4">
          <Text className="text-xl font-bold text-zinc-300 mb-4">
            Preferenze
          </Text>

          <View className="flex-row justify-between items-center py-3">
            <View className="flex-row items-center">
              <Icon name="notifications-outline" size={24} color="#d4d4d8" />
              <Text className="text-zinc-300 text-lg ml-3">Notifiche</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#3f3f46", true: "#059669" }}
              thumbColor={notificationsEnabled ? "#34d399" : "#d4d4d8"}
            />
          </View>
        </View>

        {/* Data Section */}
        <View className="w-[90%] bg-zinc-900 rounded-xl p-4 mb-4">
          <Text className="text-xl font-bold text-zinc-300 mb-4">Dati</Text>

          <TouchableOpacity
            onPress={handleAdvice}
            className="flex-row justify-between items-center py-3"
          >
            <View className="flex-row items-center">
              <Icon name="cloud-upload-outline" size={24} color="#d4d4d8" />
              <Text className="text-zinc-300 text-lg ml-3">Backup Dati</Text>
            </View>
            {/*<Icon name="chevron-forward" size={24} color="#d4d4d8" />*/}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleAdvice}
            className="flex-row justify-between items-center py-3"
          >
            <View className="flex-row items-center">
              <Icon name="cloud-download-outline" size={24} color="#d4d4d8" />
              <Text className="text-zinc-300 text-lg ml-3">
                Ripristina Dati
              </Text>
            </View>
            {/*<Icon name="chevron-forward" size={24} color="#d4d4d8" />*/}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDeleteData}
            className="flex-row justify-between items-center py-3"
          >
            <View className="flex-row items-center">
              <Icon name="trash-outline" size={24} color="#ef4444" />
              <Text className="text-red-500 text-lg ml-3">
                Elimina Tutti i Dati
              </Text>
            </View>
            {/*<Icon name="chevron-forward" size={24} color="#d4d4d8" />*/}
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View className="w-[90%] bg-zinc-900 rounded-xl p-4 mb-4">
          <Text className="text-xl font-bold text-zinc-300 mb-4">Info</Text>

          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <View className="flex-row items-center">
              <Icon
                name="information-circle-outline"
                size={24}
                color="#d4d4d8"
              />
              <Text className="text-zinc-300 text-lg ml-3">Versione App</Text>
            </View>
            <Text className="text-zinc-500">1.0.0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleHelp}
            className="flex-row justify-between items-center py-3"
          >
            <View className="flex-row items-center">
              <Icon name="help-circle-outline" size={24} color="#d4d4d8" />
              <Text className="text-zinc-300 text-lg ml-3">
                Aiuto e Supporto
              </Text>
            </View>
            <Icon name="chevron-forward" size={24} color="#d4d4d8" />
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View className="w-[90%] bg-zinc-900 rounded-xl p-4">
          <Text className="text-xl font-bold text-zinc-300 mb-4">
            Supporta l'app
          </Text>
          <TouchableOpacity className="flex-row justify-between items-center py-3 rounded-lg bg-yellow-300 ">
            <View className="w-full flex-row items-center justify-center">
              <Icon name="cafe-outline" size={24} color="#000" />
              <Text className="text-blac text-lg ml-3">Buy me a coffee!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
