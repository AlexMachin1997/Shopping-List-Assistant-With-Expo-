/* 
Section:
- Import the styled variable from styled-components/native

- A generic section to postion children elements using flex-box

- To postion elements the justify-content flex property is used. To postion elements directly in the center the container and section need to be centered with the center prop

Usage:
- To use the component first import it into the screen its being used on, then use it like the example below

<Section row>
  Children elements go here
</Section>

*/

// Styled-Components dependencies
import styled from "styled-components/native";

// React dependencies
import proptypes from "proptypes";

const Section = styled.View`
  flex-direction: ${props => (props.row ? "row" : "column")}
  justify-content: ${props => props.justifyContent}
  align-items: ${props => props.alignItems}
  flex-wrap: ${props => props.flexWrap}
  background-color: ${props => {
    if (props.backgroundColour) {
      return props.backgroundColour;
    } else {
      if (props.isDark) {
        return props.theme.Primary;
      } else {
        return props.theme.Secondary;
      }
    }
  }}
  flex-grow: ${props => props.flexGrow}

  border-width: ${props => props.borderWidth};
  border-style: ${props => props.borderStyle};
  border-color: ${props => props.borderColour};

  padding-top: ${props => props.paddingTop};
  padding-bottom: ${props => props.paddingBottom};
  padding-right: ${props => props.paddingRight};
  padding-left: ${props => props.paddingLeft};

  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  margin-right: ${props => props.marginRight};
  margin-left: ${props => props.marginLeft};
`;

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
Section.defaultProps = {
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexWrap: "wrap",
  flexGrow: 0,

  borderWidth: 0,
  borderStyle: "solid",
  borderColour: "black",

  paddingTop: 0,
  paddingBottom: 0,
  paddingRight: 0,
  paddingLeft: 0,

  marginTop: 0,
  marginBottom: 0,
  marginRight: 0,
  marginLeft: 0
};

/*
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
Section.proptypes = {
  justifyContent: proptypes.string.isRequired,
  alignItems: proptypes.string.isRequired,
  flexWrap: proptypes.string.isRequired,
  backgroundColour: proptypes.string.isRequired,
  flexGrow: proptypes.number.isRequired,
  borderWidth: proptypes.number.isRequired,
  borderStyle: proptypes.string.isRequired,
  borderColour: proptypes.string.isRequired,
  paddingTop: proptypes.number.isRequired,
  paddingBottom: proptypes.number.isRequired,
  paddingLeft: proptypes.number.isRequired,
  paddingRight: proptypes.number.isRequired,
  marginTop: proptypes.number.isRequired,
  marginBottom: proptypes.number.isRequired,
  marginLeft: proptypes.number.isRequired,
  marginRight: proptypes.number.isRequired
};

export default Section;
