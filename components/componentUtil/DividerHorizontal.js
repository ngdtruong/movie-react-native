import React from 'react';
import { View, StyleSheet } from 'react-native';

const DividerHorizontal = ({container}) => {
    return(
        <View style={[styles.container, container]}>

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        opacity:0.7,
        height:1,
        width:'100%',
        marginTop:0,
    }
});

export default DividerHorizontal;
