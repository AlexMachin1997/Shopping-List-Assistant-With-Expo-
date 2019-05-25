// React dependencies
import React, { Component } from "react";
import { AsyncStorage } from "react-native";

// Stateless components
import Image from "../Components/Styled-Components/Images";
import Onboarding from "react-native-onboarding-swiper";

// Higr-Order-Components (HOC)
import { withTheme } from "styled-components";

class Welcome extends Component {
  generateToken = async () => {
    await AsyncStorage.setItem("hasVisited", "true");
    this.props.navigation.navigate("MainStack");
  };

  render() {
    return (
      <Onboarding
        skipToPage={3}
        onDone={this.generateToken}
        transitionAnimationDuration={100}
        subTitleStyles={{ fontSize: 20 }}
        pages={[
          {
            backgroundColor: this.props.theme.Secondary,
            image: (
              <Image
                source={require("../../assets/ShoppingList.png")}
                width={200}
                height={200}
              />
            ),
            title: "Keep track of your items",
            subtitle:
              "You can maintain multiple shopping lists, you can have one for each store you visit"
          },
          {
            backgroundColor: this.props.theme.Secondary,
            image: (
              <Image
                source={require("../../assets/ItemTracking.png")}
                width={200}
                height={200}
              />
            ),
            title: "Locate supermarkets",
            subtitle:
              "Track your local supermarkets (Requires location permission)"
          },
          {
            backgroundColor: this.props.theme.Secondary,
            image: (
              <Image
                source={require("../../assets/Customise.png")}
                width={200}
                height={200}
              />
            ),
            title: "Day and night theme",
            subtitle: "Switch between a day and night theme in the settings"
          },
          {
            backgroundColor: this.props.theme.Secondary,
            image: (
              <Image
                source={require("../../assets/Done.png")}
                width={200}
                height={200}
              />
            ),
            title: "Are you ready ?",
            subtitle:
              "You have completed the tutorial, you can now start using the shopping list assistant"
          }
        ]}
      />
    );
  }
}

export default withTheme(Welcome);
