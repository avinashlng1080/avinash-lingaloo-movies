import 'react-native-get-random-values';
import {times} from 'rambdax';
import {v4 as uuid} from 'uuid';
import moviesData from '@data/Movies';
import reviewsData from '@data/Reviews';

const flatMap = (fn, arr) => arr.map(fn).reduce((a, b) => a.concat(b), []);

const fuzzCount = (count) => {
    // makes the number randomly a little larger or smaller for fake data to seem more realistic
    const maxFuzz = 4;
    const fuzz = Math.round((Math.random() - 0.5) * maxFuzz * 2);
    return count + fuzz;
};

const makeRandomMovie = (i) => {
    const movie = moviesData[i];
    return {
        id: uuid(),
        ...movie,
    };
};

const makeRandomReview = (i) => {
    const review = {
        id: uuid(),
        body: reviewsData[i % reviewsData.length],
    };

    return review;
};

const makeReviews = (movie, count) => {
    const reviews = times((i) => makeRandomReview(i), count);
    movie.reviews = reviews;
};

const generateMovies = (moviesCount, reviewsPerMovie) => {
    const movies = times((i) => makeRandomMovie(i), moviesCount);

    flatMap((movie) => makeReviews(movie, fuzzCount(reviewsPerMovie)), movies);

    return movies;
};

export default generateMovies;
