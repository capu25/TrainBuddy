import { Workout } from "./workout";

export type RootStackParamList = {
  MainNav: undefined;
  Home: undefined;
  Exploded: {
    workout: Workout;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Schedule: undefined;
  Stats: undefined;
  Settings: undefined;
};
