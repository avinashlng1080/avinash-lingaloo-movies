import {BlurView} from '@react-native-community/blur';
import React, {ReactNode} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Animated, {useCode} from 'react-native-reanimated';
import {useValue} from 'react-native-redash';

import type {SpringValue} from '@utils/spring';

import {Interactable} from './Interactable';

const {
    clockRunning,
    interpolate,
    Extrapolate,
    set,
    cond,
    and,
    eq,
    or,
} = Animated;

interface SwipeToCloseProps {
    children: ReactNode;
    y: Animated.Node<number>;
    opacity: Animated.Node<number>;
    scale: SpringValue;
}

const SwipeToClose = ({children, y, opacity, scale: s}: SwipeToCloseProps) => {
    const scale = useValue(1);
    useCode(
        () => [
            cond(
                or(
                    and(clockRunning(s.clock), eq(s.hasSprung, 1)),
                    eq(s.hasSprungBack, 1),
                ),
                s.value,
                set(
                    scale,
                    interpolate(y, {
                        inputRange: [0, 100],
                        outputRange: [1, 0.75],
                        extrapolate: Extrapolate.CLAMP,
                    }),
                ),
            ),
        ],
        [],
    );

    return (
        <View style={StyleSheet.absoluteFill}>
            <Animated.View style={[StyleSheet.absoluteFill, {opacity}]}>
                <BlurView
                    blurType="light"
                    blurAmount={100}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
            <StatusBar barStyle="light-content" />
            <Animated.View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    transform: [{scale}],
                }}>
                {children}
            </Animated.View>
            <Interactable
                style={StyleSheet.absoluteFill}
                snapPoints={[{y: 0}, {y: 100}]}
                animatedValueY={y}
                verticalOnly
            />
        </View>
    );
};

export default SwipeToClose;
