import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import ButtonWithStyle from '../UI/ButtonWithStyle/ButtonWithStyle';
import ImagePicker from 'react-native-image-picker';


class PickImage extends Component {
    state = {
        pickedImage: null
    };

    reset = () => {
        this.setState({
            pickedImage: null
        })
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({ title: 'Pick an Image', maxWidth: 800, maxHeight: 600 }, res => {
            if (res.didCancel) {
                console.log("user cancelled!");
            } else if (res.error) {
                console.log("Error", res.error)
            } else {
                this.setState({
                    pickedImage: { uri: res.uri }
                });
                this.props.onImagePicked({ uri: res.uri, base64: res.data });
            }
        });

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage} />
                </View>
                <View style={styles.button}>

                    <ButtonWithStyle
                        onPress={this.pickImageHandler}
                        style={styles.button}
                        color="white">Pick image</ButtonWithStyle>
                </View>
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
        width: "100%",
        height: 150,
        borderRadius: 10,
        overflow: 'hidden'
    },
    button: {
        margin: 8,
        alignItems: "center"
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
})

export default PickImage;