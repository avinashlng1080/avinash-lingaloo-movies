import Review from '@app/types/Review';

export const getProperData = (
    reviewData: string | Review | String[] | undefined,
) => {
    if (!reviewData) {
        return [];
    }
    return !Array.isArray(reviewData)
        ? JSON.parse(<string>reviewData)
        : reviewData;
};
