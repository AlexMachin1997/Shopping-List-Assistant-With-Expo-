// React dependencies
import React, { Component } from "react";
import { AsyncStorage } from "react-native";

// Stateless components
import Loading from "../Components/UI/States/Loading";

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

export default class IndexScreen extends Component {
  componentDidMount() {
    this.statusCheck();
  }

  /* 
  StatusCheck:
  - Looks for a key named hasVisited
  - If the key exists go mainStack else WelcomeStack 
  - Whilst the action is being performed show the spinner component
  */
  statusCheck = async () => {
    const token = await AsyncStorage.getItem("hasVisited"); // Find the key named userToken
    this.props.navigation.navigate(token ? "MainStack" : "WelcomeStack"); // Terniary operator to decide the stack the user goes to
  };

  render() {
    return (
      <Consumer>
        {value => {
          return <Loading isDark={value.isDark} />;
        }}
      </Consumer>
    );
  }
}
