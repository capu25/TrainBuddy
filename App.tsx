import React from "react";
import { StatusBar } from "expo-status-bar";

// --- IMPORT GLOBAL CSS ---
import "./global.css";

// --- IMPORT MAIN-STACK ---
import MainStack from "./src/navigation/MainStack";

export default function App() {
  return (
    <>
      <MainStack />
      <StatusBar style="light" />
    </>
  );
}
