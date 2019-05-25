/* 
Headings:
- Import the styled variable from styled-components/native

- All the heading sizes were gathered from https://www.w3schools.com/tags/tag_hn.asp

- The untis showed by W3C isn't supported, so they have been converted to pixels (Yucks!!!!!!!!!) 

Usage:
- To use the component iimport it to the screen which it needs to be used on

- Once you have imported the component use it like this example: 
  <H1 colour="black" align="right">Hello Im a H1</H1>

- If you need to change the heading sizes change them here and it will be reflected throughout the rest of the application
*/

// Styled-Components dependencies
import styled from "styled-components/native";

// React dependencies
import proptypes from "proptypes";

// Web standard sizes for h1
export const H1 = styled.Text`
  font-size: 32px;
  color: ${props => props.colour};
  text-align: ${props => props.align};
  text-decoration: ${props => props.textDecorationLine};
`;

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
H1.defaultProps = {
  colour: "black",
  align: "left",
  textDecorationLine: "none"
};

/*
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
H1.proptypes = {
  colour: proptypes.string.isRequired,
  align: proptypes.string.isRequired,
  textDecorationLine: proptypes.string.isRequired
};

// Web standard sizes for h2
export const H2 = styled.Text`
  font-size: 24px;
  color: ${props => props.colour};
  text-decoration: ${props => props.textDecorationLine};
`;

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
H2.defaultProps = {
  colour: "black",
  align: "left",
  textDecorationLine: "none"
};

/*
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
H2.proptypes = {
  colour: proptypes.string.isRequired,
  align: proptypes.string.isRequired,
  textDecorationLine: proptypes.string.isRequired
};

// Web standard sizes for h3
export const H3 = styled.Text`
  font-size: 18.72px;
  color: ${props => props.colour};
  text-decoration: ${props => props.textDecorationLine};
`;

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
H3.defaultProps = {
  colour: "black",
  align: "left",
  textDecorationLine: "none"
};

/*
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
H3.proptypes = {
  colour: proptypes.string.isRequired,
  align: proptypes.string.isRequired,
  textDecorationLine: proptypes.string.isRequired
};

// Web standard sizes for  h4
export const H4 = styled.Text`
  font-size: 16px;
  color: ${props => props.colour};
  text-decoration: ${props => props.textDecorationLine};
`;

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
H4.defaultProps = {
  colour: "black",
  align: "left",
  textDecorationLine: "none"
};

/*
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
H4.proptypes = {
  colour: proptypes.string.isRequired,
  align: proptypes.string.isRequired,
  textDecorationLine: proptypes.string.isRequired
};

// Web standard sizes for h5
export const H5 = styled.Text`
  font-size: 13.28px;
  color: ${props => props.colour};
  text-decoration: ${props => props.textDecorationLine};
`;

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
H5.defaultProps = {
  colour: "black",
  align: "left",
  textDecorationLine: "none"
};

/*
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
H5.proptypes = {
  colour: proptypes.string.isRequired,
  align: proptypes.string.isRequired,
  textDecorationLine: proptypes.string.isRequired
};

// Web standard sizes for 56
export const H6 = styled.Text`
  font-size: 12px;
  color: ${props => props.colour};
  text-decoration: ${props => props.textDecorationLine};
`;

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
H6.defaultProps = {
  colour: "black",
  align: "left",
  textDecorationLine: "none"
};

/*
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
H6.proptypes = {
  colour: proptypes.string.isRequired,
  align: proptypes.string.isRequired,
  textDecorationLine: proptypes.string.isRequired
};
