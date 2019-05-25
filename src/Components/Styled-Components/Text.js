/* 
Text:
- Import the styled variable from styled-components/native

- Provide the neccessaary props, if none are provided the default props will be used


Usage:
- To use the component first import it into the screen its being used on, then use it like the example below:

<Text size="40px" colour="red" align="right"> Hello </Text>
*/

// Styled-Components dependencies
import styled from "styled-components/native";

// React dependencies
import proptypes from "proptypes";

const Text = styled.Text`
  font-size: ${props => props.size};
  color: ${props => props.colour};
  text-align: ${props => props.align};
`;

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
Text.defaultProps = {
  size: "25px",
  colour: "black",
  align: "left"
};

/*
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
Text.proptypes = {
  size: proptypes.number.isRequired,
  colour: proptypes.string.isRequired,
  align: proptypes.string.isRequired
};

export default Text;
