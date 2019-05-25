// React dependencies
import React, { Component } from "react";
import { ScrollView } from "react-native";

// Component assets
import ApplicationIcon from "../../../assets/App-Icon.png";

// Higer-order-components
import { withTheme } from "styled-components";

// Stateless components
import Link from "./Links";
import Image from "../Styled-Components/Images";
import Section from "../Styled-Components/Section";

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
import { Consumer } from "../../Context";

class Drawer extends Component {
  state = {
    logoutModal: false,
    success: ""
  };

  render() {
    const { navigate } = this.props.navigation;
    const { theme } = this.props;

    return (
      <Consumer>
        {value => {
          return (
            <ScrollView
              contentContainerStyle={{
                backgroundColor: value.isDark ? theme.Primary : theme.Secondary,
                flex: 1
              }}
            >
              <Section
                paddingTop={50}
                paddingBottom={50}
                justifyContent="center"
                alignItems="center"
                isDark={value.isDark}
              >
                <Image source={ApplicationIcon} height={120} width={120} />
              </Section>

              <Section
                paddingBottom={40}
                justifyContent="flex-start"
                alignItems="flex-start"
                flexWrap="wrap"
                flexGrow={0}
                isDark={value.isDark}
              >
                <Link
                  action={() => navigate("Tabs")}
                  icon="format-list-bulleted"
                  text="Shopping lists"
                  isDark={value.isDark}
                />
              </Section>

              <Section
                paddingBottom={40}
                justifyContent="flex-start"
                alignItems="flex-start"
                flexWrap="wrap"
                flexGrow={0}
                isDark={value.isDark}
              >
                <Link
                  action={() => navigate("Settings")}
                  icon="settings"
                  text="Settings"
                  isDark={value.isDark}
                />
              </Section>
            </ScrollView>
          );
        }}
      </Consumer>
    );
  }
}

export default withTheme(Drawer);
