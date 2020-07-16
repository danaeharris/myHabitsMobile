import React, { useState, useEffect } from "react";
import firebase from "firebase";
//import List from "./List";
import RNPickerSelect from "react-native-picker-select";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Chevron } from "react-native-shapes";
import List from "./list";

import { v4 as uuidv4 } from "uuid";

const ListContainer = ({ user, listItems, setListItems }) => {
  const [newListItem, setnewListItem] = useState("");
  const [newListItemType, setnewListItemType] = useState("once");

  const addListItem = () => {
    if (newListItem) {
      const newToDo = {
        name: newListItem,
        done: false,
        doneDate: null,
        type: newListItemType,
        id: uuidv4(),
        dateEdited: Date.now(),
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
            maxLength={500}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <RNPickerSelect
                style={{
                  ...pickerSelectStyles,
                }}
                value={newListItemType}
                placeholder={placeholder}
                onValueChange={(value) => setnewListItemType(value)}
                items={[
                  { value: "once", label: "Once" },
                  { value: "daily", label: "Daily" },
                  { value: "weekly", label: "Weekly" },
                  { value: "monthly", label: "Monthly" },
                ]}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                  return <Chevron size={2} color="#ddd" />;
                }}
              />
            </View>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="add button"
              accessibilityHint="adds this to do item to your list."
              activeOpacity={1}
              style={{ opacity: 0.75, marginLeft: 10, width: 53 }}
              onPress={() => {
                Keyboard.dismiss();
                addListItem();
              }}
            >
              <Image
                source={require("../assets/plus-square.png")}
                style={{
                  height: 43,
                  width: 43,
                  marginLeft: 10,
                  padding: 5,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
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
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: "#303569",
    fontFamily: "Lato-Regular",
    fontSize: 16,
    width: "100%",
    padding: 10,
    marginBottom: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "#303569",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  inputAndroid: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "#303569",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "transparent",
  },
  iconContainer: {
    top: 15,
    right: 15,
  },
});
export default ListContainer;
