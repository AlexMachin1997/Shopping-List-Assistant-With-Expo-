// React dependencies
import React, { Component } from "react";
import { ScrollView, AsyncStorage, Alert } from "react-native";

// Higher-Order-Components (HOC)
import { withTheme } from "styled-components";

// Stateless components
import Section from "../Components/Styled-Components/Section";
import Text from "../Components/Styled-Components/Text";
import Button from "../Components/UI/Buttons";
import { Switch, Divider } from "react-native-paper";
import Modal from "../Components/UI/Modal";
import HeaderIcon from "../Components/Navigation/HeaderIcon";

/*
Context API Consumer:
- Wraps the entire component, Consumer then renders the children (This components JSX)
- When using the <Consumer> component you can access the value which has access to the entire state and the dispatch method

Usage:

<Consumer>
  {value => {
    <Text colour={value.isDark : "White" : "Black"}> Hello </Text>
  }}
</Consumer>
*/
import { Consumer } from "../Context";

class Settings extends Component {
  state = {
    isDeleteShoppingListsModalVisible: false
  };

  // Overrides the shared header styles
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Settings",
      headerRight: null,
      headerLeft: (
        <HeaderIcon
          icon="arrow-back"
          action={() => navigation.goBack()}
          marginLeft={10}
        />
      )
    };
  };

  render() {
    return (
      <Consumer>
        {value => {
          return (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: value.isDark
                  ? this.props.theme.Primary
                  : this.props.theme.Secondary
              }}
            >
              <Modal
                isDark={value.isDark}
                visible={this.state.isDeleteShoppingListsModalVisible}
                title="Delete shopping lists"
                onDismiss={() =>
                  this.setState({
                    isDeleteShoppingListsModalVisible: !this.state
                      .isDeleteShoppingListsModalVisible
                  })
                }
                onCancel={() =>
                  this.setState({
                    isDeleteShoppingListsModalVisible: !this.state
                      .isDeleteShoppingListsModalVisible
                  })
                }
                onOk={async () => {
                  /*
                  Callback approach:
                  - Instead of initalising a seperately variable and then pushing the variable is intalized in the callback
                  - Await for the set to be set (IMPORTANT)
                  - Without waiting the state wouldn't update in time.
                  */
                  await this.setState(
                    ({ isDeleteShoppingListsModalVisible }) => ({
                      isDeleteShoppingListsModalVisible: !isDeleteShoppingListsModalVisible
                    })
                  );

                  //
                  await AsyncStorage.removeItem("ShoppingLists");

                  // Sends an alert message (Used instead of push notifications)
                  Alert.alert(
                    "Success",
                    "Your shopping lists have been cleared",
                    [
                      {
                        text: "OK",
                        onPress: () => console.log("Shopping lists cleared")
                      }
                    ],

                    // Allows you to click outside the alert to close it.
                    { cancelable: true }
                  );
                }}
                submitDisabled={false}
              >
                <Text
                  colour={
                    value.isDark
                      ? this.props.theme.Secondary
                      : this.props.theme.Primary
                  }
                  size="20px"
                >
                  Are you sure you want to delete all of your shopping lists ?
                </Text>
              </Modal>

              <Section
                row
                isDark={value.isDark}
                paddingTop={10}
                paddingBottom={10}
                paddingLeft={10}
                paddingRight={10}
                marginTop={10}
                marginBottom={10}
                marginLeft={10}
                marginRight={10}
                alignItems="center"
              >
                <Text
                  colour={
                    value.isDark
                      ? this.props.theme.Secondary
                      : this.props.theme.Primary
                  }
                >
                  Night mode
                </Text>

                <Section
                  flexGrow={1}
                  alignItems="flex-end"
                  backgroundColour="transparent"
                >
                  <Switch
                    value={value.isDark}
                    onValueChange={async () => {
                      // Destructuring the dispatch function from the value object
                      const { dispatch } = value;

                      // Updates the context API state
                      await dispatch({
                        type: "SET_THEME_MODE",
                        payload: value.isDark
                      });

                      // Set isDakr equal to the inverted value
                      await AsyncStorage.setItem(
                        "isDark",
                        JSON.stringify(!value.isDark)
                      );
                    }}
                    color={this.props.theme.Tertiary}
                    style={{ marginLeft: 10 }}
                  />
                </Section>
              </Section>

              <Divider
                style={{
                  backgroundColor: value.isDark
                    ? this.props.theme.Secondary
                    : this.props.theme.Primary,
                  height: 1
                }}
              />

              <Section
                row
                isDark={value.isDark}
                paddingTop={10}
                paddingBottom={10}
                paddingLeft={10}
                paddingRight={10}
                marginTop={10}
                marginBottom={10}
                marginLeft={10}
                marginRight={10}
                alignItems="center"
              >
                <Text
                  colour={
                    value.isDark
                      ? this.props.theme.Secondary
                      : this.props.theme.Primary
                  }
                >
                  Clear shopping lists
                </Text>
                <Section
                  flexGrow={1}
                  alignItems="flex-end"
                  backgroundColour="transparent"
                >
                  <Button
                    isCompact={true}
                    mode="contained"
                    text="Delete"
                    colour={this.props.theme.Tertiary}
                    label="Delete shopping lists"
                    onClick={() =>
                      this.setState({
                        isDeleteShoppingListsModalVisible: true
                      })
                    }
                    isDark={true}
                    isDisabled={false}
                  />
                </Section>
              </Section>
            </ScrollView>
          );
        }}
      </Consumer>
    );
  }
}

export default withTheme(Settings);
