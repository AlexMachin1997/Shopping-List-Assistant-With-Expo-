// React dependencies
import React from "react";
import { View } from "react-native";
import proptypes from "proptypes";

// Functionless components
import { FAB } from "react-native-paper";

// Higher-order-components
import { withTheme } from "styled-components";

// {theme, icon, action, colour} = props
const ActionButton = ({ theme, icon, action, colour }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: 10
      }}
    >
      <FAB
        style={{ backgroundColor: theme.Tertiary }}
        large
        icon={icon}
        onPress={action}
        color={colour}
      />
    </View>
  );
};

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
ActionButton.defaultProps = {
  icon: "add",
  colour: "white"
};

/*
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
ActionButton.propTypes = {
  icon: proptypes.string.isRequired,
  action: proptypes.func.isRequired,
  colour: proptypes.string.isRequired
};

export default withTheme(ActionButton);
