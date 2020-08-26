import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

import type MovieType from '@app/types/Movie';

interface PosterProps {
    movie: MovieType;
    borderRadius?: Animated.Value<number>;
}

// const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const Poster = ({borderRadius, movie}: PosterProps) => {
    return (
        <>
            <Animated.View
                style={[styles.image, {borderRadius: borderRadius || 8}]}>
                <FastImage
                    source={{uri: movie.poster}}
                    style={[styles.image]}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </Animated.View>

            <View style={styles.content}>
                <Text style={styles.name}>{movie.name}</Text>
                <Text style={styles.reviews}>{`Reviews: ${
                    movie.reviews?.length || 0
                }`}</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 16,
        paddingTop: 20,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        width: '100%',
    },
    name: {
        color: 'white',
        fontSize: 34,
        lineHeight: 41,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: {
            width: 1,
            height: 2,
        },
        textShadowRadius: 2,
    },
    reviews: {
        color: 'white',
        fontSize: 18,
        textShadowColor: '#000',
        textShadowOffset: {
            width: 1,
            height: 2,
        },
        textShadowRadius: 2,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined,
    },
});

export default Poster;
