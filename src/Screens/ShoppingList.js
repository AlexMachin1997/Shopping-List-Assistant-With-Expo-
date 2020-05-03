// React dependencies
import React, { Component } from "react";
import { ScrollView } from "react-native";

// Higher-Order-Components (HOC)
import { withTheme } from "styled-components";

// Stateless components
import { TextInput } from "react-native-paper";
import Loading from "../Components/UI/States/Loading";
import Modal from "../Components/UI/Modal";
import Empty from "../Components/UI/States/Empty";
import ActionButtons from "../Components/UI/Action-Blocks/ActionButtons";
import SingleShoppingList from "../Components/UI/Cards/ShoppingList/ShoppingList";
import Text from "../Components/Styled-Components/Text";
import HeaderIcon from "../Components/Navigation/HeaderIcon";

// Screen assets
import EmptyIcon from "../../assets/Shopping-Basket.png";

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

class ShoppingList extends Component {
  state = {
    isFloatingActionButtonsVisible: false,
    isAddItemsModalVisible: false,
    isRenameShoppingListModalVisible: false,
    isLoading: true,
    isDeleteShoppingListModalVisible: false,
    currentShoppingList: {},
    shoppingLists: [],
    itemName: "",
    newShoppingListName: "",
  };

  async componentDidMount() {
    // Set the current shopping list based on the data passed
    this.setState({
      currentShoppingList: this.props.navigation.getParam("ShoppingList"), // Fetchs the React-Navigation param defined when the route was navigated to
    });

    // Fetching all shopping lists from AsyncStorage
    const value = await getItem("ShoppingLists");
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
  }

  // handleChange('isLoading', true)
  handleChange = async (id, value) => {
    this.setState({
      [id]: value,
    });
  };

  updateShoppingList = async () => {
    this.state.shoppingLists.map(async (data, index) => {
      if (data.id === this.state.currentShoppingList.id) {
        // Copy the current shopping lists
        let CurrentshoppingLists = [...this.state.shoppingLists];

        // Start at the shopping list index, remove 1 element, replace it with the updated shopping list
        CurrentshoppingLists.splice(index, 1, this.state.currentShoppingList);

        // Update the state
        this.setState(
          {
            shoppingLists: CurrentshoppingLists,
          },
          // Update shopping lists array
          async () => await setItem("ShoppingLists", this.state.shoppingLists)
        );
      } else {
        return data;
      }
    });
  };

  addItem = async () => {
    //Hide the isAddItemsModalVisible:
    this.setState(({ isAddItemsModalVisible }) => ({
      isAddItemsModalVisible: !isAddItemsModalVisible,
    }));

    let shoppingListItemData = {
      id: shortid.generate(),
      name: this.state.itemName,
      createdOn: moment().format("Do MMMM YYYY"),
      completed: false,
    };

    // Copy the current shopping list data (Don't directly modify the data)
    let copiedCurrentShoppingList = { ...this.state.currentShoppingList };

    // Pushing the new item onto the copiedCurrentShoppingList.items arrary
    copiedCurrentShoppingList.items.push(shoppingListItemData);

    // Overwrites the currentShoppingList data with the copiedCurrentShoppingList
    // Updates the current directory, important for causing a re-render of the UI (IMPORTANT)
    this.setState(
      {
        currentShoppingList: copiedCurrentShoppingList,
        itemName: "",
      },
      async () => await this.updateShoppingList()
    );
  };

  deleteItem = async (id) => {
    // Copy the current shopping list data (Don't directly modify the data)
    let copiedCurrentShoppingList = { ...this.state.currentShoppingList };

    /*
    findIndex:
    - Finds the index based on the id
    - Requires 1 argument, an array item e.g. {name: "Beans", completed: false}
    - Returns an index, but if there is no index it will return -1 (RACE CONDITION)
    */
    let indexOfItem = await copiedCurrentShoppingList.items.findIndex(
      (item) => item.id === id
    );

    await copiedCurrentShoppingList.items.splice(indexOfItem, 1);

    this.setState(
      {
        CurrentshoppingLists: copiedCurrentShoppingList,
      },
      async () => await this.updateShoppingList()
    );
  };

  updateShoppingListName = async () => {
    // Hide the isRenameShoppingListModalVisible
    this.setState(({ isRenameShoppingListModalVisible }) => ({
      isRenameShoppingListModalVisible: !isRenameShoppingListModalVisible,
    }));

    // Copy the current shopping list data (Don't directly modify the data)
    let copiedCurrentShoppingList = { ...this.state.currentShoppingList };

    // Set the modified objects name equal to the value from the modal input
    copiedCurrentShoppingList.name = this.state.newShoppingListName;

    // Update the current shopping list state and internal storage
    this.setState(
      {
        currentShoppingList: copiedCurrentShoppingList,
      },
      async () => {
        // Update the title param
        this.props.navigation.setParams({
          title: this.state.currentShoppingList.name,
        });

        // Update the shopping list in the devices storage
        await this.updateShoppingList();
      }
    );
  };

  toggleComplete = async (id) => {
    // Copy the current shopping list data (Don't directly modify the data)
    let copiedCurrentShoppingList = { ...this.state.currentShoppingList };

    /*
    findIndex:
    - Finds the index based on the id
    - Requires 1 argument, an array item e.g. {name: "Beans", completed: false}
    - Returns an index, but if there is no index it will return -1

    */
    let indexOfItem = await copiedCurrentShoppingList.items.findIndex(
      (item) => item.id === id
    );
    let item = copiedCurrentShoppingList.items[indexOfItem];
    item.completed = !item.completed;

    await copiedCurrentShoppingList.items.splice(indexOfItem, 1, item);

    this.setState({
      CurrentshoppingLists: copiedCurrentShoppingList,
    });

    this.updateShoppingList();
  };

  deleteShoppingList = async (id) => {
    this.setState(({ isDeleteShoppingListModalVisible }) => ({
      isDeleteShoppingListModalVisible: !isDeleteShoppingListModalVisible,
    }));

    // Copy current list
    let copiedCurrentShoppingLists = [...this.state.shoppingLists];

    // Find the index of them
    let indexOfShoppingList = copiedCurrentShoppingLists.findIndex(
      (list) => list.id == id
    );

    copiedCurrentShoppingLists.splice(indexOfShoppingList, 1);

    // Update the shopping lists
    setItem("ShoppingLists", copiedCurrentShoppingLists);

    // Redirect
    this.props.navigation.navigate("Tabs");
  };

  /*
  navigationOptions:
  - These are the inital properties, they will be updated
  - Has access to the navigation object, which allows the params to be accessed
  - For more information regurarding the header: https://reactnavigation.org/docs/en/headers.html
  - For information regurarding the navigation prop: https://reactnavigation.org/docs/en/navigation-prop.html#docsNav
  */
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      headerRight: null,
      headerLeft: (
        <HeaderIcon
          icon="arrow-back"
          action={() => navigation.goBack()}
          marginLeft={10}
        />
      ),
    };
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
              <ActionButtons
                open={this.state.isFloatingActionButtonsVisible}
                icon={this.state.isFloatingActionButtonsVisible}
                isRenameModalVisible={() =>
                  this.setState({
                    isRenameShoppingListModalVisible: true,
                    newShoppingListName: this.state.currentShoppingList.name,
                  })
                }
                deleteListAction={() =>
                  this.setState({
                    isDeleteShoppingListModalVisible: !this.state
                      .isDeleteShoppingListModalVisible,
                  })
                }
                addItemAction={() =>
                  this.setState({
                    isAddItemsModalVisible: true,
                  })
                }
                onStateChange={() =>
                  this.setState({
                    isFloatingActionButtonsVisible: !this.state
                      .isFloatingActionButtonsVisible,
                  })
                }
              />
              <Modal
                visible={this.state.isAddItemsModalVisible}
                title="Create an item"
                onDismiss={() =>
                  this.setState({
                    isAddItemsModalVisible: !this.state.isAddItemsModalVisible,
                  })
                }
                onCancel={() =>
                  this.setState({
                    isAddItemsModalVisible: !this.state.isAddItemsModalVisible,
                    itemName: "",
                  })
                }
                onOk={() => this.addItem()}
                submitDisabled={this.state.itemName < 1 ? true : false}
                isDark={value.isDark}
              >
                <TextInput
                  placeholder="Enter an item name"
                  value={this.state.itemName}
                  onChangeText={(value) => this.handleChange("itemName", value)}
                  underlineColor="transparent"
                  mode="flat"
                />
              </Modal>

              <Modal
                visible={this.state.isRenameShoppingListModalVisible}
                title="Renaming Shopping list"
                onDismiss={() =>
                  this.setState({
                    isRenameShoppingListModalVisible: !this.state
                      .isRenameShoppingListModalVisible,
                    newShoppingListName: "",
                  })
                }
                onCancel={() =>
                  this.setState({
                    isRenameShoppingListModalVisible: !this.state
                      .isRenameShoppingListModalVisible,
                    newShoppingListName: "",
                  })
                }
                onOk={() => this.updateShoppingListName()}
                submitDisabled={
                  this.state.newShoppingListName < 1 ? true : false
                }
                isDark={value.isDark}
              >
                <TextInput
                  placeholder="Enter an item name"
                  value={this.state.newShoppingListName}
                  onChangeText={(value) =>
                    this.handleChange("newShoppingListName", value)
                  }
                  underlineColor="transparent"
                  mode="flat"
                />
              </Modal>

              <Modal
                visible={this.state.isDeleteShoppingListModalVisible}
                title="Delete list confirmation"
                onDismiss={() =>
                  this.setState({
                    isDeleteShoppingListModalVisible: !this.state
                      .isDeleteShoppingListModalVisible,
                  })
                }
                onCancel={() =>
                  this.setState({
                    isDeleteShoppingListModalVisible: !this.state
                      .isDeleteShoppingListModalVisible,
                  })
                }
                onOk={() =>
                  this.deleteShoppingList(this.state.currentShoppingList.id)
                }
                submitDisabled={false}
                isDark={value.isDark}
              >
                <Text
                  size="19px"
                  colour={
                    value.isDark
                      ? this.props.theme.Secondary
                      : this.props.theme.Primary
                  }
                >
                  Looks like you want to delete the shopping list. Are you sure
                  ?
                </Text>
              </Modal>

              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  backgroundColor: value.isDark
                    ? this.props.theme.Primary
                    : this.props.theme.Secondary,
                  paddingBottom: 70,
                }}
              >
                {this.state.currentShoppingList.items.length < 1 ? (
                  <Empty
                    image={EmptyIcon}
                    label="No shopping list items exist"
                    heading="No shopping list items exist"
                    overview="Why not try adding one ?"
                    isDark={value.isDark}
                  />
                ) : (
                  this.state.currentShoppingList.items.map((data, index) => {
                    return (
                      <SingleShoppingList
                        key={index}
                        toggle={() => this.toggleComplete(data.id)}
                        isComplete={data.completed}
                        name={data.name}
                        deleteAction={() => this.deleteItem(data.id)}
                        isDark={value.isDark}
                        shoppingListTheme={
                          this.state.currentShoppingList.shoppingListTheme
                        }
                      />
                    );
                  })
                )}
              </ScrollView>
            </>
          );
        }}
      </Consumer>
    );
  }
}

export default withTheme(ShoppingList);
