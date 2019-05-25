// React dependencies
import React from "react";
import { TouchableOpacity } from "react-native";
import proptypes from "proptypes";

// Component assets
import { MaterialIcons } from "@expo/vector-icons";

// Stateless components
import Text from "../Styled-Components/Text";
import Section from "../Styled-Components/Section";

// Higher-order-components
import { withTheme } from "styled-components";

// {action, isDark, theme, icon, text} = props
const Link = ({ action, isDark, theme, icon, text }) => {
  return (
    <Section
      row
      marginRight={10}
      alignItems="center"
      backgroundColour={isDark ? theme.Primary : theme.Secondary}
    >
      <Section
        marginRight={10}
        backgroundColour={isDark ? theme.Primary : theme.Secondary}
      >
        <MaterialIcons
          name={icon}
          size={50}
          color={isDark ? theme.Secondary : theme.Primary}
        />
      </Section>
      <TouchableOpacity onPress={action}>
        <Section
          marginRight={10}
          backgroundColour={isDark ? theme.Primary : theme.Secondary}
        >
          <Text colour={isDark ? theme.Secondary : theme.Primary}>{text}</Text>
        </Section>
      </TouchableOpacity>
    </Section>
  );
};

/*
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
Link.proptypes = {
  action: proptypes.func.isRequired,
  icon: proptypes.string.isRequired,
  text: proptypes.string.isRequired,
  isDark: proptypes.string.isRequired
};

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
Link.defaultProps = {
  icon: "help-outline",
  text: "Insert text here",
  isDark: false
};

export default withTheme(Link);
