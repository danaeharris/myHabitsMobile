import React, { useState, useEffect } from "react";
import firebase from "firebase";
//import List from "./List";
import RNPickerSelect from "react-native-picker-select";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
  TextInput,
  TouchableHighlight,
} from "react-native";
//import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { v4 as uuidv4 } from "uuid";

const ListContainer = ({ user }) => {
  const [newListItem, setnewListItem] = useState("");
  const [newListItemType, setnewListItemType] = useState({
    value: "once",
    label: "Once",
  });
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    async function loadToDos() {
      //Load my to dos from the database.
      const collectionSnapshot = await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("toDos")
        .get();
      const loadedToDos = [];
      collectionSnapshot.forEach((documentSnapshot) => {
        loadedToDos.push({
          ...documentSnapshot.data(),
          id: documentSnapshot.id,
        });
      });
      setListItems(loadedToDos);
    }
    loadToDos();
  }, []);

  const addListItem = () => {
    if (newListItem) {
      const newToDo = {
        name: newListItem,
        done: false,
        doneDate: null,
        type: newListItemType.value,
        id: uuidv4(),
      };
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("toDos")
        .add(newToDo);
      setListItems([...listItems, newToDo]);
      setnewListItem("");
    }
  };

  return (
    <View className="container toDo">
      <View className="list">
        <View className="addListItem">
          <TextInput
            onChangeText={(text) => setnewListItem(text)}
            value={newListItem}
            placeholder="Something to do..."
          />
          <View style={{ width: 200 }}>
            <RNPickerSelect
              onValueChange={(value) => setnewListItemType(value)}
              items={[
                { value: "once", label: "Once" },
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
              ]}
            />
          </View>
          <TouchableHighlight
            onPress={() => {
              addListItem();
            }}
          >
            <Image source={require("../assets/plus-square.png")} />
          </TouchableHighlight>
        </View>
        {/*
        <View>
          <DragDropContext
            onDragEnd={(result) => {
              const { destination, source } = result;
              if (!destination) {
                return;
              }
              const newListItems = [...listItems];
              const removedArray = newListItems.splice(source.index, 1);
              let item = removedArray[0];
              item.type = destination.droppableId;
              newListItems.splice(destination.index, 0, item);
              setListItems(newListItems);
            }}
          >
            <List
              listItems={listItems}
              setListItems={setListItems}
              title="once"
              user={user}
            />
            <List
              listItems={listItems}
              setListItems={setListItems}
              title="daily"
              user={user}
            />
            <List
              listItems={listItems}
              setListItems={setListItems}
              title="weekly"
              user={user}
            />
            <List
              listItems={listItems}
              setListItems={setListItems}
              title="monthly"
              user={user}
            />
          </DragDropContext>
        </View>
        */}
      </View>
    </View>
  );
};

export default ListContainer;
