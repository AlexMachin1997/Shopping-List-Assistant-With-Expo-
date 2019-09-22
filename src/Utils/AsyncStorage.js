import * as AsyncStorage from "expo-secure-store";

export const setItem = async (key, value) => {
  try {
    // 1. Stringy the value, expo-secure-store setItemAsycn only accepts a singlestring value
    let string = JSON.stringify(value);

    // 2. Save the item into storage
    await AsyncStorage.setItemAsync(key, string);
  } catch (error) {
    console.log(error);
  }
};

export const getItem = async key => {
  try {
    // 1. Retrieve the value/s
    let data = await AsyncStorage.getItemAsync(key);

    // 2. Parse response, it retrives a giant string hence the data needs to be parsed into JSON format
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

export const clearAll = () => {
  try {
    // 1. Create an array of keys used to identify sets of data in AsyncStorage
    const keys = ["isDark", "ShoppingLists", "hasVisited"];

    // 2. Loop through the array defined above and remove each value
    keys.map(async data => await AsyncStorage.deleteItemAsync(data));

    // NOTE: This is not used yet, may or may not be alll. It's there if it's needed.
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async key => {
  try {
    // 1. Retrieve the value/s
    await AsyncStorage.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
};
