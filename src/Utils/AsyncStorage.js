import * as AsyncStorage from "expo-secure-store";

export const setItem = async (key, value) => {
  try {
    // 1. Stringy the value, expo-secure-store setItemAsycn only accepts a singlestring value
    let string = JSON.stringify(value);

    // 2. Save the item into storage
    let data = await AsyncStorage.setItemAsync(key, string);

    return data;
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
