import axios from 'axios'
import React, { createContext } from 'react'
import { GET_QUESTIONS, GET_EDIT_AND_DELETE_QUESTION, ADD_QUESTIONS, SUBMIT_ANSWER, USER_ANSWER } from '../constant/endpoint'

export const QuestionContext = createContext()

function QuestionContextProvider({ children }) {
    const getQuestions = async (subjectId) => {
        const result = await axios.get(GET_QUESTIONS.replace(':id', subjectId))
        return result
    }
    const deleteQuestion = async (id) => {
        const result = await axios.delete(GET_EDIT_AND_DELETE_QUESTION.replace(':id', id))
        return result
    }
    
    const getQuestion = async (id) => {
        const result = await axios.get(GET_EDIT_AND_DELETE_QUESTION.replace(':id', id))
        return result
    }
    
    const updateQuestion = async (data,id) => {
        const result = await axios.patch(GET_EDIT_AND_DELETE_QUESTION.replace(':id', id), data)
        return result
    }
    const addQuestion = async (data) => {
        const result = await axios.post(ADD_QUESTIONS, data)
        return result
    }
    
    const submitAnswers = async (data) => {
        const result = await axios.post(SUBMIT_ANSWER, data)
        return result
    }

    const getUserAnswer = async (id) => {
        const result = await axios.get(USER_ANSWER.replace(':id', id))
        return result
    }

    return (
        <QuestionContext.Provider value={{
            getQuestions,
            deleteQuestion,
            getQuestion,
            updateQuestion,
            addQuestion,
            submitAnswers,
            getUserAnswer
        }}>
            {children}
        </QuestionContext.Provider>
    )
}

export default QuestionContextProvider