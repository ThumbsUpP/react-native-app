import React from 'react';
import { Text, StyleSheet } from 'react-native';

const headingText = props => (
    <Text {...props} style={styles.textHeading} >{props.children}</Text>
);

const styles = StyleSheet.create({
    textHeading: {
        fontSize: 28,
        padding: 12,
        color: "#15b7c0",
    },
})

export default headingText;
