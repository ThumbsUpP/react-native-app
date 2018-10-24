import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { addPlace, startAddPlace } from '../../store/actions/index';
import { Navigation } from 'react-native-navigation'

//Component
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import ButtonWithStyle from '../../components/UI/ButtonWithStyle/ButtonWithStyle';

//utils
import validate from '../../utility/validation';


class SharedPlace extends Component {

    componentWillMount() {
        this.reset();
    }

    componentDidUpdate() {
        if (this.props.placeAdded) {
            Navigation.mergeOptions('rootTabs', {
                bottomTabs: {
                    currentTabIndex: 0
                }
            })
            this.props.onStartAddPlace()
        }
    }

    reset = () => {
        this.setState({
            controls: {
                placeName: {
                    value: '',
                    valid: false,
                    touched: true,
                    validationsRules: {
                        isEmpty: true
                    }
                },
                location: {
                    value: null,
                    valid: false,
                },
                image: {
                    value: null,
                    valid: false,
                }
            }
        })
    }

    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    }

    onAddPlaceHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value,
            this.state.controls.location.value,
            this.state.controls.image.value
        );
        this.reset();
        this.imagePicker.reset()
        this.locationPicker.reset()
    };

    placeNameChangeHandler = (val, key) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: val,
                        valid: validate(val, this.state.controls.placeName.validationsRules),
                        touched: true
                    }
                }
            }
        })
    };

    onLocationPickHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }



    render() {

        let submitButton = (<ButtonWithStyle
            onPress={this.onAddPlaceHandler}
            disabled={
                !this.state.controls.placeName.valid ||
                !this.state.controls.location.valid
            }
            color="white">Share
        </ButtonWithStyle>)

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />
        }

        return (
            <ScrollView >
                <View style={styles.container} behavior="padding" >
                    <View style={styles.inputButtonContainer} >
                        <PlaceInput
                            placeName={this.state.controls.placeName.value}
                            onChangeText={(val) => this.placeNameChangeHandler(val, 'placeName')}
                            style={styles.input}
                        />
                        <View style={styles.button}>
                            {submitButton}
                        </View>
                    </View>
                    <PickImage
                        onImagePicked={this.imagePickedHandler}
                        ref={ref => this.imagePicker = ref} />
                    <PickLocation
                        onLocationPick={this.onLocationPickHandler}
                        ref={ref => this.locationPicker = ref} />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    inputButtonContainer: {
        flexDirection: "row",
        flex: 1
    },
    input: {
        width: "60%"
    },

})

const mapDispatchtoProps = disptach => {
    return {
        onAddPlace: (placeName, location, image) => disptach(addPlace(placeName, location, image)),
        onStartAddPlace: () => disptach(startAddPlace())
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        placeAdded: state.places.placeAdded
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(SharedPlace)