import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { QuestionContext } from '../../context/question.context'
import Alert from '@mui/material/Alert';
import Styles from '../../common_styles/textField.module.scss'
import { isEmpty } from 'lodash';

function AddQuestion() {
    const navigate = useNavigate()
    const questionContext = useContext(QuestionContext)
    const { id, edit, subject_id, name } = useParams()
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState([{ question_id: 1, option: '', isCorrect: false }, { question_id: 2, option: '', isCorrect: false }, { question_id: 3, option: '', isCorrect: false }, { question_id: 4, option: '', isCorrect: false }])
    const [correctAnswer, setCorrectAnswer] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const setCorrectAnswerSelect = (e) => {
        setCorrectAnswer(e.target.value)
    }
    function getDifference(array1, array2) {
        return array1.filter(object1 => {
            return !array2.some(object2 => {
                return object1.question_id === object2.question_id;
            });
        });
    }

    const onSumbit = async () => {
        if (validate()) {
            addQuestion()
        }
    }
    const addQuestion = async () => {
        let result;
        const differentItems = getDifference(options, correctAnswer)
        const correctOption = correctAnswer.map(answer => { return { ...answer, isCorrect: true } })
        const optionsArray = [...correctOption, ...differentItems]
        if (id) {
            const data = {
                subject_id: subject_id,
                question: question,
                options: optionsArray
            }
            result = await questionContext.updateQuestion(data, id)
        } else {
            const data = {
                subject_id: subject_id,
                question: question,
                options: optionsArray
            }
            result = await questionContext.addQuestion(data)
        }
        if (result.data.status === 'success') {
            navigate(`/questions/${name}/${subject_id}`, { replace: true })
        }
    }

    const getQuestion = async () => {
        const result = await questionContext.getQuestion(id)
        if (result.data.status === 'success') {
            const data = result.data.data
            setQuestion(data.question)
            const options = data.options.map((option, i) => {return {question_id: i+1, ...option}})
            setOptions(options)
        }
    }
    const validate = () => {
        const optionsFilled = options.some(option => isEmpty(option.option))
        if (isEmpty(question)) {
            showAlertMessage('Fill the question')
            return false
        }
        if (optionsFilled) {
            showAlertMessage('fill all the options field')
            return false
        }
        if (isEmpty(correctAnswer)) {
            showAlertMessage('Select the correct answer')
            return false
        }
        return true
    }
    const showAlertMessage = (message) => {
        setShowAlert({
            message: message
        })
        setTimeout(() => {
            setShowAlert(false)
        }, 2000);
    }
    useEffect(() => {
        if (edit && isEmpty(question)) {
            getQuestion()
        }
    })
    useEffect(()=>{
        if(!isEmpty(options)){
            const correctAnswer = options.filter(correct => correct.isCorrect)
            setCorrectAnswer([...correctAnswer])
        }
    }, [options])
    return (
        <Box component={'div'} style={{ maxWidth: '90%', height: '100%', m: 'auto' }}>
            {showAlert &&
                <Alert variant="filled" severity="error" style={{ position: 'fixed', right: '10px', margin: '10px 0' }}>
                    {showAlert?.message}
                </Alert>
            }
            <Typography className={`heading`} variant='h2'>{edit ? 'Edit' : 'Add'} Question</Typography>
            <TextField className={Styles.textField} id="outlined-basic" value={question} fullWidth label="Write Your Question ?" variant="outlined" onChange={(e) => setQuestion(e.target.value)} />
            <TextField className={Styles.textField} id="outlined-basic" value={options[0].option} fullWidth variant="outlined" label="option a" onChange={(e) => setOptions([{ ...options[0], option: e.target.value }, options[1], options[2], options[3]])} />
            <TextField className={Styles.textField} id="outlined-basic" value={options[1].option} fullWidth variant="outlined" label="option b" onChange={(e) => setOptions([options[0], { ...options[1], option: e.target.value }, options[2], options[3]])} />
            <TextField className={Styles.textField} id="outlined-basic" value={options[2].option} fullWidth variant="outlined" label="option c" onChange={(e) => setOptions([options[0], options[1], { ...options[2], option: e.target.value }, options[3]])} />
            <TextField className={Styles.textField} id="outlined-basic" value={options[3].option} fullWidth variant="outlined" label="option D" onChange={(e) => setOptions([options[0], options[1], options[2], { ...options[3], option: e.target.value }])} />
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select answer</InputLabel>
                <Select multiple className={Styles.textField} value={correctAnswer} id="outlined-basic" label="select answer" variant="outlined" fullWidth onChange={setCorrectAnswerSelect}>
                    {options?.map((data,i) => <MenuItem key={i} value={data}>{data.option}</MenuItem>)}
                </Select>
            </FormControl>
            <Button variant='contained' sx={{ margin: 'auto', display: 'block', width: '30%' }} onClick={onSumbit} >{edit ? 'Update' : 'Add'} Question</Button>
        </Box>
    )
}

export default AddQuestion