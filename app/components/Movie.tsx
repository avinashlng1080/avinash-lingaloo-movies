import memoize from 'memoize-one';
import React, {useRef} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated, {cond, eq} from 'react-native-reanimated';

import Poster from './Poster';

import type MovieType from '@app/types/Movie';
import type PositionType from '@app/types/Position';

interface MovieProps {
    activeMovieId: Animated.Value<number>;
    index: number;
    movie: MovieType;
    open: (index: number, movie: MovieType, position: PositionType) => void;
}

interface Meassure {
    (x: number, y: number, width: number, height: number): void;
}

interface AnimatedView extends Animated.View {
    measureInWindow(cb: Meassure): void;
}

const measure = (ref: View): Promise<PositionType> =>
    new Promise((resolve) =>
        ref.measureInWindow((x, y, width, height) =>
            resolve({
                x,
                y,
                width,
                height,
            }),
        ),
    );

const Movie = ({activeMovieId, index, movie, open}: MovieProps) => {
    const container = useRef<AnimatedView>(null);
    const {width, height} = useWindowDimensions();
    const styles = getStyles(width, height);
    const startTransition = async () => {
        if (container.current) {
            const position = await measure(container.current.getNode());
            open(index, movie, position);
        }
    };

    console.log('RENDER MOVIE', movie.name);

    return (
        <TouchableWithoutFeedback onPress={startTransition}>
            <Animated.View
                ref={container}
                style={[
                    styles.container,
                    {opacity: cond(eq(activeMovieId, index), 0, 1)},
                ]}>
                <Poster movie={movie} />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const getStyles = memoize((width: number, height: number) =>
    StyleSheet.create({
        container: {
            width: width - 32,
            height: height / 2,
            alignSelf: 'center',
            borderRadius: 8,
            marginVertical: 8,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        content: {
            position: 'absolute',
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
    }),
);

export default Movie;
