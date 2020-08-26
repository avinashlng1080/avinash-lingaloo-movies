import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {useValue} from 'react-native-redash';

import Modal from '@components/Modal';
import Movie from '@components/Movie';

import type MovieType from '@app/types/Movie';
import type PositionType from '@app/types/Position';
import {MOVIE_POSTER} from '@utils/CONSTANTS';
import List from '@components/List';

interface ModalState {
    movie: MovieType;
    position: PositionType;
}

type StartParamList = {
    Start: {
        movies: Array<MovieType>;
    };
};

type StartRoute = RouteProp<StartParamList, 'Start'>;

const Start = () => {
    const route = useRoute<StartRoute>();
    const navigation = useNavigation();
    const {movies} = route?.params;

    const activeMovieId = useValue<number>(-1);
    const [modal, setModal] = useState<ModalState | null>(null);

    const open = (index: number, movie: MovieType, position: PositionType) => {
        return navigation.navigate('Detail', {movie: movie});
    };

    const close = () => {
        activeMovieId.setValue(-1);
        setModal(null);
    };
    console.log('render <<<<<');
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <List
                    data={movies}
                    getItemLayout={(data: MovieType[], index: number) => {
                        return {
                            length: MOVIE_POSTER,
                            offset: MOVIE_POSTER * index,
                            index,
                        };
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
                {modal !== null && <Modal {...modal} close={close} />}
            </SafeAreaView>
        </>
    );
};

export default Start;
