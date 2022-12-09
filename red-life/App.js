import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "./Screens/ProfileCreation";
import WeeklyGoalSetting from "./Screens/WeeklyGoalSetting";
import Home from "./Screens/Home";

export default function App() {
  const stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Profle Creation"
        screenOptions={{ headerShown: false }}>
        {/* <stack.Screen name="Open" component={Open} /> */}
        <stack.Screen name="Profile Creation" component={Profile} />
        <stack.Screen
          name="Weekly Goal Setting"
          component={WeeklyGoalSetting}
        />
        <stack.Screen name="Home" component={Home} />
      </stack.Navigator>
    </NavigationContainer>
  );
}
