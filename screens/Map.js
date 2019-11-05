import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as theme from "../theme";

export default class Map extends React.Component {
  state = {
    hours: {}
  };

  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Detected Location</Text>
          <Text style={styles.headerLocation}>San Francisco, US</Text>
        </View>
        <View style={styles.headerIcon}>
          <Ionicons
            name={"md-menu"}
            size={theme.SIZE.icon * 1.5}
            color={theme.COLOR.gray}
          ></Ionicons>
        </View>
      </View>
    );
  }

  renderParking(item) {
    const { hours } = this.state;
    return (
      <View key={`parking -${item.id}`} style={styles.parking}>
        <View style={styles.hours}>
          <Text style={styles.title}>
            x {item.spots} {item.title}
          </Text>
          <View style={styles.hoursBorder}>
            <Text style={styles.title}>5:00 hrs</Text>
          </View>
        </View>
        <View style={styles.parkingInfoContainer}>
          <View style={styles.parkingInfo}>
            <View style={styles.parkingInfoIcon}>
              <Ionicons
                name="md-pricetag"
                size={theme.SIZE.icon}
                color={theme.COLOR.gray}
              ></Ionicons>
              <Text> ${item.price}</Text>
            </View>
            <View style={styles.parkingInfoIcon}>
              <Ionicons
                name="md-star"
                size={theme.SIZE.icon}
                color={theme.COLOR.gray}
              ></Ionicons>
              <Text> {item.rating}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.buy} activeOpacity={0.6}>
            <View style={styles.buyTotal}>
              <Text style={styles.buyButtonText}>${item.price * 2}</Text>
              <Text style={{ color: theme.COLOR.white }}>
                {item.price}x{hours[item.id]} hrs
              </Text>
            </View>
            <View style={styles.buyButton}>
              <Text style={styles.buyButtonText}>></Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderParkings() {
    return (
      <FlatList
        horizontal
        style={styles.parkings}
        scrollEnabled
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={parkingsSpots}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => this.renderParking(item)}
      ></FlatList>
    );
  }

  componentWillMount() {
    const hours = {};

    parkingsSpots.map(parking => {
      hours[parking.id] = 1;
    });

    this.setState({ hours });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {parkingsSpots.map(parking => (
            <Marker
              key={`marker-${parking.id}`}
              coordinate={parking.coordinate}
            >
              <View style={[styles.marker, styles.markerShadow]}>
                <Text style={styles.markerPrice}>${parking.price}</Text>
                <Text style={styles.markerStatus}>
                  ({parking.free}/{parking.spots})
                </Text>
              </View>
            </Marker>
          ))}
        </MapView>
        {this.renderParkings()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 0.5,
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: theme.SIZE.base * 2,
    paddingTop: theme.SIZE.base * 2.5,
    paddingBottom: theme.SIZE.base * 1.5
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center"
  },
  headerTitle: {
    color: theme.COLOR.gray
  },
  headerLocation: {
    fontSize: theme.SIZE.font,
    fontWeight: "500",
    paddingVertical: theme.SIZE.base / 3
  },
  headerIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },

  container: {
    flex: 1,
    backgroundColor: theme.COLOR.white,
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    flexDirection: "row",
    borderColor: theme.COLOR.red,
    borderRadius: theme.SIZE.base * 2,
    paddingVertical: theme.SIZE.base,
    paddingHorizontal: theme.SIZE.base * 2,
    borderWidth: 1
  },
  map: {
    flex: 3,
    width: Dimensions.get("window").width
  },
  marker: {
    flexDirection: "row",
    borderColor: theme.COLOR.red,
    borderRadius: theme.SIZE.base * 2,
    paddingVertical: theme.SIZE.base,
    paddingHorizontal: theme.SIZE.base * 2,
    borderWidth: 1
  },
  markerShadow: {
    shadowColor: theme.COLOR.black,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  markerPrice: { color: theme.COLOR.red, fontWeight: "bold" },
  markerStatus: { color: theme.COLOR.gray },
  parkings: {
    flex: 1,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: theme.SIZE.base * 2,
    paddingBottom: theme.SIZE.base * 2
  },
  parking: {
    flexDirection: "row",
    backgroundColor: theme.COLOR.white,
    borderRadius: 6,
    padding: 15,
    marginHorizontal: theme.SIZE.base * 2,
    width: Dimensions.get("window").width - theme.SIZE.base * 4
  },

  buy: {
    flex: 1.25,
    backgroundColor: theme.COLOR.red,
    borderRadius: 6,
    padding: 8,
    flexDirection: "row"
  },

  hours: { flex: 1, flexDirection: "column" },
  title: { fontSize: theme.SIZE.font },
  hoursBorder: {
    width: 100,
    borderRadius: 6,
    borderColor: theme.COLOR.gray,
    borderWidth: 0.7,
    padding: 4
  },
  parkingInfoContainer: { flex: 1.5, flexDirection: "row" },
  parkingInfo: {
    flex: 0.5,
    justifyContent: "center",
    marginHorizontal: theme.SIZE.base * 2
  },
  parkingInfoIcon: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  buyTotal: {
    flex: 1,
    justifyContent: "center"
  },
  buyButton: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  buyButtonText: { fontSize: theme.SIZE.title, color: theme.COLOR.white }
});

const parkingsSpots = [
  {
    id: 1,
    title: "Parking 1",
    price: 5,
    rating: 4.2,
    spots: 20,
    free: 10,
    coordinate: {
      latitude: 37.78735,
      longitude: -122.4334
    }
  },
  {
    id: 2,
    title: "Parking 2",
    price: 7,
    rating: 3.8,
    spots: 25,
    free: 20,
    coordinate: {
      latitude: 37.78845,
      longitude: -122.4344
    }
  },
  {
    id: 3,
    title: "Parking 3",
    price: 10,
    rating: 4.9,
    spots: 50,
    free: 25,
    coordinate: {
      latitude: 37.78615,
      longitude: -122.4314
    }
  }
];
