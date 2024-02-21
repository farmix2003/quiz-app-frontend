import { api } from "./api"

export const getAllQuestions = async () => {
    try {
        const response = await api.get('/questions/allQuestions')
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}
export const getQuestionsByCategory = async (topic) => {
    try {
        const response = await api.get(`questions/category/${topic}`)
        return response.data
    } catch (error) {
        throw new Error(error)
    }
}
export const addNewQuestion = async (category, difficulty_level, option1, option2, option3, option4, question_title, right_answer) => {
    try {
        const newQuestion = await api.post('/questions/add', {
            category,
            difficultylevel: difficulty_level,
            option1,
            option2,
            option3,
            option4,
            question_title,
            right_answer
        });
        return newQuestion.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to add question');
    }
}

