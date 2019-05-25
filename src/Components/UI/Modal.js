// Reat dependencies
import React from "react";
import proptypes from "proptypes";

// Stateless components
import { Dialog, Portal } from "react-native-paper";
import Button from "./Buttons";

// Higher-order-components
import { withTheme } from "styled-components";

// {visible, onDismiss, isDark, theme, submitDisabled, onOk, onCancel, children, title} = props
const Modal = ({
  visible,
  onDismiss,
  isDark,
  theme,
  submitDisabled,
  onOk,
  onCancel,
  children,
  title
}) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{
          backgroundColor: isDark ? theme.Primary : theme.Secondary
        }}
      >
        <Dialog.Title
          style={{
            backgroundColor: isDark ? theme.Primary : theme.Secondary,
            color: isDark ? theme.Secondary : theme.Primary
          }}
        >
          {title}
        </Dialog.Title>

        <Dialog.Content>{children}</Dialog.Content>

        <Dialog.Actions>
          <Button
            isCompact={true}
            mode="text"
            text="Cancel"
            colour="#e91e63"
            style={{
              borderRadius: 5
            }}
            label="Cancel action"
            onClick={onCancel}
            isDark={true}
            isDisabled={false}
          />
          <Button
            isCompact={true}
            mode="text"
            text="Ok"
            colour="#e91e63"
            style={{
              borderRadius: 5
            }}
            label="Confirm button"
            onClick={onOk}
            isDark={true}
            isDisabled={submitDisabled}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

/* 
defaultProps:
- Assigns default props to the componet, they only apply when a prop is not provided.
- https://reactjs.org/docs/react-without-es6.html#declaring-default-props
*/
Modal.defaultProps = {
  visible: false,
  title: "Insert title",
  submitDisabled: false
};

/*
Proptype validation
- Validates the data runtime, any invalid props a warning will be shown
- https://reactjs.org/docs/typechecking-with-proptypes.html
*/
Modal.proptypes = {
  visible: proptypes.bool.isRequired,
  onDismiss: proptypes.func.isRequired,
  title: proptypes.string.isRequired,
  children: proptypes.isRequired,
  onCancel: proptypes.func.isRequired,
  onOk: proptypes.func.isRequired,
  submitDisabled: proptypes.bool.isRequired
};

export default withTheme(Modal);
