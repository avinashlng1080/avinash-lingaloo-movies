import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {useValue} from 'react-native-redash';
import axios from 'axios';
import Movie from '@components/Movie';
import * as rax from 'retry-axios';
import type MovieType from '@app/types/Movie';
import {MOVIE_POSTER} from '@utils/CONSTANTS';
import List from '@components/List';
import SpinnerModal from '@components/SpinnerModal';
import MovieDetail from '@components/MovieDetail';

// TODO : react-navigation-shared-element as per William Candillon

const Start = () => {
    const navigation = useNavigation();
    const [movies, setMovies] = useState<MovieType[]>([]);
    const [fetching, setFetching] = useState<boolean>(true);

    const activeMovieId = useValue<number>(-1);

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

    const getMovies = async () => {
        try {
            setFetching(true);
            const interceptorId = rax.attach();
            console.log('attache', interceptorId);
            const movieResponse = await axios({
                method: 'post',
                url:
                    'https://us-central1-mattermost-764a8.cloudfunctions.net/generateMovies',
                data: {
                    movieCount: 1,
                    reviewsPerMovie: 1,
                },
                headers: {'Content-Type': 'application/json'},
                raxConfig: {
                    // Retry 3 times on requests that return a response (500, etc) before giving up.
                    retry: 3,
                    // Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
                    noResponseRetries: 1,
                    retryDelay: 100,

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
                        console.log('Retry attempt <<<<<<<<<<<<<<');
                    },
                },
            });
            const movie = movieResponse?.data?.movies;
            setMovies(movie);
            setFetching(false);
        } catch (e) {
            setFetching(false);
            setMovies([]);
            console.log('in error ', e);
        }
    };

    console.log('render <<<<<');

    const renderMovieList = () => {
        return (
            <List
                data={movies}
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
            />
        );
    };

    const renderSpinner = () => {
        return <SpinnerModal modalVisible={fetching} />;
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                {fetching ? renderSpinner() : renderMovieList()}
            </SafeAreaView>
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
