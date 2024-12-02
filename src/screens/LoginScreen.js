import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { globalStyles } from "../styles/globalStyles";

export default function LoginScreen({ navigation }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email.trim()) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain at least one special character (!@#$%^&*)";
    }
    return "";
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    let error = "";
    if (field === "email") {
      error = validateEmail(value);
    } else if (field === "password") {
      error = validatePassword(value);
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleLogin = () => {

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    const newErrors = {
      email: emailError,
      password: passwordError,
    };

    setErrors(newErrors);

    
    if (emailError || passwordError) {
      return;
    }

 
    login({ email: formData.email });
    navigation.replace("Home");
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Health Dashboard Login</Text>
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={[globalStyles.input, errors.email && globalStyles.inputError]}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.email && (
          <Text style={globalStyles.errorText}>{errors.email}</Text>
        )}

        <TextInput
          style={[
            globalStyles.input,
            errors.password && globalStyles.inputError,
          ]}
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
        />
        {errors.password && (
          <Text style={globalStyles.errorText}>{errors.password}</Text>
        )}

        <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={globalStyles.linkText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
