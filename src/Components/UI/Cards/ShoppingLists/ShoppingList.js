// React dependencies
import React from "React";
import proptypes from "proptypes";

// Stateless components
import Section from "../../../Styled-Components/Section";
import Text from "../../../Styled-Components/Text";
import { TouchableRipple } from "react-native-paper";

// {action, background, title} = props
const ShoppingList = ({ action, background, title }) => {
  return (
    <TouchableRipple onPress={action} rippleColor={background}>
      <Section
        row
        justifyContent="space-between"
        backgroundColour={background}
        borderWidth={1}
        borderStyle="solid"
        borderColour={background}
        paddingTop={20}
        paddingBottom={20}
        paddingLeft={10}
        paddingRight={10}
        borderRadius={10}
        marginTop={10}
        marginBottom={10}
        marginLeft={10}
        marginRight={10}
        flexGrow={1}
      >
        <Section
          alignItems="center"
          backgroundColour={background}
          flexWrap="nowrap"
        >
          <Text size="20px" colour="white">
            {title}
          </Text>
        </Section>
      </Section>
    </TouchableRipple>
  );
};

/*  
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
ShoppingList.proptypes = {
  action: proptypes.func.isRequired,
  background: proptypes.string.isRequired,
  title: proptypes.string.isRequired,
  overview: proptypes.string.isRequired
};

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
ShoppingList.defaultProps = {
  background: "blue",
  title: "Please provide a title",
  overview: "Please provide an overview"
};

export default ShoppingList;
