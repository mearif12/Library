import instance from '../../../environment/axiosInstance';

export const getBooks = async () => {
    try {
        const response = await instance.get('/api/student/book');
        return response;
    } catch (error) {
        throw error;
    }
};

export const searchBook = async (sem) => {
    try {
        const response = await instance.get(`/api/student/book/search/${sem}`);
        return response;
    } catch (error) {
        throw error;
    }
};