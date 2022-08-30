import { Alert, Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../context/user.context'
import Styles from '../../common_styles/textField.module.scss'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ACCESS_LEVEL, EMAIL_VALIDATION } from '../../constant'
import { isEmpty } from 'lodash'
import { getAllSubjects } from '../../actions/subjects'
import { useSubjects } from '../../stores'

function AddUser() {
    const {subjects, setSubjects} = useSubjects()
    const navigate = useNavigate()
    const userContext = useContext(UserContext)
    const { id } = useParams()
    const [showPassword, setShowPassword] = useState(false)
    const [showAlert , setShowAlert] = useState(false)
    const [user, setUser] = useState({
        name: '',
        username: '',
        password: '',
        access_level: 50,
        subject_id: '',
    })
    const showAlertMessage = (message) => {
        setShowAlert({
            message
        })
        setTimeout(()=>{
            setShowAlert(false)
        },2000)
    }
    const validator = () => {
        if(isEmpty(user.name)){
            showAlertMessage('Name field cannot be empty')
            return false
        }
        if(isEmpty(user.username) || !EMAIL_VALIDATION.test(user.username)){
            showAlertMessage('Username field cannot be empty')
            return false
        }
        if(isEmpty(id) && isEmpty(user.password)){
            showAlertMessage('Password field cannot be empty')
            return false
        }
        if(isEmpty(user.subject_id)){
            showAlertMessage('Subject field cannot be empty')
            return false
        }
        return true
    }
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const onSubmit = () => {
        if(validator()){
            addOrEditUser()
        }
    }
    const addOrEditUser = async () => {
        let result
        if(id){
            const formData = new FormData()
            formData.append('data', JSON.stringify(user))
            result = await userContext.editUser(id, formData)
        }else{
            result = await userContext.addUser(user)
        }
        if(result.data.status === 'success'){
            navigate('/users', {replace: true})
        }else{
            console.log(">>>>>>", result);
        }
    }
    const getUser = async () => {
        const result = await userContext.getUser(id)
        if(result.data.status === 'success'){
            const userData = result.data.data
            setUser({
                name: userData.name,
                username: userData.username,
                access_level: userData.access_level,
                subject_id: userData.subject_id,
                password: ''
            })
        }
    }
    const getSubjects = async () => {
        const result = await getAllSubjects()
        if(result.data.status === 'success'){
            const subjects = result.data.data
            setSubjects([...subjects])
        }
    }
    useEffect(()=>{
        if(isEmpty(subjects)){
            getSubjects()
        }
        if(id && isEmpty(user.name)){
            getUser()
        }
    })
    return (
        <Box component={'form'} autoComplete="off" noValidate style={{ maxWidth: '50%', height: '100%' }}>
            {showAlert?.message &&
            <Alert variant="filled" severity="error" style={{position: 'fixed', right: '10px', margin: '10px 0'}}>
                {showAlert.message}
            </Alert>
            }
            <Typography className={`heading`} variant='h2'>{id ? 'Edit' : 'Add'} User</Typography>
            <TextField
                className={Styles.textField}
                type='text'
                value={user.name}
                name='name'
                fullWidth
                label="Name"
                variant="outlined"
                onChange={handleChange}
            />
            <TextField
                className={Styles.textField}
                type='email'
                name='username'
                value={user.username}
                fullWidth
                variant="outlined"
                label="Email"
                onChange={handleChange}
                helperText={!isEmpty(user.username) && !EMAIL_VALIDATION.test(user.username) && 'Enter valid email address'}
                error={!isEmpty(user.username) && !EMAIL_VALIDATION.test(user.username)}
            />
            <div style={{ position: 'relative' }}>
                <TextField
                    className={Styles.textField}
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label='Enter Password'
                    value={user.password}
                    onChange={handleChange}
                    name='password'
                >
                </TextField>
                <div style={showPasswordIconStyle.iconDiv} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon style={showPasswordIconStyle.icons} /> : <VisibilityIcon style={showPasswordIconStyle.icons} />}
                </div>
            </div>
            <TextField className={Styles.textField} name='access_level' value={user.access_level} select id="outlined-basic" label="User Type" variant="outlined" fullWidth onChange={handleChange}>
                {Object.keys(ACCESS_LEVEL)?.map((key, index) => <MenuItem key={index} value={ACCESS_LEVEL[key]}>{key}</MenuItem>)}
            </TextField>
            <TextField className={Styles.textField} name='subject_id' value={user.subject_id} select id="outlined-basic" label="Subject" variant="outlined" fullWidth onChange={handleChange}>
                {subjects.map((subject, index) => <MenuItem key={index} value={subject._id}>{subject.subject_name}</MenuItem>)}
            </TextField>
            <Button variant='contained' sx={{ margin: 'auto', display: 'block', width: '40%' }} onClick={onSubmit} >{id ? 'Update' : 'Add'} User</Button>
        </Box>
    )
}

const showPasswordIconStyle = {
    iconDiv: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: '85%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50px'
    },
    icons: {
        color: '#7a7a7a',
        fontSize: '30px',
        cursor: 'pointer'
    }
}

export default AddUser