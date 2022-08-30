import { Box } from '@mui/system'
import { isEmpty } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { QuestionContext } from '../../context/question.context'
import { UserContext } from '../../context/user.context'

function User() {
    const {id} = useParams()
    const userContext = useContext(UserContext)
    const questionContext = useContext(QuestionContext)
    const [user, setUser] = useState({})
    const [correctAnswer, setCorrectAnswer] = useState(0)
    const getUser = async () => {
        const result = await userContext.getUser(id)
        if(result.data.status === 'success'){
            const userData = result.data.data
            setUser({...userData})
        }
    }
    const getUserAnswer = async () => {
        const result = await questionContext.getUserAnswer(id)
        if(result.data.status === 'success'){
            const correctAnswer = result?.data?.data?.answers?.filter(answer=> answer.isCorrect)
            setCorrectAnswer(correctAnswer?.length)
        }
    } 
    useEffect(()=>{
        if(id && isEmpty(user)){
            getUser()
            getUserAnswer()
        }
    })
  return (
    <Box sx={{width: '100%', height: '100%',}}>
        <div>Name: {user?.name}</div>
        <div>Email: {user?.username}</div>
        <div>Mobile: {user?.mobile}</div>
        <div>User Type: {user?.access_level === 100 ? 'ADMIN' : 'STUDENT'}</div>
        {correctAnswer && <div>Correct Answers: {correctAnswer}</div>}
    </Box>
  )
}

export default User