export const getProperData = (reviewData) => {
    if (!reviewData) {
        return [];
    }
    return !Array.isArray(reviewData) ? JSON.parse(reviewData) : reviewData;
};
