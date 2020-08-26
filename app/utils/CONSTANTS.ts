import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const MOVIE_POSTER = height / 2;
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const isPhoneTall = SCREEN_HEIGHT >= 810;
