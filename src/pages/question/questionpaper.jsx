import { Button, Typography } from '@mui/material'
import { capitalize, isEmpty } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SimpleBackdrop from '../../components/Backdrop'
import Question from '../../components/question'
import { QuestionContext } from '../../context/question.context'


function QuestionPaper(props) {
    const question = useContext(QuestionContext)
    const { name, id } = useParams()
    const navigate = useNavigate()
    const [questionData, setQuestionData] = useState([])
    const [backDropOpen, setBackDropOpen] = useState(false)
    const closeBackDrop = () => {
        setBackDropOpen(false)
    }
    const deleteQuestion = async (data) => {
        const result = await question.deleteQuestion(data._id)
        if(result.data.status === 'success'){
            getQuestions()
        }
    }
    const editQuestion = (data) => {
        navigate(`/edit_question/${data._id}/${true}/${id}/${name}`)
    }
    const getQuestions = async () => {
        const result = await question.getQuestions(id)
        if(result.data.status === 'success'){
            const data = result.data.data
            setQuestionData([...data])
        }
    }
    useEffect(() => {
        if(isEmpty(questionData)){
            getQuestions()
        }
    })
    return (
        <div style={{ width: '100%' }}>
            <SimpleBackdrop open={backDropOpen} onClose={closeBackDrop}></SimpleBackdrop>
            <Typography className={`heading`} variant='h3'>{capitalize(name)} Questions</Typography>
            {questionData.map((data, i) => <Question key={i} deleteQuestion={deleteQuestion} editQuestion={editQuestion} data={{...data, number: i+1}} />)}
            <div style={{textAlign: 'center', padding: '1rem'}}>
                <Button component={Link} to={`/add_question/${name}/${id}`} variant="contained" color="primary" >
                    Add Question
                </Button>
            </div>
        </div>
    )
}

export default QuestionPaper