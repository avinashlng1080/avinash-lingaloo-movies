import Animated from 'react-native-reanimated';
import {spring as runSpring} from 'react-native-redash';

const {Value, Clock, cond, eq, stopClock, set, clockRunning} = Animated;

export interface SpringValue {
    value: Animated.Value<number>;
    clock: Animated.Clock;
    hasSprung: Animated.Value<number>;
    hasSprungBack: Animated.Value<number>;
}

const springConfig = () => ({
    toValue: new Value(0),
    damping: 15,
    mass: 1,
    stiffiness: 200,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
});

export const createValue = (val: number): SpringValue => ({
    value: new Value(val),
    clock: new Clock(),
    hasSprung: new Value(0),
    hasSprungBack: new Value(0),
});

export const spring = (
    v: SpringValue,
    from: number,
    to: number,
    back: 'hasSprung' | 'hasSprungBack' = 'hasSprung',
): Animated.Node<number> =>
    cond(eq(v[back], 0), [
        set(
            v.value,
            runSpring({clock: v.clock, from, to, config: springConfig()}),
        ),
        cond(eq(clockRunning(v.clock), 0), set(v[back], 1)),
    ]);

export const springBack = (
    v: SpringValue,
    from: number,
    to: number,
): Animated.Node<number>[] => [
    cond(eq(v.hasSprung, 0), [stopClock(v.clock), set(v.hasSprung, 1)]),
    spring(v, from, to, 'hasSprungBack'),
];
