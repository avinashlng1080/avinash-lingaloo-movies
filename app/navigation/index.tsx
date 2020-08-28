import {NavigationContainer} from '@react-navigation/native';
import type {StackCardInterpolationProps} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import {enableScreens} from 'react-native-screens';
import Toast from 'react-native-toast-message';

import SplashScreen from '@screens/SplashScreen';
import Start from '@screens/Start';
import Detail from '@screens/Detail';

enableScreens();

const Stack = createStackNavigator();

const forFade = ({current}: StackCardInterpolationProps) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

const App = () => (
    <>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" headerMode="screen">
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={() => ({
                        headerShown: false,
                        headerTintColor: 'rgba(0,0,0, 0.75)',
                        headerStyle: {
                            backgroundColor: 'rgba(143,188,143, 0.75)',
                        },
                    })}
                />
                <Stack.Screen
                    name="Start"
                    component={Start}
                    options={() => ({
                        headerShown: false,
                    })}
                />
                <Stack.Screen
                    name="Detail"
                    component={Detail}
                    options={() => ({
                        headerShown: true,
                        headerBackTitle: 'Movies',
                        headerTintColor: 'rgba(0,0,0, 0.75)',
                        headerStyle: {
                            backgroundColor: 'rgba(143,188,143, 0.75)',
                        },
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
        <Toast ref={(ref: any) => Toast.setRef(ref)} />
    </>
);

export default App;
