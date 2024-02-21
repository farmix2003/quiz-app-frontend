import { api } from "./api";

export const createQuiz = async (category, numQ, title) => {
    try {
        const newQuiz = await api.post(`/quiz/create?category=${category}&numQ=${numQ}&title=${title}`)
        return newQuiz.data
    } catch (error) {
        throw new Error(error);
    }
}
export const getAllQuizzes = async () => {
    try {
        const response = await api.get('/quiz/allQuizzes')
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}
export const getQuizQuestion = async (id) => {
    try {
        const response = await api.get(`/quiz/get/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}
export const calculateResponse = async (quizId, responses) => {
    try {
        const response = await api.post(`/quiz/submit/${quizId}`, responses)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}