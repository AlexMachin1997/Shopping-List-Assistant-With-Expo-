// React dependencies
import React, { Component } from "react";
import { View, StyleSheet, Vibration, Alert } from "react-native";

// Higher-Order-Components (HOC)
import { NavigationEvents } from "react-navigation";

// Stateless components
import Loading from "../Components/UI/States/Loading";
import { Notifications } from "expo";

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView from "react-native-maps";

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

// location assets
import Locations from "../../supermarkets.json";
import NightMode from "../../assets/GoogleMapsNight.json";

// Utility libraries
import moment from "moment";

// Styled-Components can't provide this so a custom react-native view needed to be provided.
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default class ItemTracking extends Component {
  state = {
    latitude: 0,
    longitude: 0,
    longitudeDelta: 0.009,
    latitudeDelta: 0.009,
    isLoading: true
  };

  // https://www.coursera.org/lecture/react-native/exercise-video-local-notifications-Aoo3t
  obtainNotificationPermission = async () => {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== "granted") {
        Alert.alert("Permission not granted for push notificiations");
      }
    }
    return permission;
  };

  // https://www.coursera.org/lecture/react-native/exercise-video-local-notifications-Aoo3t
  presentLocalNotification = async name => {
    // Makes the phone vibrate for 1 second
    Vibration.vibrate(1000);

    Notifications.presentLocalNotificationAsync({
      title: `Supermarket near by`,
      body: `You are close to ${name}, please check your shopping lists `,
      data: {
        Store: name,
        Date: moment().format("Do MMMM YYYY")
      },
      ios: {
        sound: true
      },
      android: {
        sound: true,
        vibrate: true,
        color: "#512DA8",
        icon: "../../assets/App-Icon.png.png",
        sticky: false
      }
    });
  };

  checkSupermarketLocations = async () => {
    console.log("Checking for supermarkets in your loca area");

    // Old JSON data
    let copyOfSuperMarkets = [...Locations];

    // Filtered data based on the lat and lng from watchPosition()
    // Prevents 5k markers being spawned on the map, which would actually crash it. The app stops responding :(
    let filteredCopyOfSuperMarkets = copyOfSuperMarkets.filter(
      location =>
        this.state.latitude <= location.Lat &&
        this.state.longitude <= location.Lng
    );

    // Shows the current supermarkets in the console
    console.log("Current supermarkets in your area: ");
    console.log(filteredCopyOfSuperMarkets.length);

    // Check the supermarkets and users latitude and longitude
    // FLAW: Whilst the code runs and provides the neccessary ouputs it won't render the map when there are more than 190 marks.
    // SOLUTION: Add a clustering engine, allows the markers to gradually be spawned in. Unable to do it at the moment as Im short on time.
    filteredCopyOfSuperMarkets.map(async data => {
      if (
        this.state.latitude === data.Lat &&
        this.state.longitude === data.Lng
      ) {
        this.presentLocalNotification(data.Store);
      }
    });
  };

  watchLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission to access has been denied");
    }

    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High
      },
      async loc => {
        console.log(loc.coords);
        this.setState(
          {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude
          },
          () => this.checkSupermarketLocations()
        );
      }
    );
  };

  async componentDidMount() {
    // Start to watch the users location
    await this.watchLocation();

    // Permissions for push notifications (Only required for iOS)
    await this.obtainNotificationPermission();

    // Set loading to false
    this.setState(({ isLoading }) => ({
      isLoading: !isLoading
    }));
  }

  render() {
    if (this.state.isLoading || !this.state.latitude || !this.state.longitude) {
      return (
        <Consumer>
          {value => {
            return <Loading isDark={value.isDark} />;
          }}
        </Consumer>
      );
    }

    return (
      <Consumer>
        {value => {
          return (
            <View style={styles.container}>
              <NavigationEvents onDidFocus={this.watchLocation} />

              <MapView
                style={styles.map}
                region={{
                  longitude: this.state.longitude,
                  latitude: this.state.latitude,
                  longitudeDelta: this.state.longitudeDelta,
                  latitudeDelta: this.state.latitudeDelta
                }}
                showsUserLocation={true}
                zoomEnabled={true}
                zoomTapEnabled={true}
                rotateEnabled={true}
                pitchEnabled={true}
                followsUserLocation={true}
                showsCompass={true}
                customMapStyle={value.isDark ? NightMode : []}
                loadingEnabled={this.state.isLoading}
              />
            </View>
          );
        }}
      </Consumer>
    );
  }
}
