import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
    RefreshControl,
    SafeAreaView,
    StatusBar,
    StyleSheet,
} from 'react-native';
import {useValue} from 'react-native-redash';
import axios from 'axios';
import Movie from '@components/Movie';
import * as rax from 'retry-axios';
import type MovieType from '@app/types/Movie';
import {MOVIE_POSTER} from '@utils/CONSTANTS';
import List from '@components/List';
import SpinnerModal from '@components/SpinnerModal';
import MovieDetail from '@components/MovieDetail';

import Realm from 'realm';
import {MovieSchema, ReviewSchema} from '../realm/model/RealmModels';
// TODO : react-navigation-shared-element as per William Candillon

const Start = () => {
    const navigation = useNavigation();
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const interceptorId = useRef(rax.attach());

    const activeMovieId = useValue<number>(-1);

    // FIXME : add setTimeout for write after you've got a response

    // Read all object stored in Realm and load them upfront
    useEffect(() => {
        loadPersistedRealm();
    }, []);

    // Get movies on screen load
    useEffect(() => {
        getMovies();
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
            setFetching(true);
            console.log('attache', interceptorId);
            const movieResponse = await axios({
                method: 'post',
                url:
                    'https://us-central1-mattermost-764a8.cloudfunctions.net/generateMovies',
                data: {
                    movieCount: 44,
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
                        // const cfg = rax.getConfig(err);
                        console.log('Retry attempt <<<<<<<<<<<<<<');
                    },
                },
            });
            const movie = movieResponse?.data?.movies;
            setMovies(movie);
            setFetching(false);
            if (movie.length > 0) {
                await writeToRealm(movie);
            }
        } catch (e) {
            setFetching(false);
            setMovies([]);
            console.log('in error ', e);
        }
    }, []);

    const loadPersistedRealm = () => {
        return Realm.open({
            schema: [MovieSchema, ReviewSchema],
        }).then((realm) => {
            // FIXME :  this part is not clear
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
            <SpinnerModal modalVisible={fetching} />,
            <List
                bounces={true}
                data={movies}
                refreshing={fetching}
                onRefresh={getMovies}
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
                extraData={movies}
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
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>{renderMovieList()}</SafeAreaView>
        </>
    );
};

const Styles = StyleSheet.create({
    centerHeaderTitle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Start;
