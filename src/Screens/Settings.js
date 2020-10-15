// React dependencies
import React, { useState, useContext} from "react";
import { ScrollView, Alert } from "react-native";
import { useNavigation} from 'react-navigation-hooks'

// Higher-Order-Components (HOC)
import { withTheme, useTheme, ThemeContext } from "styled-components";

// Stateless components
import Section from "../Components/Styled-Components/Section";
import Text from "../Components/Styled-Components/Text";
import Button from "../Components/UI/Buttons";
import { Switch, Divider } from "react-native-paper";
import Modal from "../Components/UI/Modal";
import HeaderIcon from "../Components/Navigation/HeaderIcon";

// Utils
import { setItem, clearAll, deleteItem } from "../Utils/AsyncStorage";

// Custom hooks
import {useCustomThemeProvider} from '../Context/CustomThemeContext';

const Settings = () => {
  const [isDeleteShoppingListsModalVisible, setIsDeleteShoppingListsModalVisible] = useState(false);

  // Accessing the custom theme 
  const themeContext = useContext(ThemeContext);

  // Access the react-navigation internal api
  // TODO: Update react-navigation and remove the react-navigation-hooks package
  const navigation = useNavigation();
  const [isDark, setIsDark] = useCustomThemeProvider();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: isDark
          ? themeContext.Primary
          : themeContext.Secondary
      }}
    >
      <Modal
        isDark={isDark}
        visible={isDeleteShoppingListsModalVisible}
        title="Delete shopping lists"
        onDismiss={() => setIsDeleteShoppingListsModalVisible(false)}
        onCancel={() => setIsDeleteShoppingListsModalVisible(false)}
        onOk={async () => {

          setIsDeleteShoppingListsModalVisible(false);

          // await AsyncStorage.removeItem("ShoppingLists");
          await deleteItem("ShoppingLists");

          // Sends an alert message (Used instead of push notifications)
          Alert.alert(
            "Success",
            "Your shopping lists have been cleared",
            [
              {
                text: "OK"
              }
            ],

            // Allows you to click outside the alert to close it.
            { cancelable: true }
          );
        }}
        submitDisabled={false}
      >
        <Text
          colour={
            isDark ? themeContext.Secondary : themeContext.Primary
          }
          size="20px"
        >
          Are you sure you want to delete all of your shopping lists ?
        </Text>
      </Modal>

      <Section
        row
        isDark={isDark}
        paddingTop={10}
        paddingBottom={10}
        paddingLeft={10}
        paddingRight={10}
        marginTop={10}
        marginBottom={10}
        marginLeft={10}
        marginRight={10}
        alignItems="center"
      >
        <Text
          colour={isDark ? themeContext.Secondary : themeContext.Primary}
        >
          Night mode
        </Text>

        <Section
          flexGrow={1}
          alignItems="flex-end"
          backgroundColour="transparent"
        >
          <Switch
            value={isDark}
            onValueChange={async () => {
              // // Destructuring the dispatch function from the value object
              // const { dispatch } = value;

              // // Updates the context API state
              // await dispatch({
              //   type: "SET_THEME_MODE",
              //   payload: value.isDark
              // });

              // // Set isDark equal to the inverted value
              // await setItem("isDark", !value.isDark);
              setIsDark(value => !value)
            }}
            color={themeContext.Tertiary}
            style={{ marginLeft: 10 }}
          />
        </Section>
      </Section>

      <Divider
        style={{
          backgroundColor: isDark
            ? themeContext.Secondary
            : themeContext.Primary,
          height: 1
        }}
      />

      <Section
        row
        isDark={isDark}
        paddingTop={10}
        paddingBottom={10}
        paddingLeft={10}
        paddingRight={10}
        marginTop={10}
        marginBottom={10}
        marginLeft={10}
        marginRight={10}
        alignItems="center"
      >
        <Text
          colour={isDark ? themeContext.Secondary : themeContext.Primary}
        >
          Clear shopping lists
        </Text>
        <Section
          flexGrow={1}
          alignItems="flex-end"
          backgroundColour="transparent"
        >
          <Button
            isCompact={true}
            mode="contained"
            text="Delete"
            colour={themeContext.Tertiary}
            label="Delete shopping lists"
            onClick={() => setIsDeleteShoppingListsModalVisible(true)}
            isDark={true}
            isDisabled={false}
          />
        </Section>
      </Section>
    </ScrollView>
  )
}

Settings.navigationOptions = {
  title: "Settings",
    headerRight: null,
    headerLeft: (
      <HeaderIcon
        icon="arrow-back"
        action={() => navigation.goBack()}
        marginLeft={10}
      />
    )
}

export default Settings
