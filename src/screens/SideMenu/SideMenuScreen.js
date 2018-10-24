import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { authLogout } from "../../store/actions/index";

class SideMenuScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onLogout} style={styles.iconContainer} >
                    <Icon name="ios-log-out" size={50} color="#15b7c0" />
                    <Text>Log Out</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 52,
        flex: 1,
        backgroundColor: '#eee'
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    };
};


export default connect(null, mapDispatchToProps)(SideMenuScreen)