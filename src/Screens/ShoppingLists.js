// Core dependencies
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation} from 'react-navigation-hooks'

// Screen Icon
import EmptyIcon from "../../assets/Shocked.png";

// Higher-order-components
import { ThemeContext } from "styled-components";

// Stateless components
import Empty from "../Components/UI/States/Empty";
import ActionButton from "../Components/UI/Action-Blocks/ActionButton";
import Modal from "../Components/UI/Modal";
import ShoppingListCard from "../Components/UI/Cards/ShoppingLists/ShoppingList";
import Loading from "../Components/UI/States/Loading";
import { TextInput } from "react-native-paper";

// Utils library
import { getItem, setItem } from "../Utils/AsyncStorage";
import shortid from "shortid";
import moment from "moment";

// Custom hooks
import {useCustomThemeProvider} from '../Context/CustomThemeContext';

const ShoppingLists = () => {

  // Defining the local screen state
  const [isCreateShoppingModalVisible, setIsCreateShoppingModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shoppingListName, setShoppingListName] = useState('');
  const [shoppingLists, setShoppingLists] = useState([]);

  // Accessing the custom theme 
  const themeContext = useContext(ThemeContext);

  // Access the react-navigation internal api
  // TODO: Update react-navigation and remove the react-navigation-hooks package
  const navigation = useNavigation();
  const [isDark, setIsDark] = useCustomThemeProvider();

  // Get the shopping lists from storage 
  const fetchShoppingLists = async () => {

    // Update the loading state 
    setIsLoading(true);

    // Get the items
    const response = await getItem('ShoppingLists');

    // Set the items
    setShoppingLists(response);

    // Update the loading state 
    setIsLoading(false);
  }

  // Fetch the shopping list once, no need to re-run this
  useEffect(() => {
    fetchShoppingLists();      
  }, [])

  const createShoppingList = async () => {

    // Update the loading state 
    setIsLoading(true);

    // Material colours
    const red = "#e53935"; // Red with a shade of 500
    const green = "#43a047"; // Green with a shade of 500
    const blue = "#2196f3"; // Blue with a shade of 500
    const purple = "#9c27b0"; // Purple with a shade of 500

    // Decide the shopping list items theme (Dictates what colour the card will have)
    const shoppingListThemes = [red, blue, green, purple];
    let randomTheme = shoppingListThemes[Math.floor(Math.random() * shoppingListThemes.length)];

    // Copy the existing shopping list
    const copy = [...shoppingLists]

    // Create a new shopping list item
    let shoppingListData = {
      id: shortid.generate(),
      name: shoppingListName,
      createdOn: moment().format("Do MMMM YYYY"),
      shoppingListTheme: randomTheme,
      items: [],
    };

    // Update the copied shopping lists array
    copy.push(shoppingListData);

    // Serialize the new shopping list into storage
    await setItem('ShoppingLists', copy);

    // Update the shopping lists local state
    setShoppingLists(copy);

    // Reset ehe local state back to their initial values
    setIsCreateShoppingModalVisible(false);
    setIsLoading(false);
    setShoppingListName('');
  }; 


  // Loading state
  if(isLoading === true) {
    return (
      <Loading isDark={isDark}/>
    )
  }

  return (
    <>
    <Modal
      isDark={isDark}
      visible={isCreateShoppingModalVisible}
      title="Create a shopping list"
      onDismiss={() => setIsCreateShoppingModalVisible(false)}
      onCancel={() => {
        setIsCreateShoppingModalVisible(false);
        setShoppingListName('')
      }}
      onOk={async() => await createShoppingList()}
      submitDisabled={shoppingListName < 1 ? true : false}
    >
      <TextInput
        placeholder="Enter a shopping list name"
        value={shoppingListName}
        onChangeText={(value) => setShoppingListName(value)}
        underlineColor="transparent"
        mode="flat"
      />
    </Modal>

    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: isDark
          ?  themeContext.Primary
          : themeContext.Secondary,
      }}
    >
      {shoppingLists.length < 1 ? (
        <Empty
          image={EmptyIcon}
          label="No shipping lists exist"
          heading="No shopping lists exist"
          overview="Why not try adding one ?"
          isDark={isDark}
        />
      ) : (
        shoppingLists.map((data, index) => {
          return (
            <ShoppingListCard
              key={index}
              title={data.name}
              background={data.shoppingListTheme}
              action={() => {
                navigation.navigate('ShoppingList', {
                  ShoppingList: data,
                  title: data.name,
                });
              }}
            />
          );
        })
      )}
    </ScrollView>

    <ActionButton
      colour="white"
      icon={
        isCreateShoppingModalVisible ? "remove" : "add"
      }
      action={() => setIsCreateShoppingModalVisible(true)}
    />
  </>
  )
}

export default ShoppingLists;
