import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, ScrollView, StatusBar,
    StyleSheet, View, FlatList, ImageBackground
    , ActivityIndicator, Alert
} from 'react-native';

import ItemFilm from './ItemFilm';
import { fetchData, userLogout } from '../../network/ApiMethod';
import Icon from 'react-native-vector-icons/Ionicons';
import { storeDataUser, getDataUser, getLoginFb } from '../../local/LocalData';
import { bg } from '../../util/ImageUtil';

const Home = ({ navigation }) => {

    //hook
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);


    React.useLayoutEffect(() => {
        navigation.setOptions({

            headerRight: () => (
                <Icon
                    style={{ marginRight: 10 }}
                    name="exit-outline"
                    color='white'
                    size={25}
                    onPress={async () => {
                        const access_token = await getDataUser();

                        if (access_token != null) {
                            Alert.alert(
                                "Logout",
                                "Are you sure logout?",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    {
                                        text: "OK", onPress: () => {
                                            getLoginFb(value => {
                                                if (value.isLoginFb) {
                                                    storeDataUser('');
                                                    alert('Logout successful')
                                                }
                                                else {
                                                    _logout(access_token)
                                                }
                                            })

                                        }
                                    }
                                ]
                            );

                        } else {
                            alert('Ban chua dang nhap')
                        }

                    }} />
            ),
        });
    }, [navigation]);

    const _logout = (access_token) => {
        userLogout(access_token, (message, error) => {
            if (error === true) {
                console.log(`Error: ${message}`)
                alert(message)
            }
            else {
                storeDataUser('');
                alert('Logout successful')
            }
        })
    }


    //fetch api
    const _getFilmFromServer = async (crPage) => {
        setLoading(true);
        fetchData(crPage, (data, paging) => {
            setLoading(false);
            setTotalPage(paging.total_pages);
            setList(list.concat(data));
        })
    }

    const _onRefresh = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage > totalPage) {
            setCurrentPage(1);
        }
    }

    const _onRenderFooter = () => {
        return (
            isLoading ?
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View> : null
        );
    }

    const _onLoadMore = () => {
        if (currentPage > totalPage) {
            return;
        }
        else {
            setCurrentPage(currentPage + 1);
            setLoading(true)
        }

    }


    useEffect(() => {
        setLoading(true);
        _getFilmFromServer(currentPage);
    }, [currentPage]);

    
    return (
        <View style={styles.container}>

            <ImageBackground source={bg} style={styles.img}>
                <FlatList

                    data={list}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <ItemFilm item={item} index={index} navigation={navigation} />
                        );
                    }}
                    //load more
                    ListFooterComponent={_onRenderFooter}
                    onEndReached={_onLoadMore}
                    onEndReachedThreshold={0}
                //pull to refresh
                // refreshing={isLoading}
                // onRefresh={_onRefresh}
                />

            </ImageBackground>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    img: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: "cover",
    },
    loader: {
        marginTop: 10,
        alignItems: 'center'
    }
});

export default Home;