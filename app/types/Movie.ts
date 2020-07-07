import type Review from './Review';

export default interface Movie {
    id?: string;
    name: string;
    poster: string;
    gender: string;
    description: string;
    reviews?: Array<Review>;
}
