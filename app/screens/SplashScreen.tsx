import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useRef, useCallback} from 'react';
import {Animated, StatusBar, StyleSheet} from 'react-native';

import generateMovies from '@utils/generate';

import type Movie from '@app/types/Movie';

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flex: {
        flex: 1,
    },
});

const Splash = () => {
    const animation = useRef<LottieView>(null);
    const navigation = useNavigation();
    const scale = new Animated.Value(1);
    const resetNavigation = useCallback(() => {
        Animated.timing(scale, {
            toValue: 2000,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            const movies: Array<Movie> = generateMovies(25, 5);
            navigation.reset({
                index: 0,
                routes: [{name: 'Start', params: {movies}}],
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Animated.View style={[style.container, {transform: [{scale}]}]}>
                <LottieView
                    source={require('../assets/splash.json')}
                    style={style.flex}
                    speed={2}
                    ref={animation}
                    autoPlay
                    loop={false}
                    resizeMode="contain"
                    onAnimationFinish={resetNavigation}
                />
            </Animated.View>
        </>
    );
};

export default Splash;
