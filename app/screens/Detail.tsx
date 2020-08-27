import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import type MovieType from '@app/types/Movie';
import FastImage from 'react-native-fast-image';
import List from '@components/List';
import MovieDetail from '@components/MovieDetail';

type DetailParamList = {
    Detail: {
        movie: MovieType;
    };
};

type DetailRoute = RouteProp<DetailParamList, 'Detail'>;

const Detail = () => {
    const route = useRoute<DetailRoute>();
    const movie = route?.params?.movie;
    const navigation = useNavigation();

    if (movie?.name) {
        navigation.setOptions({title: movie?.name});
    }

    return (
        <View style={styles.container}>
            <List
                ListFooterComponent={() => {
                    const reviewData = movie?.reviews;

                    console.log('here ==> ', Array.isArray(reviewData));
                    console.log('here ==> ', reviewData);

                    // if (!reviewData) {
                    //     return null;
                    // }

                    const reviews =
                        typeof reviewData === 'string'
                            ? JSON.parse(reviewData)
                            : reviewData;

                    return [
                        <MovieDetail
                            key="ListFooter-MovieDetail"
                            title={'Reviews'}
                        />,
                        <View
                            key="ListFooter-View"
                            style={styles.reviewContainer}>
                            {reviewData.map((rev) => (
                                <Text
                                    key={`${rev?.id}`}
                                    style={styles.reviewDesc}>
                                    {rev?.body}
                                </Text>
                            ))}
                        </View>,
                    ];
                }}
                ListHeaderComponent={() => {
                    return (
                        <>
                            <FastImage
                                source={{uri: movie.poster}}
                                style={styles.image}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            {movie?.name && (
                                <MovieDetail
                                    title={'Title'}
                                    description={movie?.name}
                                />
                            )}
                            {movie?.description && (
                                <MovieDetail
                                    title={'Synopsis'}
                                    description={movie?.description}
                                />
                            )}
                            {movie?.gender && (
                                <MovieDetail
                                    title={'Genre'}
                                    description={movie?.gender}
                                />
                            )}
                            {movie?.cast && (
                                <Text style={styles.title}>Cast</Text>
                            )}
                        </>
                    );
                }}
                data={movie?.cast}
                renderItem={({item}: {item: string}) => {
                    return <Text style={styles.cast}>{item}</Text>;
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        marginVertical: 20,
        fontWeight: 'bold',
        fontSize: 25,
        marginLeft: 10,
        width: '80%',
        textAlign: 'center',
        alignSelf: 'center',
    },
    cast: {
        fontSize: 20,
        marginLeft: 20,
        alignSelf: 'center',
    },
    image: {
        width: 350,
        height: 350,
        alignSelf: 'center',
    },
    reviewDesc: {
        fontSize: 19,
    },
    reviewContainer: {marginLeft: 25},
});

export default memo(Detail);
