import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        {!user ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                gestureEnabled: false,
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                gestureEnabled: false,
                headerBackVisible: false,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              gestureEnabled: false,
              headerBackVisible: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
