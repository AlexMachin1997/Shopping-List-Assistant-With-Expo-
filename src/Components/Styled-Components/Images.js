/* 
Image:
- Import the styled variable from styled-components/native

- Provide the neccessaary props, if none are provided the default props will be used

Usage:
- To use the component iimport it to the screen which it needs to be used on

- Once you have imported the component use it like this example: 
  <Image width={40} height={40} radius={40}/>

- If you need to change the image properties you will need to change them here
*/

// Styled-Components dependencies
import styled from "styled-components/native";

// React dependencies
import proptypes from "proptypes";

const Image = styled.Image`
  width: ${props => props.width}
  height: ${props => props.height}
  border-radius: ${props => props.radius}
`;

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
Image.defaultProps = {
  width: 10,
  height: 10,
  radius: 0
};

/*
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
Image.proptypes = {
  width: proptypes.number.isRequired,
  height: proptypes.number.isRequired,
  radius: proptypes.number.isRequired
};

export default Image;
