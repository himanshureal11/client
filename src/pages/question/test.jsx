import { Button } from '@mui/material'
import { isEmpty } from 'lodash'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionBox from '../../components/QuestionBox'
import { QuestionContext } from '../../context/question.context'
import { useAuth } from '../../stores'
import Webcam from "react-webcam";

function Test() {
    const question = useContext(QuestionContext)
    const user = useAuth()
    const webCamRef = useRef(null);
    const navigate = useNavigate()
    const { id } = useParams()
    const [answer, setAnswer] = useState([])
    const [questionData, setQuestionData] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [userAlreadyAttempt, setUserAlreadyAttempt] = useState(true)
    const getQuestions = async () => {
        const result = await question.getQuestions(id)
        if (result.data.status === 'success') {
            const data = result.data.data
            setQuestionData([...data])
            setCurrentQuestion(0)
        }
    }
    const submitAnswers = async () => {
        if (answer.length < questionData.length) {
            alert('Attempt all the questions')
        } else {
            const data = {
                user_id: user.user.id,
                answers: answer,
            }
            const result = await question.submitAnswers(data)
            if (result.data.status === 'success') {
                navigate('/thank')
            }
        }
    }
    const handleOnChange = (option) => {
        const filterArray = answer?.filter(data => data?.id !== option.id)
        setAnswer([...filterArray, option])
    }
    const nextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1)
    }
    const previousQuestion = () => {
        setCurrentQuestion(currentQuestion - 1)
    }
    const getUserAnswer = async (id) => {
        const result = await question.getUserAnswer(id)
        if (!isEmpty(result.data.data)) {
            navigate('/thank')
        }else{
            setUserAlreadyAttempt(false)
        }
    }
    useEffect(() => {
        if(isEmpty(questionData)){
            getQuestions()
        }
    })
    useEffect(() => {
        if (userAlreadyAttempt) {
            getUserAnswer(user?.user?.id)
        }
    })
    return (
        <>
            <Webcam
              imageSmoothing={true}
              audio={false}
              ref={webCamRef}
              screenshotFormat="image/png"
              width={'200px'}
              style={{position: 'absolute',top: 10, right: 10}}
            />
            <div style={{ position: 'absolute', top: 10,left: 10}}>{(currentQuestion + 1) + '/' + questionData.length}</div>
            <div style={{ width: '100%', alignSelf: 'center' }}>
                <div style={{ width: '100%' }}>
                    <QuestionBox data={questionData[currentQuestion]} handleSelected={handleOnChange} />
                </div>
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <Button variant="contained" disabled={currentQuestion === 0} color="primary" sx={{ m: 1 }} onClick={previousQuestion}>
                        previous
                    </Button>
                    <Button variant="contained" disabled={questionData.length === (currentQuestion + 1)} color="primary" sx={{ m: 1 }} onClick={nextQuestion}>
                        Next
                    </Button>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <Button variant='contained' color='success' size='large' onClick={submitAnswers}>Submit</Button>
                </div>
            </div>
        </>
    )
}

export default Test