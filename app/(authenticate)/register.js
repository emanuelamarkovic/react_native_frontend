import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const router = useRouter();

  const toggleSecureEntry = () => {
    setSecureEntry(!secureEntry);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4444/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      router.replace("/login");
    } catch (error) {
      console.error(error);
      Alert.alert("Login Failed");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View style={{ marginTop: 80 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#5072A7" }}>
          TODO-LIST
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
            Register to your account
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#E0E0E0",
            paddingVertical: 3,
            borderRadius: 5,
            marginTop: 5,
          }}
        >
          <Ionicons
            style={{ marginLeft: 8 }}
            name="person"
            size={24}
            color="grey"
          />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              color: "gray",
              marginVertical: 10,
              width: 250,
              fontSize: password ? 17 : 17,
            }}
            placeholder="enter your name"
          />
        </View>
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 3,
              borderRadius: 5,
              marginTop: 10,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={20}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 250,
                fontSize: email ? 17 : 17,
              }}
              placeholder="enter your email"
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 3,
                borderRadius: 5,
                marginTop: 20,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="lock"
                size={20}
                color="gray"
              />
              <TextInput
                value={password}
                secureTextEntry={secureEntry}
                onChangeText={(text) => setPassword(text)}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 250,
                  fontSize: password ? 17 : 17,
                }}
                placeholder="enter your password"
              />
              <Pressable onPress={toggleSecureEntry}>
                <MaterialCommunityIcons
                  style={{ marginRight: 8 }}
                  name={secureEntry ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="grey"
                />
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 12,
                justifyContent: "space-between",
              }}
            ></View>
          </View>
          <View style={{ marginTop: 60 }} />
          <Pressable
            onPress={fetchData}
            style={{
              width: 200,
              backgroundColor: "#6699CC",
              borderRadius: 6,
              padding: 10,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              Register
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace("/login")}
            style={{ marginTop: 15 }}
          ></Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;
