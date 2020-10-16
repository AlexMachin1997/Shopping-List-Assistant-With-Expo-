// React-navigation dependencies
import { createStackNavigator } from 'react-navigation-stack';

//Import screens here
import WelcomeScreen from "../Screens/Welcome";

export default (GuestStack = createStackNavigator(
  {
    Welcome: WelcomeScreen
  },
  {
    initialRouteName: "Welcome",
    headerMode: "null"
  }
));
