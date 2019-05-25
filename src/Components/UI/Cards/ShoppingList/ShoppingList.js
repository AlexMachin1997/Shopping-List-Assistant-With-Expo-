// React dependencies
import React from "react";
import { View } from "react-native";

// Stateless components
import { IconButton, ToggleButton, TouchableRipple } from "react-native-paper";
import Section from "../../../Styled-Components/Section";
import { H3 } from "../../../Styled-Components/Headings";
import { withTheme } from "styled-components";

// {toggle, shoppingListTheme, theme, isComplete, name, isDark, deleteAction} = props
const ShoppingList = ({
  toggle,
  shoppingListTheme,
  theme,
  isComplete,
  name,
  isDark,
  deleteAction
}) => {
  return (
    <TouchableRipple onPress={toggle} rippleColor={shoppingListTheme}>
      <Section
        row
        paddingTop={10}
        paddingBottom={10}
        paddingLeft={10}
        paddingRight={10}
        borderRadius={10}
        marginTop={10}
        marginBottom={10}
        marginLeft={10}
        marginRight={10}
        borderWidth={1}
        borderStyle="solid"
        borderColour={isDark ? theme.Secondary : "white"}
        alignItems="center"
        flexWrap="wrap"
        backgroundColour={isDark ? theme.Secondary : "white"}
      >
        <Section
          row
          alignItems="center"
          flexWrap="wrap"
          backgroundColour={isDark ? theme.Secondary : "white"}
        >
          <ToggleButton
            icon={isComplete ? "check-circle" : "radio-button-unchecked"}
            color={isComplete ? "green" : theme.Primary}
            style={{ backgroundColor: "transparent" }}
            value={isComplete}
            status={isComplete ? "checked" : "unchecked"}
            onPress={toggle}
            size={30}
            accessibilityLabel="Toggle the items complete property"
          />
        </Section>

        <View style={{ flex: 1 }}>
          <H3>{name}</H3>
        </View>

        <Section
          row
          alignItems="flex-end"
          flexWrap="wrap"
          backgroundColour={isDark ? theme.Secondary : "white"}
        >
          <IconButton
            icon="delete-forever"
            color="red"
            size={40}
            onPress={deleteAction}
            animated={true}
            style={{ margin: 0 }}
            accessibilityLabel="Delete item"
          />
        </Section>
      </Section>
    </TouchableRipple>
  );
};

export default withTheme(ShoppingList);
