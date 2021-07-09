import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, StatusBar, StyleSheet, Text, View,
    ImageBackground, TouchableWithoutFeedback, Keyboard,
    KeyboardAvoidingView, ActivityIndicator,
    TouchableOpacity, Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import Input from '../componentUtil/Input';
import DiviverHorizontal from '../componentUtil/DividerHorizontal';
import TouchableButton from '../componentUtil/TouchableButton';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import { LoginManager } from "react-native-fbsdk-next";
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'

import { userLogin, userLoginFb } from '../../network/ApiMethod';
import { storeDataUser, isLoginFb } from '../../local/LocalData';
import { bg, btnClose } from '../../util/ImageUtil';
import {colorButtonFacebook, colorButtonGoogle, colorOrange} from '../../util/ColorUtil';

const Login = ({ navigation }) => {

    //hook
    const [emailLabel, setEmailLabel] = useState('');
    const [passwordLabel, setPasswordLabel] = useState('');
    const [isShowLoading, setShowLoading] = useState(false);


    async function _handleLogin(e, p) {
        if (e.length !== 0 && p.length !== 0) {
            setShowLoading(true);
            userLogin(e, p, (data, error) => {
                if (error === false) {
                    console.log(data.access_token);
                    storeDataUser(data.access_token);
                    setShowLoading(false);
                    isLoginFb(false);
                    navigation.goBack();
                }
                else {
                    setShowLoading(false);
                    alert('Error');
                }
            });
        }
        else {
            alert('Ban phai nhap day du thong tin')
        }
    }

    const _handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    }


    const _handleRegister = () => {
        navigation.navigate('Signup')
    }

    const _handlePopBackStack = () => {
        navigation.goBack();
    }

    const _loginFacebook = () => {
        LoginManager.logInWithPermissions(['public_profile', 'user_birthday', 'user_location', 'email'])
            .then((result) => {
                if (result.isCancelled) {
                    return;
                }
                AccessToken.getCurrentAccessToken().then((data) => {
                    const accessToken = data.accessToken;
                    const responseInfoCallback = (error, profile) => {
                        if (error) {
                            console.log(error);
                        } else {
                            isLoginFb(true);
                            storeDataUser(accessToken);
                            userLoginFb(profile.email, profile.name, data.userID,
                                profile.picture.data.url, accessToken, (message, error) => {
                                    if (error === false) {
                                        console.log('success')
                                    } else {
                                        console.log(message)
                                    }
                                })
                            navigation.goBack();

                        }
                    };

                    const infoRequest = new GraphRequest(
                        '/me',
                        {
                            accessToken,
                            parameters: {
                                fields: {
                                    string: 'name,gender,birthday,location{location}, picture, email',
                                },
                            },
                        },
                        responseInfoCallback,
                    );
                    new GraphRequestManager().addRequest(infoRequest).start();
                });
            });
    }

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '569866503952-gc7541u53nn6akfhcn01dgmseuksoiu0.apps.googleusercontent.com',
            // MLn_7htQ8qHvhIE6bmSEZVTG
            // webClientId: '334965070329-hp1focmfdls2u157jr5tq2lr7775sgdt.apps.googleusercontent.com',
            // webClientId: '334965070329-uke2h7nr4i1r00sir2v696ijubqnjq1k.apps.googleusercontent.com',
            // webClientId: '334965070329-0j9gi5f2l6urihpagtus8heebfrmnk5u.apps.googleusercontent.com',

            // 334965070329-0j9gi5f2l6urihpagtus8heebfrmnk5u.apps.googleusercontent.com
        });
    }, [])

    const _loginGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            console.log(`idToken: ${idToken}`)
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}>

            <ImageBackground source={bg} style={styles.img}>
                <View style={styles.viewTopText}>
                    <Text style={styles.text}>Đăng nhập</Text>
                </View>

                <View style={styles.viewMiddle}>

                    <KeyboardAwareScrollView style={styles.container} enableOnAndroid>
                        <DiviverHorizontal />

                        <Input
                            inputContainer={styles.inputContainer}
                            inputStyle={styles.inputStyle}
                            placeholder='Email'
                            placeholderTextColor='white'
                            keyboardType='email-address'
                            maxLength={20}
                            onChangeText={(text) => setEmailLabel(text)} />

                        <Input
                            inputContainer={styles.inputContainer}
                            inputStyle={styles.inputStyle}
                            placeholder='Password'
                            placeholderTextColor='white'
                            keyboardType='default'
                            secureTextEntry={true}
                            maxLength={20}
                            onChangeText={(text) => setPasswordLabel(text)} />

                        <TouchableButton
                            title='Đăng nhập'
                            textStyle={styles.textBtnStyle}
                            containerStyle={styles.btnContainerStyle}
                            onPress={() => { _handleLogin(emailLabel, passwordLabel) }} />

                        <TouchableButton
                            title='Quên mật khẩu?'
                            textStyle={styles.textBtnStyle}
                            containerStyle={styles.btnContainerStyle}
                            buttonStyle={{ backgroundColor: '#000000' }}
                            touchableStyle={{ backgroundColor: '#000000', opacity: 0.5 }}
                            onPress={_handleForgotPassword}/>

                        <View style={styles.viewBtnLoginSocial}>
                            <Icon.Button
                                alignItems='center'
                                justifyContent='center'
                                height={50}
                                name="facebook"
                                backgroundColor={colorButtonFacebook}
                                onPress={_loginFacebook}>
                                <Text style={styles.textFb}>Login with Facebook</Text>
                            </Icon.Button>
                        </View>

                        <View style={styles.viewBtnLoginSocial}>
                            <Icon.Button
                                alignItems='center'
                                justifyContent='center'
                                height={50}
                                name="google"
                                backgroundColor={colorButtonGoogle}
                                onPress={_loginGoogle}
                            >
                                <Text style={styles.textFb}>Login with Google</Text>
                            </Icon.Button>
                        </View>


                        <DiviverHorizontal container={{ marginTop: 40 }} />

                        {
                            isShowLoading ? (<ActivityIndicator animating={true}
                                size="large" color="#0000ff" />) : null
                        }

                    </KeyboardAwareScrollView>

                </View>

                <View style={styles.viewBottom}>
                    <View style={styles.viewClose}>
                        <TouchableOpacity
                            onPress={() => { _handlePopBackStack() }}>
                            <Image
                                style={styles.imageClose}
                                source={btnClose}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewBottomText}>
                        <Text style={styles.textBottom}>Bạn chưa có tài khoản? </Text>
                        <Text
                            style={[styles.textBottom, { color: colorOrange, textDecorationLine: 'underline' }]}
                            onPress={() => { _handleRegister() }}>ĐĂNG KÝ</Text>
                    </View>
                </View>

            </ImageBackground>


        </TouchableWithoutFeedback >
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    img: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 30,
        marginBottom: 30
    },
    viewTopText: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    viewMiddle: {
        flex: 8,
    },
    viewBottom: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    viewBottomText: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textBottom: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10
    },
    viewClose: {
        alignItems: 'center',
        flex: 2,
        justifyContent: 'flex-start'
    },
    imageClose: {
        width: 50,
        height: 50,
    },
    textFb: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    viewBtnLoginSocial: {
        marginTop: 20,
        marginHorizontal: 50
    },
    inputContainer:{
        marginHorizontal: 50, 
        marginTop: 10
    }, 
    inputStyle:{
        borderColor: 'white', 
        fontSize: 18, 
        color: 'white', 
        paddingBottom: 5
    },
    btnContainerStyle:{
        paddingHorizontal: 50,
         marginTop: 20
    },
    textBtnStyle:{
        textTransform: 'none', 
        fontSize: 18
    }
});

export default Login;