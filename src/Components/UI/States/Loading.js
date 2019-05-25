/* 
Spinner:
- Import React and the React-Native activity indicator
- Import the container and section styled-components
- It's a functionless component and only returns a spinner
- The spinner is centered within the screen, when an action such as deciding which stack the user should go to it will be shown

Usage:
- To use the component iimport it to the screen which it needs to be used on

- Once import you can use the component like this example: 
  <Spinner />

- If you need to change the appearence of this component change the size or color props provided by the ActivityIndicator
*/
import React from "react";
import { ActivityIndicator } from "react-native";
import proptypes from "proptypes";

import Section from "../../Styled-Components/Section";

// {isDark} = props
const Loading = ({ isDark }) => {
  return (
    <Section
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      isDark={isDark}
    >
      <ActivityIndicator size="large" color={isDark ? "#CCDBDC" : "#003249"} />
    </Section>
  );
};

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
Loading.defaultProps = {
  isDark: false
};

/*  
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
Loading.proptypes = {
  isDark: proptypes.bool.isRequired
};

export default Loading;
