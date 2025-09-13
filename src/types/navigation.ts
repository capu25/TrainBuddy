import { Workout } from "./workout";

export type RootStackParamList = {
  Maintenance: undefined;
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
  Achivements: undefined;
  Stats: undefined;
  Settings: undefined;
};
