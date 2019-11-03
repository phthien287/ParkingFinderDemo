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

export default class Map extends React.Component {
  state = {
    hours: {}
  };

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text> Header </Text>
      </View>
    );
  }

  renderParking(item) {
    const { hours } = this.state;
    return (
      <View key={`parking -${item.id}`} style={styles.parking}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={{ fontSize: 16 }}>
            x {item.spots} {item.title}
          </Text>
          <View
            style={{
              width: 100,
              borderRadius: 6,
              borderColor: "grey",
              borderWidth: 0.7,
              padding: 4
            }}
          >
            <Text style={{ fontSize: 16 }}>5:00 hrs</Text>
          </View>
        </View>
        <View style={{ flex: 1.5, flexDirection: "row" }}>
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              marginHorizontal: 24
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Ionicons name="md-pricetag" size={16} color="#70818A"></Ionicons>
              <Text> ${item.price}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
              }}
            >
              <Ionicons name="md-star" size={16} color="#70818A"></Ionicons>
              <Text> {item.rating}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.buy} activeOpacity={0.6}>
            <View
              style={{
                flex: 1,
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 25, color: "white" }}>
                ${item.price * 2}
              </Text>
              <Text style={{ color: "white" }}>
                {item.price}x{hours[item.id]} hrs
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 25, color: "white" }}>></Text>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    flex: 3,
    width: Dimensions.get("window").width
  },
  header: {
    flex: 0.5,
    justifyContent: "center"
  },
  parking: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 6,
    padding: 15,
    marginHorizontal: 24,
    width: Dimensions.get("window").width - 48
  },
  parkings: {
    // alignContent: "flex-end",
    flex: 1,
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 24
  },
  buy: {
    flex: 1.25,
    backgroundColor: "#D83C54",
    borderRadius: 6,
    padding: 8,
    flexDirection: "row"
  },
  marker: {
    flexDirection: "row",
    borderColor: "red",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1
  },
  markerShadow: {
    shadowColor: "#3D4448",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  markerPrice: { color: "#D83C54", fontWeight: "bold" },
  markerStatus: { color: "#7D818A" }
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
