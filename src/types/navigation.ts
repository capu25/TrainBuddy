import { Workout } from "./workout";

export type RootStackParamList = {
  Onboarding: undefined;
  MainNav: undefined;
  Home: undefined;
  Exploded: {
    workout: Workout;
  };
  Timer: {
    time: number;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Schedule: undefined;
  Stats: undefined;
  Settings: undefined;
};
