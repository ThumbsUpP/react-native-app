import React, { Component } from 'react'
import { Text, Button, StyleSheet, View, Dimensions } from 'react-native'
import ButtonWithStyle from '../UI/ButtonWithStyle/ButtonWithStyle';
import MapView from 'react-native-maps';


class PickLocation extends Component {

    componentWillMount() {
        this.reset()
    }
    reset = () => {
        this.setState({
            focusedLocation: {
                latitude: 37.7900352,
                longitude: -122.4013726,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get("window").width / Dimensions.get("window").height * 0.0122
            },
            locationChosen: false,
        })
    }

    pickLocationHandler = event => {

        const coords = event.nativeEvent.coordinate;

        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        })

        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            }
        })
        this.props.onLocationPick({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
    }

    getLocationhandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }

                }
            };
            this.pickLocationHandler(coordsEvent);

        },
            err => {
                console.log(err);
                alert("Fetching position failed")

            })
    }

    render() {
        let marker = null;
        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        }
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    region={this.state.location ? this.state.focusedLocation : null}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}
                >
                    {marker}
                </MapView>
                <ButtonWithStyle
                    onPress={this.getLocationhandler}
                    style={styles.button}
                    color="white">
                    Locate me
                </ButtonWithStyle>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        width: "80%"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "#15b7c0",
        backgroundColor: "#eee",
        height: 200,
        borderRadius: 10,
        overflow: 'hidden'
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
    button: {
        margin: 8,
        alignItems: 'center',
    }
})

export default PickLocation;