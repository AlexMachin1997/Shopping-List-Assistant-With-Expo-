import React from "react";

// React-Navigation dependencies
import { createStackNavigator, createDrawerNavigator } from "react-navigation";

//Importing screens and tabs
import TabStack from "./TabStack";
import ShoppingListScreen from "../Screens/ShoppingList";
import SettingsScreen from "../Screens/Settings";

// Navigation drawer component
import Drawer from "../Components/Navigation/Drawer.js";
import HeaderIcon from "../Components/Navigation/HeaderIcon";

// Creating the MainStack routes
const MainStackRoutes = createStackNavigator(
  {
    Tabs: TabStack,
    ShoppingList: ShoppingListScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: "Tabs",
    headerMode: "float",
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#003249",
        borderBottomColor: "#CCDBDC",
        borderTopColor: "#003249",
        borderWidth: 1,
        borderStyle: "solid"
      },
      headerTintColor: "#CCDBDC",
      headerPressColorAndroid: "red",

      headerLeft: (
        <HeaderIcon
          action={() => navigation.toggleDrawer()}
          icon="menu"
          marginLeft={10}
        />
      ),
      headerRight: (
        <HeaderIcon
          action={() => navigation.navigate("Settings")}
          icon="settings"
          marginRight={10}
        />
      )
    })
  }
);

// Creating drawer navigation, this will be rendered, though you will be access the MainStackRoutes via props
const MainStack = createDrawerNavigator(
  {
    screen: MainStackRoutes
  },
  {
    contentComponent: Drawer
  }
);

export default MainStack;
