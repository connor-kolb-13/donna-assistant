import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Clipboard,
} from "react-native";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import DonnaAvatar from "@/assets/images/DonnaAssistantAnime.png";
import { LoginForm } from "@/components/LoginForm";

interface ChatMessage {
  id: string;
  sender: "User" | "Donna";
  text: string;
}

function HomeScreen() {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  const webhookURL = "https://ckolb13.app.n8n.cloud/webhook/donna/router";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (chatMessages.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [chatMessages]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      Alert.alert("Login failed", "Try again or sign up.");
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      Alert.alert("Signup failed", "Try a different email or password.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      Alert.alert("Logout failed", "Try again.");
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString() + "-user",
      sender: "User",
      text: userInput.trim(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: userInput,
          userId: user ? user.uid : "anonymous",
        }),
      });

      const assistantText = await response.text();
      const assistantMessage: ChatMessage = {
        id: Date.now().toString() + "-donna",
        sender: "Donna",
        text: assistantText,
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "Donna",
          text: "Error contacting assistant.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };

  const copyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert("Copied", "Message copied to clipboard.");
  };

  const renderItem = ({ item }: { item: ChatMessage }) => {
    const parts = item.text.split(/(https?:\/\/[^\s]+)/g);
    return (
      <TouchableOpacity onLongPress={() => copyToClipboard(item.text)}>
        <View
          style={[
            styles.messageContainer,
            item.sender === "User" ? styles.userBubble : styles.donnaBubble,
          ]}
        >
          <Text style={styles.messageSender}>{item.sender}</Text>
          <Text style={styles.messageText}>
            {parts.map((part, index) =>
              part.startsWith("http") ? (
                <Text
                  key={index}
                  style={{ color: "blue" }}
                  onPress={() => Linking.openURL(part)}
                >
                  {part}
                </Text>
              ) : (
                part
              )
            )}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.avatarContainer}>
          <Image source={DonnaAvatar} style={styles.avatar} />
        </View>

        {!user ? (
          <LoginForm onLogin={handleLogin} onSignup={handleSignup} />
        ) : (
          <>
            <Button title="Logout" onPress={handleLogout} color="#cc0000" />
            {chatMessages.length === 0 ? (
              <View style={styles.introContainer}>
                <Text style={styles.introText}>
                  Hi, I'm Donna!{"\n"}How can I help you today?
                </Text>
              </View>
            ) : (
              <FlatList
                ref={flatListRef}
                data={chatMessages}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.chatContainer}
              />
            )}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Type your message..."
                value={userInput}
                onChangeText={setUserInput}
                multiline
                numberOfLines={3}
              />
              {isLoading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                <Button title="Send" onPress={sendMessage} />
              )}
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  chatContainer: {
    paddingVertical: 12,
  },
  messageContainer: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#D1E8FF",
    alignSelf: "flex-end",
  },
  donnaBubble: {
    backgroundColor: "#E2E2E2",
    alignSelf: "flex-start",
  },
  messageSender: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "column",
    marginBottom: 12,
  },
  input: {
    borderColor: "darkgray",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    textAlignVertical: "top",
    minHeight: 48,
  },
  introContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  introText: {
    fontSize: 24,
    color: "#333",
    textAlign: "center",
    lineHeight: 34,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});
