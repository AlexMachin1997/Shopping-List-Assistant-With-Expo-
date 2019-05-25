// React dependencies
import React from "react";
import proptypes from "proptypes";

// Stateless components
import Section from "../../Styled-Components/Section";
import { H1 } from "../../Styled-Components/Headings";
import Image from "../../Styled-Components/Images";
import Text from "../../Styled-Components/Text";

// Higher-order-components
import { withTheme } from "styled-components";

// {isDark, image, label, theme, heading, overview} = props
const Empty = ({ isDark, image, label, theme, heading, overview }) => {
  return (
    <Section
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      isDark={isDark}
    >
      <Section isDark={isDark}>
        <Image
          source={image}
          accessible={true}
          accessibleLabel={label}
          progressiveRenderingEnabled={true}
          width={150}
          height={150}
          radius={100}
        />
      </Section>

      <Section marginTop={20} isDark={isDark}>
        <H1 align="center" colour={isDark ? theme.Secondary : theme.Primary}>
          {heading}
        </H1>
      </Section>

      <Section marginTop={5} isDark={isDark}>
        <Text align="center" colour={isDark ? theme.Secondary : theme.Primary}>
          {overview}
        </Text>
      </Section>
    </Section>
  );
};

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
Empty.defaultProps = {
  heading: "Please insert a heading",
  overview: "Please insert an overview",
  isDark: false
};

/*  
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
Empty.proptypes = {
  image: proptypes.string.isRequired,
  label: proptypes.string.isRequired,
  heading: proptypes.string.isRequired,
  overview: proptypes.string.isRequired,
  isDark: proptypes.bool.isRequired
};

export default withTheme(Empty);
