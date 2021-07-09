import React, { useState } from 'react';
import {
    SafeAreaView, ScrollView, StatusBar,
    StyleSheet, Text,
    View, ImageBackground, TouchableWithoutFeedback, Keyboard,
    KeyboardAvoidingView, Image,
    TouchableOpacity, ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Input from '../componentUtil/Input';
import DiviverHorizontal from '../componentUtil/DividerHorizontal';
import Spacer from '../componentUtil/Spacer';
import TouchableButton from '../componentUtil/TouchableButton';
import { userRegister } from '../../network/ApiMethod';
import {storeDataUser} from '../../local/LocalData';
import {bg, btnClose} from '../../util/ImageUtil';
import {colorOrange} from '../../util/ColorUtil';

const Signup = ({ navigation }) => {
    
    //hook
    const [emailLabel, setEmailLabel] = useState('');
    const [passwordLabel, setPasswordLabel] = useState('');
    const [repasswordLabel, setRepasswordLabel] = useState('');
    const [nameLable, setNameLabel] = useState('');
    const [info, setInfo] = useState({});
    const [isShowLoading, setShowLoading] = useState(false);



    async function _handleRegister(n, e, p, rp) {
        if (rp.length !== 0 && n.length !== 0 && e.length !== 0 && p.length !== 0 && p === rp) {
            setShowLoading(true);

            userRegister(n, e, p, (data, error) => {
                if(error === false){
                    setInfo(data);
                    storeDataUser(data.access_token);
                    setShowLoading(false);
                    navigation.goBack()
                }else{
                    setShowLoading(false);
                    alert();
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
                    <Text style={styles.text}>Đăng ký</Text>
                </View>

                <View style={styles.viewMiddle}>

                    <KeyboardAwareScrollView style={styles.container} enableOnAndroid>

                        <DiviverHorizontal />

                        <Input
                            inputContainer={styles.inputContainer}
                            inputStyle={ styles.inputStyle}
                            placeholder='Họ tên'
                            placeholderTextColor='white'
                            keyboardType='default'
                            maxLength={20}
                            label={(nameLable.length == 0) ? 'Bạn chưa điền họ tên' : ''}
                            onChangeText={(text) => setNameLabel(text)} />

                        <Input
                            inputContainer={styles.inputContainer}
                            inputStyle={ styles.inputStyle}
                            placeholder='Email'
                            placeholderTextColor='white'
                            keyboardType='email-address'
                            secureTextEntry={true}
                            maxLength={20}
                            label={(emailLabel.length == 0) ? 'Bạn chưa điền email' : ''}
                            onChangeText={(text) => setEmailLabel(text)} />

                        <Input
                            inputContainer={styles.inputContainer}
                            inputStyle={ styles.inputStyle}
                            placeholder='Mật khẩu'
                            placeholderTextColor='white'
                            keyboardType='default'
                            secureTextEntry={true}
                            maxLength={20}
                            label={(passwordLabel.length == 0) ? 'Bạn chưa điền mật khẩu' : ''}
                            onChangeText={(text) => setPasswordLabel(text)} />

                        <Input
                            inputContainer={styles.inputContainer}
                            inputStyle={ styles.inputStyle}
                            placeholder='Xác nhận mật khẩu'
                            placeholderTextColor='white'
                            keyboardType='default'
                            secureTextEntry={true}
                            maxLength={20}
                            label={
                                repasswordLabel.length != 0 ? (repasswordLabel !== passwordLabel ? 'Xác nhận mật khẩu sai' : '') : 'Bạn chưa xác nhận mật khẩu'
                            }
                            onChangeText={(text) => setRepasswordLabel(text)} />

                        <TouchableButton
                            title='Đăng ký'
                            textStyle={{ textTransform: 'none', fontSize: 18 }}
                            containerStyle={{ paddingHorizontal: 50, marginTop: 20 }}
                            onPress={() => { _handleRegister(nameLable, emailLabel, passwordLabel, repasswordLabel) }} />

                        <DiviverHorizontal container={{ marginTop: 40 }} />

                        {
                            isShowLoading ? (<ActivityIndicator animating={true}
                                size="large" color="#0000ff" />) : null
                        }

                    </KeyboardAwareScrollView>
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
                        <Spacer height={30} />

                        <View style={styles.viewBottomText}>
                            <Text style={styles.textBottom}>Bằng việc chọn vào nút Đăng ký, bạn đã đồng ý với </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={styles.textUnderline}
                                    onPress={() => { }}>Điều khoản sử dụng</Text>
                                <Text style={styles.textBottom}> và </Text>
                                <Text
                                    style={styles.textUnderline}
                                    onPress={() => { }}>Quy định bảo mật</Text>
                                <Text style={styles.textBottom}> của HFILM</Text>
                            </View>
                        </View>
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
        flex: 2.5,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    viewMiddle: {
        flex: 7,

    },
    viewBottom: {
        // flex: 2,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    viewBottomText: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 10,

    },
    textBottom: {
        fontSize: 16,
        color: 'white',
    },
    viewClose: {
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'flex-start'
    },
    imageClose: {
        width: 50,
        height: 50,
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
    textUnderline:{
        fontSize: 16,
        color: colorOrange, 
        textDecorationLine: 'underline',
    }
});

export default Signup;