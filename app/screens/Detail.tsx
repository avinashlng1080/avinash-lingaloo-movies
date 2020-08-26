import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import type MovieType from '@app/types/Movie';
import FastImage from 'react-native-fast-image';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@utils/CONSTANTS';

type DetailParamList = {
    Detail: {
        movies: MovieType;
    };
};

type DetailRoute = RouteProp<DetailParamList, 'Detail'>;

const Detail = () => {
    const route = useRoute<DetailRoute>();
    const {movie} = (route?.params as unknown) as MovieType;
    // FIXME :  show list of cast and list of reviews
    // console.log(movie);
    return (
        <View style={styles.container}>
            <ScrollView bounces={false}>
                <FastImage
                    source={{uri: movie.poster}}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        // ...StyleSheet.absoluteFillObject,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 1.5,
    },
});
export default Detail;
