// React-Navigation dependencies
import { createAppContainer, createSwitchNavigator } from "react-navigation";

// React-Navigation Stacks
import Loading from "../Screens/Index";
import WelcomeStack from "./WelcomeStack";
import MainStack from "./MainStack";

// SwitchNavigator - conditionally loads based on what happens in Loading
const SwitchNavigator = createSwitchNavigator(
  {
    Loading: Loading, // Inital route, decided if you have visited the app before or not
    WelcomeStack: WelcomeStack, // If your new go to the WelcomeStack
    MainStack: MainStack // customDrawerNavigator component renders, MainStack routes11
  },
  {
    initialRouteName: "Loading" // Inital route for the switch navigator
  }
);

// Returns in the index screen
const AppContainer = createAppContainer(SwitchNavigator); // Creates the react-navigation wrapper for the application (Required for React-Naviga)

export default AppContainer; // Exporting the container for use within the App.js file
