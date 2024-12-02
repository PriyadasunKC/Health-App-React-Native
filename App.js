// App.js
import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import { ClickCountProvider } from "./src/contexts/ClickCountContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <ClickCountProvider>
        <AppNavigator />
      </ClickCountProvider>
    </AuthProvider>
  );
}
