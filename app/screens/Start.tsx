import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    useWindowDimensions,
} from 'react-native';
import {useValue} from 'react-native-redash';

import Modal from '@components/Modal';
import Movie from '@components/Movie';

import type MovieType from '@app/types/Movie';
import type PositionType from '@app/types/Position';
import {MOVIE_POSTER} from '@utils/CONSTANTS';

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
    const {movies} = route.params;
    const activeMovieId = useValue<number>(-1);
    const [modal, setModal] = useState<ModalState | null>(null);

    const open = (index: number, movie: MovieType, position: PositionType) => {
        activeMovieId.setValue(index);
        setModal({movie, position});
    };

    const close = () => {
        activeMovieId.setValue(-1);
        setModal(null);
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <FlatList
                    bounces={false}
                    contentInsetAdjustmentBehavior="automatic"
                    data={movies}
                    initialNumToRender={5}
                    maxToRenderPerBatch={5}
                    keyExtractor={(item, index) => `${item.name}-${index}`}
                    getItemLayout={(data, index) => {
                        return {
                            length: MOVIE_POSTER,
                            offset: MOVIE_POSTER * index,
                            index,
                        };
                    }}
                    renderItem={({item, index}) => {
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
