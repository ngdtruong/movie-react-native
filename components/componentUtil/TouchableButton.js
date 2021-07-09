import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


const TouchableButton = ({
    title,
    textStyle,
    containerStyle,
    buttonStyle,
    touchableStyle,
    ...allProperties
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity
                {...allProperties}
                style={[styles.touchableStyle, touchableStyle]}>
                    <View style={[styles.interalView, buttonStyle]}>
                        <Text style={[styles.textStyle, textStyle]}>{title}</Text>
                    </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 15,
        height: 50,
        marginTop:0,
    },
    touchableStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 6,
        backgroundColor: 'darkorange',
    },
    interalView:{
        width: '100%',
        height: '100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'darkorange',
        opacity:1,
        borderRadius: 6,
    },
    textStyle:{
        fontSize:15,
        fontWeight:'bold',
        color:'white',
        textTransform:'uppercase',
    }
});

export default TouchableButton; 
