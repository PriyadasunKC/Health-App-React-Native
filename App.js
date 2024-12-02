import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { ClickCountProvider } from "./src/contexts/ClickCountContext";

export default function App() {
  return (
    <AuthProvider>
      <ClickCountProvider>
        <AppNavigator />
      </ClickCountProvider>
    </AuthProvider>
  );
}
