import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export function LoginForm({
  onLogin,
  onSignup,
}: {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert(
        "Enter your email",
        "You must enter an email to reset your password."
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert("Password Reset Sent", "Check your email for a reset link.");
    } catch (error: any) {
      Alert.alert(
        "Reset Failed",
        error.message || "Unable to send reset email."
      );
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonGroup}>
        <Button title="Login" onPress={() => onLogin(email, password)} />
        <Button title="Sign Up" onPress={() => onSignup(email, password)} />
      </View>
      <TouchableOpacity
        onPress={handleForgotPassword}
        style={styles.forgotButton}
      >
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 16,
    justifyContent: "center",
  },
  input: {
    height: 48,
    borderColor: "darkgray",
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  buttonGroup: {
    flexDirection: "column",
    gap: 8,
  },
  forgotButton: {
    marginTop: 16,
    alignItems: "center",
  },
  forgotText: {
    color: "#007AFF",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
