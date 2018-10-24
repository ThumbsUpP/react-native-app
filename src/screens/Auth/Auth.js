import React, { Component } from "react";
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    Image,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithStyle from "../../components/UI/ButtonWithStyle/ButtonWithStyle";
import backgroundImage from "../../assets/backgroundImage.jpg";
import validate from "../../utility/validation";
import { tryAuth, authAutoSignIn } from "../../store/actions/index";

class AuthScreen extends Component {
    state = {
        authMode: 'signup',
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            }
        }
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onAutoSignIn();
    }


    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            }
        })
    }

    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }
        this.props.onTryAuth(authData, this.state.authMode);
    };


    updateInputState = (key, value) => {
        let connectedValue = {};

        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo
            const equalValue = this.state.controls[equalControl].value
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            }
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            key === 'password'
                                ? validate(
                                    prevState.controls.confirmPassword.value,
                                    prevState.controls.confirmPassword.validationRules,
                                    connectedValue)
                                : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true

                    },

                }
            }
        })
    }

    render() {

        let confirmPassword = null;
        if (this.state.authMode === 'signup') {
            confirmPassword = (<View>
                <DefaultInput
                    placeholder="Confirm password"
                    style={styles.input}
                    onChangeText={(val) => { this.updateInputState('confirmPassword', val) }}
                    value={this.state.controls.confirmPassword.value}
                    valid={this.state.controls.confirmPassword.valid}
                    touched={this.state.controls.confirmPassword.touched}
                    secureTextEntry />
            </View>)
        }
        let submitButton = (<ButtonWithStyle
            disabled={
                (!this.state.controls.confirmPassword.valid && this.state.authMode === "signup") ||
                !this.state.controls.email.valid ||
                !this.state.controls.password.valid
            }
            onPress={this.authHandler}
            color="white">Submit
    </ButtonWithStyle>)

        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />
        }

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View>
                    <Image source={backgroundImage} style={styles.backgroundImage} />
                </View>
                <MainText>
                    <HeadingText >Please Signin</HeadingText>
                </MainText>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inputContainer} >
                        <DefaultInput
                            placeholder="Email Address"
                            style={styles.input}
                            value={this.state.controls.email.value}
                            onChangeText={(val) => { this.updateInputState('email', val) }}
                            valid={this.state.controls.email.valid}
                            touched={this.state.controls.email.touched}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                        />
                        <DefaultInput
                            placeholder="Password"
                            style={styles.input}
                            onChangeText={(val) => { this.updateInputState('password', val) }}
                            value={this.state.controls.password.value}
                            valid={this.state.controls.password.valid}
                            touched={this.state.controls.password.touched}
                            secureTextEntry
                        />
                        {confirmPassword}
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.loginOptionContainer}>
                    {submitButton}
                    <ButtonWithStyle
                        onPress={this.switchAuthModeHandler}
                        color="white">{this.state.authMode === 'login' ? "Sign Up" : "Login"}
                    </ButtonWithStyle>
                </View>

            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    inputContainer: {
        width: "50%"
    },
    input: {
        backgroundColor: '#eee',
        borderRadius: 15
    },
    backgroundImage: {
        width: 180,
        height: 180,
        borderRadius: 15,
        overflow: 'hidden',
        margin: 30,
    },
    ImageContainer: {
    },
    loginOptionContainer: {
        flexDirection: "row"
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        onAutoSignIn: () => dispatch(authAutoSignIn())
    };
};

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)