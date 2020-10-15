// React dependencies
import React, { Component, createContext, useCallback, useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";

import { useNavigation, useNavigationParam} from 'react-navigation-hooks'

// Screen Icon
import EmptyIcon from "../../assets/Shocked.png";

// Higher-order-components
import { withTheme, useTheme, ThemeContext } from "styled-components";
import { NavigationEvents } from "react-navigation";

// Stateless components
import Empty from "../Components/UI/States/Empty";
import ActionButton from "../Components/UI/Action-Blocks/ActionButton";
import Modal from "../Components/UI/Modal";
import ShoppingListCard from "../Components/UI/Cards/ShoppingLists/ShoppingList";
import Loading from "../Components/UI/States/Loading";
import { TextInput } from "react-native-paper";

/*
Context API Consumer:
- Wraps the entire component, Consumer then renders the children (This components JSX)
- When using the <Consumer> component you can access the value which has access to the entire state and the dispatch method

Usage:

<Consumer>
  {value => {
    <Text colour={value.isDark : "White" : "Black"}> Hello </Text>
  }}
</Consumer>
*/
import { Consumer } from "../Context";
import { getItem, setItem } from "../Utils/AsyncStorage";

// Utility libraries
import shortid from "shortid";
import moment from "moment";

import {useCustomThemeProvider} from '../Context/CustomThemeContext';

const ShoppingLists = () => {
  const [isCreateShoppingModalVisible, setIsCreateShoppingModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shoppingListName, setShoppingListName] = useState('');
  const [shoppingLists, setShoppingLists] = useState([]);

  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const [isDark, setIsDark] = useCustomThemeProvider();

  const fetchShoppingLists = async () => {

    setIsLoading(true);

    const response = await getItem('ShoppingLists');

    setShoppingLists(response);

    setIsLoading(false);
  }

  useEffect(() => {
    fetchShoppingLists();      
  }, [])

  const createShoppingList = async () => {

    setIsLoading(true);

    // Material colours
    const red = "#e53935"; // Red with a shade of 500
    const green = "#43a047"; // Green with a shade of 500
    const blue = "#2196f3"; // Blue with a shade of 500
    const purple = "#9c27b0"; // Purple with a shade of 500

    const shoppingListThemes = [red, blue, green, purple];
    let randomTheme = shoppingListThemes[Math.floor(Math.random() * shoppingListThemes.length)];

    const copy = [...shoppingLists]

    let shoppingListData = {
      id: shortid.generate(),
      name: shoppingListName,
      createdOn: moment().format("Do MMMM YYYY"),
      shoppingListTheme: randomTheme,
      items: [],
    };


    copy.push(shoppingListData);

    await setItem('ShoppingLists', copy);
    setShoppingLists(copy);
    setIsCreateShoppingModalVisible(false);
    setIsLoading(false);
    setShoppingListName('');
  }; 


  if(isLoading === true) {
    return (
      <Loading isDark={isDark}/>
    )
  }

  return (
    <>
    <NavigationEvents onDidFocus={() => fetchShoppingLists()} />

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
