import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

const Input = ({
    label,
    placeholder,
    placeholderTextColor,
    keyboardType,
    onChangeText,
    inputContainer,
    inputStyle,
    labelStyle,
    ...allProperties
}) => {
    return (
        <View style={[styles.inputContainer, inputContainer]}>
            <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
            <TextInput
                {...allProperties}
                style={[styles.inputStyle, inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                onChangeText={(text) => { onChangeText(text) }}
                selectTextOnFocus={true}
                keyboardType={keyboardType}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 0,
        marginTop: 0,
    },
    inputStyle: {
        padding:0,
        borderBottomWidth:1,
        borderColor: 'black',
        color:'black',
        fontSize:15,
        opacity:0.7,
    },
    labelStyle:{
        color:'yellow'
    }
});

export default Input;

