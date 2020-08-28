import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {useValue} from 'react-native-redash';
import axios from 'axios';
import Movie from '@components/Movie';
import * as rax from 'retry-axios';
import type MovieType from '@app/types/Movie';
import {MOVIE_POSTER} from '@utils/CONSTANTS';
import List from '@components/List';
import MovieDetail from '@components/MovieDetail';
import Toast from 'react-native-toast-message';

import Realm from 'realm';
import {MovieSchema, ReviewSchema} from '../realm/model/RealmModels';
import {useNetInfo} from '@react-native-community/netinfo';

// TODO : react-navigation-shared-element as per William Candillon
// TODO : implement a service that would poll the movies endpoint after X amount of time

const Start = () => {
    const navigation = useNavigation();
    const [movies, setMovies] = useState<MovieType[]>([]);
    // const [fetching, setFetching] = useState<boolean>(false);
    const interceptorId = useRef(rax.attach());
    const activeMovieId = useValue<number>(-1);
    const netInfo = useNetInfo();

    // Read all object stored in Realm and load them upfront
    useEffect(() => {
        loadPersistedRealm();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            activeMovieId.setValue(-1);
        }, [activeMovieId]),
    );

    const open = (index: number, movie: MovieType) => {
        activeMovieId.setValue(index);
        return navigation.navigate('Detail', {movie: movie});
    };

    const getMovies = React.useCallback(async () => {
        try {
            Toast.show({
                type: 'info',
                position: 'bottom',
                text1: 'Loading...',
                text2: 'bringing latest movies from server',
                visibilityTime: 2000,
            });

            const movieResponse = await axios({
                method: 'post',
                url:
                    'https://us-central1-mattermost-764a8.cloudfunctions.net/generateMovies',
                data: {
                    movieCount: 45,
                    reviewsPerMovie: 4,
                },
                headers: {'Content-Type': 'application/json'},
                raxConfig: {
                    // Retry 3 times on requests that return a response (500, etc) before giving up.
                    retry: 5,
                    // Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
                    noResponseRetries: 1,
                    retryDelay: 300,

                    // Defaults to:['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT']
                    httpMethodsToRetry: ['POST'], // NOTE:  COMMENT THIS LINE TO SEE IT CRASHING AT 500 error code <<<<

                    // The response status codes to retry.
                    statusCodesToRetry: [
                        [100, 199],
                        [429, 429],
                        [500, 599],
                    ],

                    // You can set the backoff type.
                    // options are 'exponential' (default), 'static' or 'linear'
                    backoffType: 'exponential',
                    // You can detect when a retry is happening, and figure out how many
                    // retry attempts have been made
                    onRetryAttempt: (err) => {
                        const cfg = rax.getConfig(err);
                        console.log('Retry attempt <<<<<<<<<<<<<<', cfg);
                    },
                },
            });
            const movie = movieResponse?.data?.movies;
            const mergedMovies = [...movie, ...movies];
            const uniqueMovies = [...new Set(mergedMovies)];
            setMovies(uniqueMovies);
            // setFetching(false);
            if (movie.length > 0) {
                await writeToRealm(movie);
            }
        } catch (e) {
            // setFetching(false);
            console.log('Axios error ', e);
        }
    }, []);

    // Get movies on screen load
    useEffect(() => {
        const getMovieTimer = setTimeout(() => getMovies(), 800);
        return () => {
            clearTimeout(getMovieTimer);
        };
    }, [getMovies]);

    // If there's no internet at all
    useEffect(() => {
        console.log(netInfo);
        if (!netInfo.isInternetReachable) {
            Toast.show({
                type: 'error',
                position: 'top',
                autoHide: false,
                text1: 'NO INTERNET ACCESS',
                text2:
                    "We can't load the movies as your internet connectivity is currently not optimum",
                visibilityTime: 5000,
                topOffset: 50,
            });
        }
    }, [netInfo]);

    const loadPersistedRealm = () => {
        return Realm.open({
            schema: [MovieSchema, ReviewSchema],
        }).then((realm) => {
            const persistedMovies = JSON.parse(
                JSON.stringify(realm.objects('Movie')), // deep copy of the realm object
            );

            if (persistedMovies?.length > 0) {
                setMovies(persistedMovies);
            }
            realm.close();
        });
    };

    const writeToRealm = (movie: MovieType[]) => {
        return Realm.open({
            schema: [MovieSchema, ReviewSchema],
        })
            .then((realm) => {
                realm.write(() => {
                    movie.forEach((mov: MovieType) => {
                        realm.create('Movie', {
                            id: mov?.id ?? '',
                            name: mov?.name ?? '',
                            poster: mov?.poster ?? '',
                            gender: mov?.gender ?? '',
                            description: mov?.description ?? '',
                            reviews: mov?.reviews
                                ? JSON.stringify(mov?.reviews)
                                : '',
                            cast: mov?.cast ? JSON.stringify(mov?.cast) : '',
                        });
                    });
                });

                realm.close();
            })
            .catch((error) => {
                console.log('realm error ', error);
            });
    };

    const renderMovieList = () => {
        return [
            // <SpinnerModal key="SpinnerModal" modalVisible={fetching} />,
            <List
                key="MovieList"
                data={movies}
                // refreshing={fetching}
                // onRefresh={getMovies}
                getItemLayout={(data: MovieType[], index: number) => {
                    return {
                        length: MOVIE_POSTER,
                        offset: MOVIE_POSTER * index,
                        index,
                    };
                }}
                ListEmptyComponent={() => {
                    return (
                        <MovieDetail
                            title="No movies found"
                            containerStyle={Styles.centerHeaderTitle}
                        />
                    );
                }}
                ListHeaderComponent={() => {
                    return (
                        <MovieDetail
                            title="Movies"
                            containerStyle={Styles.centerHeaderTitle}
                        />
                    );
                }}
                renderItem={({
                    item,
                    index,
                }: {
                    item: MovieType;
                    index: number;
                }) => {
                    return (
                        <Movie
                            activeMovieId={activeMovieId}
                            index={index}
                            movie={item}
                            open={open}
                        />
                    );
                }}
            />,
        ];
    };

    return (
        <View style={Styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>{renderMovieList()}</SafeAreaView>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(143,188,143, 0.25)',
    },
    centerHeaderTitle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Start;
