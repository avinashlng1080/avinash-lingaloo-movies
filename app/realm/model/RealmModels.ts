export const MovieSchema = {
    name: 'Movie',
    primaryKey: 'name',
    properties: {
        id: 'string?',
        name: 'string',
        poster: 'string',
        gender: 'string',
        description: 'string',
        reviews: 'string',
        cast: 'string',
        // reviews: {type: 'Review[]', default: []},
        // cast: {type: 'string[]', default: []},
    },
};

export const ReviewSchema = {
    name: 'Review',
    properties: {
        id: 'string?',
        body: 'string',
    },
};
