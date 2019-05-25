// React dependencies
import React, { Component } from "react";

/* 
Project Provider:
- Gives access to the context, defined
- It's exactly like redux's predicatable state container, just this is a native solution as opposed to additional uneeded bloat

Additional information:
- Context provider: https://reactjs.org/docs/context.html#contextprovider
- Redux store: https://redux.js.org/api/store
*/
import { Provider } from "./src/Context.js";

// The exported app container which will decide which route or routes are viewed
import AppContainer from "./src/Routing/Index";

/* 
Styled-Components provider:
- ThemeProvider is a provider for styled-components
- Ths allows styled-components theme styles to be injected into the application
- For more information about the themeprovider visit https://www.styled-components.com/docs/api#themeprovider
*/
import { ThemeProvider } from "styled-components/native";

/* 
React-Native provider:
- Allows pre-build material components to be used
- DefaultTheme is the default theme provided by the react-native-paper team. It's copied and then certain properties are overwritten
- More information about the PaperProvider visit https://callstack.github.io/react-native-paper/getting-started.html
*/
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

/* 
StyledComponentsTheme:
- Contains an object which stores numerous properties which can be accessed from anywhere within the application

Usage:
- Within styled-components use props.theme.[property name] e.g. props.theme.Primary
- Within components which aren't styled-component you will need the withTheme higer-order-component to access the props
*/
const StyledComponentsTheme = {
  Primary: "#003249", // Dark blue
  Secondary: "#CCDBDC", // Light blue/grey
  Tertiary: "#e91e63" // Pink
};

/* 
PaperTheme:
- Contains all the default and custom properties

Usage:
- Use a react-native-paper component such as textinput or IconButton
*/
const PaperTheme = {
  ...DefaultTheme, // Copies the default theme properties
  colors: {
    ...DefaultTheme.colors, // Copies all the default theme colours
    primary: "#e91e63" // Pink
  }
};

export default class App extends Component {
  render() {
    return (
      <Provider>
        <ThemeProvider theme={StyledComponentsTheme}>
          <PaperProvider theme={PaperTheme}>
            <AppContainer />
          </PaperProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}
