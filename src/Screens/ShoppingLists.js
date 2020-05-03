// React dependencies
import React, { Component } from "react";
import { ScrollView } from "react-native";

// Screen Icon
import EmptyIcon from "../../assets/Shocked.png";

// Higher-order-components
import { withTheme } from "styled-components";
import { NavigationEvents } from "react-navigation";

// Stateless components
import Empty from "../Components/UI/States/Empty";
import ActionButton from "../Components/UI/Action-Blocks/ActionButton";
import Modal from "../Components/UI/Modal";
import ShoppingListCard from "../Components/UI/Cards/ShoppingLists/ShoppingList";
import Loading from "../Components/UI/States/Loading";
import { TextInput } from "react-native-paper";

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
import { getItem, setItem } from "../Utils/AsyncStorage";

// Utility libraries
import shortid from "shortid";
import moment from "moment";
import { Asset } from "expo-asset";

class ShoppingLists extends Component {
  state = {
    IsCreateShoppingModalVisible: false,
    isLoading: true,
    shoppingListName: "",
    shoppingLists: [],
    shoppingListTheme: "",
  };

  fetchShoppingLists = async () => {
    this.setState(({ isLoading }) => ({
      isLoading: isLoading,
    }));

    // Async/Await is required or the function returns undefined and it wouldn't be able to map through the state
    const value = await getItem("ShoppingLists");

    // Check for a valid response ie the shopping lists must exist
    if (value) {
      this.setState({
        shoppingLists: value,
        isLoading: false,
      });
    } else {
      this.setState({
        shoppingLists: [],
        isLoading: false,
      });
    }
  };

  componentDidMount() {
    this.fetchShoppingLists();
  }

  /*
	handleChange:
	- Generic state handler
	- Only works for single state props like ShoppingListName for example
	*/
  handleChange = async (id, value) => {
    this.setState({
      [id]: value,
    });
  };

  createShoppingList = async () => {
    /*
    Callback approach:
    - Instead of initalising a seperately variable and then pushing the variable is intalized in the callback
    - Await for the data to be set (IMPORTANT)
    - Without waiting the state wouldn't update in time.
    - Add the new shopping list to the beginning of the array
    - This sets the isLoading to true whilst the shopping list is being created
    */
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading,
    }));

    /*
    shoppingListThemes:
    - The material colours defined above are added to the array to form an array of strings
    - They are originally seperate variables as remebering all the colours became a task
    - The array is used below, it selects a random number * the length of this array e.g #2196f3
    */
    // Material colours
    const red = "#e53935"; // Red with a shade of 500
    const green = "#43a047"; // Green with a shade of 500
    const blue = "#2196f3"; // Blue with a shade of 500
    const purple = "#9c27b0"; // Purple with a shade of 500

    const shoppingListThemes = [red, blue, green, purple];
    let randomTheme =
      shoppingListThemes[Math.floor(Math.random() * shoppingListThemes.length)];

    try {
      let shoppingListData = {
        id: shortid.generate(),
        name: this.state.shoppingListName,
        createdOn: moment().format("Do MMMM YYYY"),
        shoppingListTheme: randomTheme,
        items: [],
      };

      this.setState(
        {
          shoppingLists: [...this.state.shoppingLists, shoppingListData],
          IsCreateShoppingModalVisible: false,
          shoppingListName: "",
          isShoppingListNameFocussed: false,
          isLoading: false,
        },
        async () => await setItem("ShoppingLists", this.state.shoppingLists)
      );
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Consumer>
          {(value) => {
            return <Loading isDark={value.isDark} />;
          }}
        </Consumer>
      );
    }

    return (
      <Consumer>
        {(value) => {
          return (
            <>
              <NavigationEvents onDidFocus={() => this.fetchShoppingLists()} />

              <Modal
                isDark={value.isDark}
                visible={this.state.IsCreateShoppingModalVisible}
                title="Create a shopping list"
                onDismiss={() =>
                  this.setState({
                    IsCreateShoppingModalVisible: !this.state
                      .IsCreateShoppingModalVisible,
                  })
                }
                onCancel={() =>
                  this.setState({
                    IsCreateShoppingModalVisible: !this.state
                      .IsCreateShoppingModalVisible,
                    shoppingListName: "",
                  })
                }
                onOk={this.createShoppingList}
                submitDisabled={this.state.shoppingListName < 1 ? true : false}
              >
                <TextInput
                  placeholder="Enter a shopping list name"
                  value={this.state.text}
                  onChangeText={(value) =>
                    this.handleChange("shoppingListName", value)
                  }
                  underlineColor="transparent"
                  mode="flat"
                />
              </Modal>

              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  backgroundColor: value.isDark
                    ? this.props.theme.Primary
                    : this.props.theme.Secondary,
                }}
              >
                {this.state.shoppingLists.length < 1 ? (
                  <Empty
                    image={EmptyIcon}
                    label="No shipping lists exist"
                    heading="No shopping lists exist"
                    overview="Why not try adding one ?"
                    isDark={value.isDark}
                  />
                ) : (
                  this.state.shoppingLists.map((data, index) => {
                    return (
                      <ShoppingListCard
                        key={index}
                        title={data.name}
                        background={data.shoppingListTheme}
                        action={() =>
                          // Passing data to the ShoppingList component
                          this.props.navigation.navigate("ShoppingList", {
                            ShoppingList: data,
                            title: data.name,
                          })
                        }
                      />
                    );
                  })
                )}
              </ScrollView>

              <ActionButton
                colour="white"
                icon={
                  this.state.IsCreateShoppingModalVisible ? "remove" : "add"
                }
                action={() =>
                  this.setState({
                    IsCreateShoppingModalVisible: true,
                  })
                }
              />
            </>
          );
        }}
      </Consumer>
    );
  }
}

export default withTheme(ShoppingLists);
