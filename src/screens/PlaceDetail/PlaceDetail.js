import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { deletePlace } from '../../store/actions/index';
import { Navigation } from 'react-native-navigation';
import MapView from 'react-native-maps'

class PlaceDetail extends React.Component {
  state = {
    orientation: 'portrait'
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.changeOrientation)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.changeOrientation)
  }

  changeOrientation = (dims) => {
    this.setState({
      orientation: dims.window.height > dims.window.width ? 'portrait' : 'landscape'
    })
  }

  placeDeteletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    Navigation.pop(this.props.componentId);
  }

  render() {
    const { orientation } = this.state;
    console.log(this.props.selectedPlace);


    return (

      <View style={orientation === 'portrait' ? styles.containerPortrait : styles.containerLandscape}>
        <View style={orientation === 'portrait' ? styles.ImageContainerPortrait : styles.ImageContainerLandscape}>
          <Image source={this.props.selectedPlace.image} style={orientation === 'portrait' ? styles.placeImagePortrait : styles.placeImageLandscape} />
        </View>

        <View style={orientation === 'portrait' ? styles.infoPortrait : styles.infoLandscape}>
          <Text style={orientation === 'portrait' ? styles.placeNamePortrait : styles.placeNameLandscape}>
            {this.props.selectedPlace.name}
          </Text>
          <TouchableOpacity onPress={this.placeDeteletedHandler} >
            <View style={styles.deleteButton}>
              <Icon size={30} name="ios-trash" color="red" />
            </View>
          </TouchableOpacity>
          <MapView
            initialRegion={{
              ...this.props.selectedPlace.location,
              latitudeDelta: 0.0122,
              longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
            }}
            style={styles.map}
          >
            <MapView.Marker coordinate={{ ...this.props.selectedPlace.location }} />
          </MapView>
        </View>
      </View >
    );
  }

};

const styles = StyleSheet.create({
  containerPortrait: {
    margin: 22,
    justifyContent: 'space-between',
    flexDirection: "column",

  },
  containerLandscape: {
    margin: 22,
    justifyContent: 'space-around',
    flexDirection: "row"
  },

  placeImagePortrait: {
    width: "100%",
    height: 200
  },
  placeImageLandscape: {
    width: "100%",
    height: "100%",
  },

  placeNamePortrait: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  placeNameLandscape: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  infoPortrait: {
    alignItems: 'center',
    width: "100%",
    justifyContent: 'center'
  },
  infoLandscape: {
    alignItems: 'center',
    width: "50%",
    justifyContent: 'center'
  },
  ImageContainerPortrait: {
    width: "100%"
  },
  ImageContainerLandscape: {
    width: "50%",
    marginLeft: 20
  },
  deleteButton: {
    alignItems: 'center'
  },
  map: {
    width: "100%",
    height: 280,
    borderWidth: 1,
    borderColor: "#15b7c0",
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: 'hidden'
  },
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  }
}

export default connect(null, mapDispatchToProps)(PlaceDetail);
