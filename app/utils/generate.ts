import 'react-native-get-random-values';
import {times} from 'rambdax';
import {v4 as uuid} from 'uuid';
import moviesData from '@data/Movies';
import reviewsData from '@data/Reviews';
import Movie from '@app/types/Movie';

const flatMap = (fn: (movie: Movie) => Movie, arr: Movie[]) =>
    arr.map(fn).reduce((a: Movie[], b) => {
        return a.concat(b);
    }, []);

const fuzzCount = (count: number) => {
    // makes the number randomly a little larger or smaller for fake data to seem more realistic
    const maxFuzz = 4;
    const fuzz = Math.round((Math.random() - 0.5) * maxFuzz * 2);
    return count + fuzz;
};

const makeRandomMovie = (i: number) => {
    const movie = moviesData[i];
    return {
        id: uuid(),
        ...movie,
    };
};

const makeRandomReview = (i: number) => {
    const review = {
        id: uuid(),
        body: reviewsData[i % reviewsData.length],
    };

    return review;
};

const makeReviews = (movie: Movie, count: number): Movie => {
    const reviews = times((i) => makeRandomReview(i), count);
    movie.reviews = reviews;
    return movie;
};

const generateMovies = (moviesCount: number, reviewsPerMovie: number) => {
    if (moviesData.length < 0) {
        // guard check
        return [];
    }

    const safeLength =
        moviesCount <= moviesData.length ? moviesCount : moviesData.length;
    const movies = times((i) => makeRandomMovie(i), safeLength);
    flatMap(
        (movie: Movie) => makeReviews(movie, fuzzCount(reviewsPerMovie)),
        movies,
    );

    return movies;
};

export default generateMovies;
