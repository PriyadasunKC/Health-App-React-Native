// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const users = await AsyncStorage.getItem("users");
      const parsedUsers = users ? JSON.parse(users) : [];

      const user = parsedUsers.find((user) => user.email === credentials.email);

      if (!user) {
        return {
          success: false,
          error: {
            email: "No account found with this email",
          },
        };
      }

      if (user.password !== credentials.password) {
        return {
          success: false,
          error: {
            password: "Incorrect password",
          },
        };
      }

      const userData = {
        name: user.name,
        email: user.email,
      };

      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error("Error during login:", error);
      return {
        success: false,
        error: {
          general: "An error occurred during login",
        },
      };
    }
  };

  const register = async (userData) => {
    try {
      const users = await AsyncStorage.getItem("users");
      const parsedUsers = users ? JSON.parse(users) : [];

      const userExists = parsedUsers.some(
        (user) => user.email === userData.email
      );

      if (userExists) {
        return {
          success: false,
          error: "Email already registered",
        };
      }

      const newUsers = [...parsedUsers, userData];
      await AsyncStorage.setItem("users", JSON.stringify(newUsers));

      return { success: true };
    } catch (error) {
      console.error("Error during registration:", error);
      return {
        success: false,
        error: "An error occurred during registration",
      };
    }
  };

 const logout = async () => {
   try {
     await AsyncStorage.removeItem("user");
     setUser(null);
   } catch (error) {
     console.error("Error during logout:", error);
     throw error;
   }
 };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const handleLogin = async () => {
  Keyboard.dismiss();
  animateButton();

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

  const result = await login({
    email: formData.email,
    password: formData.password,
  });

  if (result.success) {
    navigation.replace("Home");
  } else {
    setErrors((prev) => ({
      ...prev,
      email: result.error,
    }));
  }
};

const handleRegister = async () => {
  Keyboard.dismiss();

  const nameError = validateName(formData.name);
  const emailError = validateEmail(formData.email);
  const passwordError = validatePassword(formData.password);
  const confirmPasswordError = validateConfirmPassword(
    formData.confirmPassword,
    formData.password
  );

  const newErrors = {
    name: nameError,
    email: emailError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
  };

  setErrors(newErrors);

  if (Object.values(newErrors).some((error) => error !== "")) return;

  const result = await register({
    name: formData.name,
    email: formData.email,
    password: formData.password,
  });

  if (result.success) {
    navigation.navigate("Login");
  } else {
    setErrors((prev) => ({
      ...prev,
      email: result.error,
    }));
  }
};
