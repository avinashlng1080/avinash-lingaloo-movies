/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import Animated, {useCode, clockRunning} from 'react-native-reanimated';

import Poster from '@components/Poster';
import SwipeToClose from '@components/SwipeToClose';
import {createValue, spring, springBack} from '@utils/spring';

import type MovieType from '@app/types/Movie';
import type PositionType from '@app/types/Position';

const {
    Value,
    cond,
    greaterThan,
    greaterOrEq,
    sub,
    round,
    add,
    divide,
    call,
    eq,
} = Animated;

interface AnimatedStyle {
    position: 'absolute';
    width: Animated.Value<number>;
    height: Animated.Value<number>;
    left: Animated.Value<number>;
    top: Animated.Value<number>;
}

interface ModalProps {
    movie: MovieType;
    position: PositionType;
    close: () => void;
}

// Uppercases the first letter of each word in the title
function titleCase(value: string): string {
    let title = '';
    let shouldUpcase = true;
    for (let i = 0; i < value.length; i++) {
        if (shouldUpcase) {
            title += value[i].toUpperCase();
            shouldUpcase = false;
        }
        if (value[i] === ' ') {
            shouldUpcase = true;
        }
    }

    return title;
}

const Modal = ({movie, position, close}: ModalProps) => {
    const dimensions = useWindowDimensions();
    const width = createValue(dimensions.width);
    const height = createValue(dimensions.height);
    const x = createValue(position.x);
    const y = createValue(position.y);
    const scale = createValue(1);
    const borderRadius = createValue(8);
    const opacity = createValue(0);
    const textOpacity = cond(
        greaterThan(
            width.value,
            add(
                position.width,
                divide(sub(dimensions.width, position.width), 2),
            ),
        ),
        1,
        0,
    );
    const translationY = new Value(0);
    const shouldClose = greaterOrEq(round(translationY), 100);
    const p: AnimatedStyle = {
        position: 'absolute',
        width: width.value,
        height: height.value,
        left: x.value,
        top: y.value,
    };

    useCode(
        () => [
            cond(
                shouldClose,
                [
                    springBack(width, dimensions.width, position.width),
                    springBack(height, dimensions.height, position.height),
                    springBack(x, 0, position.x),
                    springBack(y, 0, position.y),
                    springBack(borderRadius, 0, 8),
                    springBack(opacity, 1, 0),
                    springBack(scale, 0.75, 1),
                    cond(eq(clockRunning(scale.clock), 0), call([], close)),
                ],
                [
                    spring(width, position.width, dimensions.width),
                    spring(height, position.height, dimensions.height),
                    spring(x, position.x, 0),
                    spring(y, position.y, 0),
                    spring(borderRadius, 8, 0),
                    spring(opacity, 0, 1),
                ],
            ),
        ],
        [],
    );

    return (
        <SwipeToClose y={translationY} opacity={opacity.value} {...{scale}}>
            <Animated.View
                style={{
                    backgroundColor: 'white',
                    ...p,
                }}
            />
            <Animated.View
                style={{
                    opacity: textOpacity,
                    paddingTop: position.height,
                    ...p,
                }}>
                <View style={styles.content}>
                    <ScrollView>
                        <Text style={styles.paragraph}>
                            <Text style={{fontWeight: 'bold'}}>
                                {`${titleCase(movie.name)} `}
                            </Text>
                            <Text style={styles.paragraph}>
                                {movie.description}
                            </Text>
                        </Text>
                    </ScrollView>
                </View>
            </Animated.View>
            <Animated.View style={{...p, height: position.height}}>
                <Poster movie={movie} borderRadius={borderRadius.value} />
            </Animated.View>
        </SwipeToClose>
    );
};

const styles = StyleSheet.create({
    content: {
        padding: 16,
        flex: 1,
    },
    paragraph: {
        fontSize: 24,
        marginBottom: 16,
    },
});

export default Modal;
