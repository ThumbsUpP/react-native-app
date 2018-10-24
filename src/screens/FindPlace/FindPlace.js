import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation'
import { getPlaces } from '../../store/actions/index'

import PlaceList from '../../components/PlaceList/PlaceList';



class FindPLace extends Component {
    state = {
        pageLoaded: false,
        removeAnim: new Animated.Value(1),
        fadinAnim: new Animated.Value(0)
    }

    componentDidMount() {
        this.props.onLoadPlaces()
    }

    itemSelectedHandler = key => {

        const selPlace = this.props.places.find(place => {
            return place.key === key
        })
        Navigation.push(this.props.componentId, {
            component: {
                name: "Awesome-places.PlaceDetail",
                passProps: {
                    selectedPlace: selPlace
                },
                options: {
                    topBar: {
                        title: {
                            text: selPlace.name
                        }
                    }
                }
            }
        })
    }

    placesLoadedHandler = () => {
        Animated.timing(
            this.state.fadinAnim,
            {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }
        ).start();

    }

    onFindPlaceHandler = () => {

        Animated.timing(
            this.state.removeAnim,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }
        ).start(() => {
            this.setState({
                pageLoaded: true
            });
            this.placesLoadedHandler()
        })

    }

    render() {

        let content = (
            <Animated.View
                style={{
                    opacity: this.state.removeAnim,
                    transform: [{
                        scale: this.state.removeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [12, 1]
                        })
                    }]
                }} >
                <TouchableOpacity onPress={this.onFindPlaceHandler}>
                    <View style={styles.buttonContainer} >
                        <Text style={styles.buttonText}>Find Places</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>

        )

        if (this.state.pageLoaded) {
            content = (
                <Animated.View style={{ opacity: this.state.fadinAnim }}>
                    <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
                </Animated.View>)
        }

        return (
            <View style={this.state.pageLoaded ? null : styles.container} >
                {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    buttonContainer: {
        width: "100%",
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#16bac4",
    },
    buttonText: {
        color: "#16bac4",
        margin: 8,
        fontSize: 14
    }
})

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}

const mapDistapchToProps = dispatch => {
    return {
        onLoadPlaces: () => dispatch(getPlaces())
    }
}



export default connect(mapStateToProps, mapDistapchToProps)(FindPLace)