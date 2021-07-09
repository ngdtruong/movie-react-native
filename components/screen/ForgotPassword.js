import React, { useState } from 'react';
import {
    SafeAreaView, ScrollView, StatusBar,
    StyleSheet, Text,
    View, ImageBackground, TouchableWithoutFeedback, Keyboard, Image,
    TouchableOpacity, ActivityIndicator
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from '../componentUtil/Input';
import DiviverHorizontal from '../componentUtil/DividerHorizontal';
import Spacer from '../componentUtil/Spacer';
import TouchableButton from '../componentUtil/TouchableButton';
import { userForgotPassword } from '../../network/ApiMethod';
import {bg, btnClose} from '../../util/ImageUtil';

const ForgotPassword = ({ navigation }) => {

    //hook
    const [emailLabel, setEmailLabel] = useState('');
    const [isShowLoading, setShowLoading] = useState(false);



    async function _handleForgotPassword(e) {
        if (e.length !== 0) {
            setShowLoading(true);

            userForgotPassword(e, (messsage, error) => {
                if (error === false) {
                    setShowLoading(false);
                    navigation.goBack();
                } else {
                    setShowLoading(false);
                    alert(messsage);
                }

            });

        } else alert('Bạn chưa điền đủ thông tin');

    }

    const _handlePopBackStack = () => {
        navigation.goBack()
    }


    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
            }}>

            <ImageBackground source={bg} style={styles.img}>

                <View style={styles.viewTopText}>
                    <Text style={styles.textLabel}>Quên mật khẩu</Text>
                </View>

                <View style={styles.viewMiddle}>

                    <DiviverHorizontal />

                    <Text style={styles.text}>Hãy nhập email bạn đã dùng để tạo tài khoản</Text>

                    <Input
                        inputContainer={styles.inputContainer}
                        inputStyle={{ borderColor: 'white', fontSize: 18, color: 'white', paddingBottom: 5 }}
                        placeholder='Email'
                        placeholderTextColor='white'
                        keyboardType='email-address'
                        secureTextEntry={true}
                        maxLength={20}
                        label={(emailLabel.length == 0) ? 'Bạn chưa điền email' : ''}
                        onChangeText={(text) => setEmailLabel(text)} />


                    <TouchableButton
                        title='Gửi mật khẩu'
                        textStyle={{ textTransform: 'none', fontSize: 18 }}
                        containerStyle={{ paddingHorizontal: 50, marginTop: 30 }}
                        onPress={() => { _handleForgotPassword(emailLabel) }} />

                    <DiviverHorizontal container={{ marginTop: 40 }} />

                    {
                        isShowLoading ? (<ActivityIndicator animating={true}
                            size="large" color="#0000ff" />) : null
                    }

                </View>

                <View style={styles.viewBottom}>
                    <TouchableOpacity
                        onPress={() => { _handlePopBackStack() }}>
                        <Image
                            style={styles.imageClose}
                            source={btnClose}
                        />
                    </TouchableOpacity>
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
    textLabel: {
        color: 'white',
        fontSize: 30,
        marginBottom: 30
    },
    text: {
        color: 'white',
        fontSize: 16,
        marginTop:10,
        textAlign:'justify',
        marginHorizontal: 50
    },
    viewTopText: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    viewMiddle: {
        flex: 4,
    },
    viewBottom: {
        flex: 4,
        marginTop: 10,
        alignItems: 'center',
    },
    imageClose: {
        width: 50,
        height: 50,
    },
    inputContainer:{
        marginHorizontal: 50, 
        marginTop: 10
    },
});

export default ForgotPassword;