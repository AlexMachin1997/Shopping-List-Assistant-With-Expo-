// React dependencies
import React from "react";
import { View } from "react-native";
import proptypes from "proptypes";

// Stateless components
import { FAB, Portal } from "react-native-paper";

// Higher-order-components
import { withTheme } from "styled-components";

// {open, theme, isRenameModalVisible, deleteListAction, addItemAction, onStateChange, icon} = props;
const ActionButtons = ({
  open,
  theme,
  isRenameModalVisible,
  deleteListAction,
  addItemAction,
  onStateChange,
  icon
}) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        margin: 10
      }}
    >
      <Portal>
        <FAB.Group
          open={open}
          fabStyle={{ backgroundColor: theme.Tertiary }}
          icon={icon ? "remove" : "add"}
          actions={[
            {
              icon: "mode-edit",
              label: "Rename list",
              onPress: isRenameModalVisible,
              color: "grey",
              accessibilityLabel: "Rename modal"
            },
            {
              icon: "delete-forever",
              label: "Delete list",
              onPress: deleteListAction,
              color: "grey",
              accessibilityLabel: "Delete the shopping list"
            },
            {
              icon: "add",
              label: "Add item",
              onPress: addItemAction,
              color: "grey",
              accessibilityLabel: "Add an item to the shopping list"
            }
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </View>
  );
};

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
ActionButtons.defaultProps = {
  open: false,
  icon: "add"
};

/*  
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
ActionButtons.proptypes = {
  open: proptypes.bool.isRequired,
  icon: proptypes.string.isRequired,
  isRenameModalVisible: proptypes.func.isRequired,
  deleteListAction: proptypes.func.isRequired,
  addItemAction: proptypes.func.isRequired
};

export default withTheme(ActionButtons);
