//React dependencies
import React from "react";
import propTypes from "proptypes";

// User-Interface Libaries
import { Button } from "react-native-paper";

// {mode, isCompact, colour, style, onClick, label, isDisabled, isDark, text} = props
const Buttons = ({
  mode,
  isCompact,
  colour,
  style,
  onClick,
  label,
  isDisabled,
  isDark,
  text
}) => {
  return (
    <Button
      mode={mode}
      compact={isCompact}
      color={colour}
      contentStyle={style}
      onPress={onClick}
      accessibilityLabel={label}
      disabled={isDisabled}
      dark={isDark}
    >
      {text}
    </Button>
  );
};

/*
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/

Buttons.propTypes = {
  mode: propTypes.string.isRequired,
  isCompact: propTypes.bool.isRequired,
  colour: propTypes.string.isRequired,
  style: propTypes.object,
  onClick: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
  isDisabled: propTypes.bool.isRequired,
  isDark: propTypes.bool.isRequired,
  text: propTypes.string.isRequired
};

export default Buttons;
