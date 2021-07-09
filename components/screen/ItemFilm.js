import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, ScrollView, StatusBar,
    StyleSheet, Text, useColorScheme,
    View, Image, TouchableOpacity
} from 'react-native';
import TouchableButton from '../componentUtil/TouchableButton';
import DividerHorizontal from '../componentUtil/DividerHorizontal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveDataLocal, getDataLocal, getDataUser } from '../../local/LocalData';
import { heartOrange, heartWhite } from '../../util/ImageUtil';

const ItemFilm = (props) => {

    //hook
    const [isLike, setLike] = useState(false);

    //movie details data
    const id = props.item.id;
    const image = props.item.image;
    const titleTotal = props.item.title;
    const splitTitle = titleTotal.split(" / ");
    const description = props.item.description;
    const views = `Lượt xem: ${props.item.views}`;



    const _favorite = (id, isLike) => {
        saveDataLocal(id, isLike)
    }

    const _getFavorite = (id) => {
        getDataLocal(id, value => {
            if (value.id === id) {
                setLike(value.isLike);
            }
        });
    }

    const _navigateScreen = async () => {
        if (await getDataUser() !== null)
            props.navigation.navigate('Detail', { item: props.item })
        else
            props.navigation.navigate('Login')
    }




    useEffect(() => {
        _getFavorite(id);
    }, [id]);

    useEffect(() => {
        _favorite(id, isLike);
    }, [isLike])



    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.viewImage}>
                    <Image source={{ uri: image }} style={styles.image} />
                </View>

                <View style={styles.viewText}>
                    <Text style={styles.text}>{splitTitle[0]}</Text>
                    <Text style={[styles.text, { marginTop: 5 }]}>{splitTitle[1]}</Text>
                    <Text style={
                        [styles.text, {
                            marginTop: 5,
                            color: '#fea46f',
                            fontStyle: 'italic',
                            fontWeight: 'normal',
                            fontSize: 15
                        }]}>{views}</Text>
                    <Text
                        style={[styles.text, { marginTop: 5, lineHeight: 25, }]}
                        numberOfLines={5}
                        ellipsizeMode='tail'>{description}</Text>
                    <View style={styles.viewButton}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setLike(!isLike);
                                }}>
                                <Image
                                    style={styles.imageHeart}
                                    source={isLike ? heartOrange : heartWhite}
                                />
                            </TouchableOpacity>
                            <Text style={isLike ? styles.textFavorited : styles.textFavorite}>Thích</Text>
                        </View>
                        <View style={{ position: 'absolute', right: -15 }}>
                            <TouchableButton
                                containerStyle={{ marginTop: 10 }}
                                title={'Xem phim'}
                                touchableStyle={{ width: 150, height: 40 }}
                                textStyle={{ textTransform: 'none' }}
                                onPress={() => { _navigateScreen() }} />
                        </View>
                    </View>
                </View>
            </View>
            <DividerHorizontal container={{ marginTop: 30 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 10
    },
    viewImage: {
        flex: 4
    },
    viewText: {
        flexDirection: 'column',
        paddingLeft: 10,
        flex: 8
    },
    image: {
        width: '100%',
        height: 200,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'justify'
    },
    imageHeart: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    textFavorite: {
        color: 'white',
        fontSize: 15,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    textFavorited: {
        color: 'orange',
        fontSize: 15,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    }
});

export default ItemFilm;
