import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Pressable,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ModalTitle, SlideAnimation } from "react-native-modals";
import { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const index = () => {
  const [todos, setTodos] = [];
  const today = new Date().toDateString();
  const [isVisible, setIsVisible] = useState(false);
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("All");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [markedTodo, setMarkedTodo] = useState(false);

  const suggestions = [
    { id: 1, name: "Drink water, keep healthy" },
    {
      id: 2,
      name: "Take a walk, keep fit",
    },
    { id: 3, name: "Call your mom, she misses you" },
    { id: 4, name: "Read a book, keep your mind sharp" },
    { id: 5, name: "Do some pushups, keep strong" },
    { id: 6, name: "Take a nap, keep your energy up" },
  ];

  const addTodo = async () => {
    console.log("test:");
    try {
      const todoData = {
        title: todo,
        category: category,
        dueDate: new Date(),
      };

      const response = await fetch("http://localhost:4444/api/todo/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
      });
      if (response.ok) {
        console.log("Todo added:", todoData);
      } else {
        console.error("Error when adding todos:", response.statusText);
      }

      setIsVisible(false);
      setTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsedTodos();
  }, []);

  const getUsedTodos = async () => {
    try {
      const response = await fetch(`http://localhost:4444/api/todo/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setTodos(response.data.todos);

      const fetchedTodos = response.data.todos || [];
      const pending = fetchedTodos.filter((todo) => todo.status === "pending");
      const completed = fetchedTodos.filter(
        (todo) => todo.status !== "completed"
      );

      setPendingTodos(pending);
      setCompletedTodos(completed);
    } catch (error) {
      console.error(error);
    }
  };
  const todoAsCompleted = async (id) => {
    try {
      setMarkedTodo(true);
      const response = await fetch(
        `http://localhost:4444/api/todo/${id}/completed`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  console.log("completed", completedTodos);
  console.log("pending", pendingTodos);
  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#7CB9EB",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>All</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7CB9EB",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Work</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#7CB9EB",
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginRight: "auto",
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Family</Text>
        </Pressable>
        <Pressable onPress={() => setIsVisible(!isVisible)}>
          <AntDesign name="pluscircle" size={30} color="#007FFF" />
        </Pressable>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "#e0f2fe" }}>
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View>
              {pendingTodos?.length > 0 && <Text>Tasks to Do!{today}</Text>}
              {pendingTodos?.map((item, index) => (
                <Pressable key={index}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Entypo name="circle" size={18} color="black" />
                    <Text>{item?.title}</Text>
                    <SimpleLineIcons name="flag" size={20} color="black" />
                  </View>
                </Pressable>
              ))}
              {/* {completedTodos?.length > 0 && ()} */}
              {/* <View>
                  <View> </View>
            </View> */}
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Image
                style={{ width: 300, height: 300, resizeMode: "contain" }}
                source={require("../../../assets/note-5913650_1280.png")}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: "black",
                  marginTop: 20,
                }}
              >
                {" "}
                No tasks for Today! add a task
              </Text>
              <Pressable
                onPress={() => setIsVisible(!isVisible)}
                style={{ marginTop: 15 }}
              >
                <AntDesign name="pluscircle" size={30} color="#007FFF" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomModal
        onBackdropPress={() => setIsVisible(!isVisible)}
        onHardwareBackPress={() => setIsVisible(!isVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add to todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isVisible}
        onTouchOutside={() => setIsVisible(!isVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input a new task here"
              style={{
                padding: 10,
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                width: "90%",
                flex: 1,
              }}
            />
            <Pressable onPress={addTodo}>
              <Ionicons name="send" size={24} color="blue" />
            </Pressable>
          </View>
          <Text>Choose Category</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginVertical: 10,
            }}
          >
            <Pressable
              onPress={() => setCategory("work")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borederRadius: 25,
              }}
            >
              <Text>Work</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("family")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borederRadius: 25,
              }}
            >
              <Text>Family</Text>
            </Pressable>
            <Pressable
              onPress={() => setCategory("wishlist")}
              style={{
                borderColor: "#E0E0E0",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderWidth: 1,
                borederRadius: 25,
              }}
            >
              <Text>WishList</Text>
            </Pressable>
          </View>
          <Text>Some suggestion</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
              marginVertical: 10,
            }}
          >
            {suggestions?.map((item) => (
              <Pressable
                onPress={() => setTodo(item?.name)}
                style={{
                  backgroundColor: "grey",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 25,
                  color: "black",
                  fontSize: 12,
                }}
                key={item.id}
              >
                <Text style={{ textAlign: "center" }}>{item?.name}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default index;
