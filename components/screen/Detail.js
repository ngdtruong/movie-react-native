import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, ScrollView, StatusBar,
    StyleSheet, Text, Image, View, ImageBackground,
    TouchableWithoutFeedback, Keyboard,
    KeyboardAvoidingView, ActivityIndicator,
    TouchableOpacity, Linking,
} from 'react-native';
import Share from 'react-native-share';
import YouTube from 'react-native-youtube';

import DiviverHorizontal from '../componentUtil/DividerHorizontal';
import TouchableButton from '../componentUtil/TouchableButton';
import { getDataLocal } from '../../local/LocalData';
import { bg } from '../../util/ImageUtil';
import { heartWhite, heartOrange } from '../../util/ImageUtil';
import { colorButtonShare } from '../../util/ColorUtil';
import { youtubeApiKey } from '../../util/StringUtil';


const Detail = ({ navigation, route }) => {

    //movie details data
    const id = route.params.item.id;
    const imageURL = route.params.item.image;
    const titleTotal = route.params.item.title;
    const splitTitle = titleTotal.split(" / ");
    const compareTitle = (splitTitle[1] != null) ? splitTitle[1] : splitTitle[0];
    const views = `Lượt xem: ${route.params.item.views}`;
    const category = ` ${route.params.item.category}`;
    const actor = ` ${route.params.item.actor}`;
    const director = ` ${route.params.item.director}`;
    const manufacturer = ` ${route.params.item.manufacturer}`;
    const duration = ` ${route.params.item.duration} minutes`;
    const description = ` ${route.params.item.description}`;
    const link = route.params.item.link;
    const keyLink = link.split("=");
    const lineSpacing = 25;

    //hook
    const [isLike, setLike] = useState(false);
    const [isReadMore, setReadMore] = useState(false);
    const [showMore, setShowMore] = useState(false);


    useEffect(() => {
        navigation.setOptions({
            title: compareTitle,
        });
    }, [navigation, compareTitle]);

    useEffect(() => {
        getDataLocal(id, value => {
            if (value.id === id) {
                setLike(value.isLike);
            }
        });
    }, []);

    //just post on facebook

    // const postOnFacebook = () => {
    //     let facebookParameters = [];
    //     facebookParameters.push('u=' + encodeURI(link));
    //     facebookParameters.push('quote=' + encodeURI(compareTitle));
    //     const url =
    //       'https://www.facebook.com/sharer/sharer.php?'
    //        + facebookParameters.join('&');

    //     Linking.openURL(url)
    //       .then((data) => {
    //         console.log('Facebook Opened');
    //       })
    //       .catch(() => {
    //         alert('Something went wrong');
    //       });
    //   };

    const _onShare = async () => {
        const shareOptions = {
            message: compareTitle,
            url: link
        }
        try {
            const ShareResponse = await Share.open(shareOptions);
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    };

    const _onLayout = e => {
        const { height } = e.nativeEvent.layout;
        let line = Math.floor(height / lineSpacing);
        if (line > 3) setShowMore(true);
    }


    return (
        <ImageBackground source={bg} style={styles.img}>
            <ScrollView
                contentContainerStyle={styles.scrollViewStyle}>
                <View style={styles.container}>
                    <View style={styles.viewTop}>
                        <View style={styles.viewChildTopLeft}>
                            <Image source={{ uri: imageURL }} style={styles.image} />
                        </View>

                        <View style={styles.viewChildTopRight}>
                            <Text
                                style={styles.text}
                                numberOfLines={1}
                                ellipsizeMode='tail'>{compareTitle}</Text>
                            <Text style={[styles.text, { marginTop: 5, color: '#fea46f', fontStyle: 'italic', fontWeight: 'normal', fontSize: 14 }]}>{views}</Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={[styles.text, { marginTop: 5 }]}>Genres:
                            <Text style={[styles.text, { fontWeight: 'normal' }]}>{category}</Text>
                            </Text>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode='tail'
                                style={[styles.text, { marginTop: 5 }]}>Actor:
                            <Text style={[styles.text, { fontWeight: 'normal' }]}>{actor}</Text>
                            </Text>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode='tail'
                                style={[styles.text, { marginTop: 5 }]}>Director:
                            <Text style={[styles.text, { fontWeight: 'normal' }]}>{director}</Text>
                            </Text>
                            <Text
                                numberOfLines={2}
                                ellipsizeMode='tail'
                                style={[styles.text, { marginTop: 5 }]}>Manufacturer:
                            <Text style={[styles.text, { fontWeight: 'normal' }]}>{manufacturer}</Text>
                            </Text>
                            <Text
                                numberOfLines={1}
                                ellipsizeMode='tail'
                                style={[styles.text, { marginTop: 5 }]}>Thời lượng phim:
                            <Text style={[styles.text, { fontWeight: 'normal' }]}>{duration}</Text>
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.viewFavorite}>
                                    {/* <TouchableOpacity
                                        onPress={() => { setLike(!isLike) }}> */}
                                    <Image
                                        style={styles.imageHeart}
                                        source={isLike ? heartOrange : heartWhite}
                                    />
                                    {/* </TouchableOpacity> */}
                                    <Text style={isLike ? styles.textFavorited : styles.textFavorite}>Thích</Text>
                                </View>
                                <View style={{ position: 'absolute', right: -15 }}>
                                    <TouchableButton
                                        containerStyle={{ marginTop: 10 }}
                                        title={'Share'}
                                        touchableStyle={{ width: 100, height: 40, borderRadius: 25 }}
                                        buttonStyle={{ backgroundColor: colorButtonShare, borderRadius: 25 }}
                                        textStyle={{ textTransform: 'none' }}
                                        onPress={async () => {
                                            // postOnFacebook();
                                            _onShare()
                                        }} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.viewMiddle}>
                        <Text
                            onLayout={_onLayout}
                            numberOfLines={isReadMore ? 10 : 4}
                            ellipsizeMode='tail'
                            style={[styles.text, { fontWeight: 'normal', fontSize: 16, lineHeight: lineSpacing }]}>{description}</Text>
                        <View>
                            {showMore ? <Text
                                style={styles.textReadMore}
                                onPress={() => { setReadMore(!isReadMore) }}>
                                {isReadMore ? 'Ẩn bớt' : 'Xem thêm'}
                            </Text> : null}

                        </View>

                    </View>

                    <View style={styles.viewBottom}>
                        <DiviverHorizontal container={{ marginTop: 10 }} />
                        <YouTube
                            apiKey={youtubeApiKey}
                            videoId={keyLink[1]}
                            // play
                            // fullscreen
                            // loop
                            // onReady={e => this.setState({ isReady: true })}
                            // onChangeState={e => this.setState({ status: e.state })}
                            // onChangeQuality={e => this.setState({ quality: e.quality })}
                            onError={e => console.log(`Error: ${e.error}`)}
                            style={styles.viewYoutube}
                        />
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 10,
        marginHorizontal: 10
    },
    img: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: "cover",
    },
    viewTop: {
        flex: 4.5,
        flexDirection: 'row',
    },
    viewMiddle: {
        flex: 3,
        flexDirection: 'column',
    },
    viewBottom: {
        flex: 4,
    },
    viewChildTopLeft: {
        flex: 5,
    },
    viewChildTopRight: {
        flex: 7,
        flexDirection: 'column',
        marginLeft: 10
    },
    image: {
        width: '100%',
        height: 250,
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'justify'
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
    viewFavorite: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    textReadMore: {
        fontSize: 15,
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        color: '#fd6003',
        position: 'absolute',
        right: 0
    },
    scrollViewStyle: {
        flex: 1
    },
    viewYoutube: {
        width: '100%',
        height: 200,
        marginTop: 10
    }
});

export default Detail;