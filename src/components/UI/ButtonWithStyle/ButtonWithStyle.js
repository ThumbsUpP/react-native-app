import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const buttonWithStyle = props => {
    const content = (
        <View style={[styles.button, { backgroundColor: props.color }, props.disabled ? styles.disabled : null, props.style]}>
            <Text style={props.disabled ? styles.disabledText : null}>
                {props.children}
            </Text>
        </View>)

    if (props.disabled) {
        return content
    }

    return (
        <TouchableOpacity onPress={props.onPress}  >
            {content}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        color: "#bbb",
        padding: 10,
        margin: 8,
        borderRadius: 5,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: "#16bac4",

    },
    disabled: {
        backgroundColor: "#eee",

    },
    disabledText: {
        color: "#aaa"
    }
})


export default buttonWithStyle;
