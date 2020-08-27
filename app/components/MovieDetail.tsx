import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {SCREEN_WIDTH} from '@utils/CONSTANTS';

interface IMovieDetails {
    titleStyle?: object;
    containerStyle?: object;
    descriptionStyle?: object;
    title: string;
    description?: string;
}
const MovieDetails = ({
    titleStyle,
    containerStyle,
    descriptionStyle,
    title,
    description,
}: IMovieDetails) => {
    const titleString = description ? `${title}:` : title;
    return (
        <View style={[styles.container, containerStyle]}>
            <View>
                <Text style={[styles.title, titleStyle]}>{titleString}</Text>
                <Text style={[styles.description, descriptionStyle]}>
                    {description}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: SCREEN_WIDTH * 0.85,
        marginVertical: 10,
    },
    description: {
        fontSize: 20,
        textAlign: 'left',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'left',
    },
});

export default memo(MovieDetails);
