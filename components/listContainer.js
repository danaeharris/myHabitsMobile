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
  TouchableOpacity,
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
  const placeholder = {
    label: "How often?",
    value: null,
    color: "#DDD",
  };

  return (
    <View style={styles.toDoContainer}>
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setnewListItem(text)}
            value={newListItem}
            placeholder="Something to do..."
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RNPickerSelect
              style={{
                ...pickerSelectStyles,
              }}
              placeholder={placeholder}
              onValueChange={(value) => setnewListItemType(value)}
              items={[
                { value: "once", label: "Once" },
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
              ]}
            />
            <TouchableOpacity
              activeOpacity={1}
              style={{ opacity: 0.5, marginLeft: 10 }}
              onPress={() => {
                addListItem();
              }}
            >
              <Image
                source={require("../assets/plus-square.png")}
                style={styles.imageButton}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {/*<List
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
          />*/}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toDoContainer: {
    backgroundColor: "#4F5ACE",
  },
  inputContainer: {
    margin: 30,
    alignItems: "flex-start",
    position: "relative",
    backgroundColor: "#fafafa",
    padding: 10,
    borderRadius: 4,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  input: {
    fontSize: 16,
    width: "90%",
    padding: 10,
    marginVertical: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
  },
  imageButton: {
    height: 35,
    width: 35,
    marginLeft: 10,
    padding: 5,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    color: "black",
    width: 250,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    color: "black",
    width: 250,
  },
});
export default ListContainer;
