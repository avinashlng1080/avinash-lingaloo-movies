import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';
import {useValue} from 'react-native-redash';
import axios from 'axios';
import Movie from '@components/Movie';

import type MovieType from '@app/types/Movie';
import {MOVIE_POSTER} from '@utils/CONSTANTS';
import List from '@components/List';
import SpinnerModal from '@components/SpinnerModal';

type StartParamList = {
    Start: {
        movies: Array<MovieType>;
    };
};

// TODO : show processing spinner when fetching for movies
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
            console.log('in useFocusEffect');
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
            const movieResponse = await axios({
                method: 'post',
                url:
                    'https://us-central1-mattermost-764a8.cloudfunctions.net/generateMovies',
                data: {
                    movieCount: 1,
                    reviewsPerMovie: 1,
                },
                headers: {'Content-Type': 'application/json'},
            });
            const movie = movieResponse?.data?.movies;
            setMovies(movie);
            setFetching(false);
        } catch (e) {
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
                    return <Text>No movies found</Text>; // FIXME : improve styling here
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
        console.log('>>> <<<<');
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

export default Start;
