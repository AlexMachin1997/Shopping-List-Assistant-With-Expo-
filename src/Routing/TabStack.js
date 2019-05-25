// React dependencies
import React from "react";

// Creates the material tab navigator
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// Custom screens
import ShoppingListsScreen from "../Screens/ShoppingLists";
import ItemTrackingScreen from "../Screens/ItemTracking";

// Icon libaries
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

/* 

SearchStack:
- Creates a stack which can be traversered via props when active
- When this stack is in use a bottom tab navigator is create with the createMaterialBottomTabNavigator method

Route Config:
- Screens are defined
- Each screen has an asssociated icon, for example barcode for barcode search

Tab config:
- An inital tab is specified
- BarStyle sets the backgroundColour which is currently blue

*/
export default (TabStack = createMaterialBottomTabNavigator(
  {
    ShoppingLists: {
      screen: ShoppingListsScreen,
      navigationOptions: {
        tabBarLabel: "Shopping Lists",
        tabBarIcon: () => (
          <MaterialCommunityIcons
            name="clipboard-text-outline"
            size={25}
            color="#CCDBDC"
          />
        )
      }
    },
    TrackItem: {
      screen: ItemTrackingScreen,
      navigationOptions: {
        tabBarLabel: "Find items",
        tabBarIcon: () => (
          <MaterialIcons name="location-on" size={25} color="#CCDBDC" />
        )
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];

      // ShoppingLists tab, when the route equals routeName set the headerTitle equal to the specified title
      if (routeName == "ShoppingLists") {
        return {
          headerTitle: "Shopping Lists"
        };
      }

      // TrackItems tab, when the route equals routeName set the headerTitle equal to the specified title
      if (routeName == "TrackItem") {
        return {
          headerTitle: "Find items"
        };
      }
    },
    initialRouteName: "ShoppingLists",
    animationEnabled: true,
    lazy: true,
    barStyle: {
      backgroundColor: "#003249",
      borderTopColor: "#CCDBDC",
      borderWidth: 2,
      borderStyle: "solid"
    },
    shifting: true,
    tabBarOptions: {
      scrollEnabled: true
    }
  }
));
