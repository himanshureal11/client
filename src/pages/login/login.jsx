import { Alert, Button, TextField } from '@mui/material'
import React, {useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { EMAIL_VALIDATION } from '../../constant';
import { useAuth } from '../../stores';

function Login() {
    const authUser = useAuth()
    const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(false)
    const signIn = async (data = undefined) => {
        if(validate()) {
            loginUser(data)
        }
    }
    const loginUser = async (data) => {
        const loginUserData = data || userData
        const result = await authUser.login(loginUserData)
        if (result.data.status === 'success') {
            const data = result.data.data
            document.cookie = JSON.stringify({real11_user: data})
            await authUser.setUser(data)
            if(data.access_level < 100){
                navigate(`/user_detail`)
            }else{
                navigate('/subjects')
            }
        }else {
            setError({
                message: result.data.error.message
            })
            setTimeout(()=>{
                setError(false)
            },2000)
        }
    }
    const changeHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const checkUserLoggedIn = async () => {
        const data = JSON.parse(document.cookie)?.real11_user
        if (data) {
            if (data.token) {
                const verifyUserLoggedIn = await authUser.verifyuser()
                if (verifyUserLoggedIn.data.status === 'success') {
                    document.cookie = JSON.stringify({real11_user: verifyUserLoggedIn.data.data})
                    await authUser.setUser(verifyUserLoggedIn.data.data)
                    if(verifyUserLoggedIn.data.data.access_level < 100){
                        navigate(`/user_detail`)
                    }else{
                        navigate('/subjects')
                    }
                }else{
                    localStorage.removeItem('user_data')
                }
            }
        }
    }
    const validate = () => {
        if(!EMAIL_VALIDATION.test(userData.username)){
            return false
        }
        return true
    }
    useEffect(() => {
        setTimeout(() => {
            setShowForm(true)
        }, 2000)
        checkUserLoggedIn()
    })
    return (
        <>
        {error?.message &&
            <Alert severity="error" style={{position: 'fixed', right: '10px', margin: '10px 0', top: 0, background: '#ef8c8ca6'}}>{error.message}</Alert>
        }
            {!showForm &&
                <img src='https://real11.com/new_script/img/logo.png' alt='Real 11' />
            }
            {showForm &&
                <div style={{ width: '550px', background: '#fff', minHeight: '100px', boxShadow: '0 0 10px #000' }}>
                    <div style={{ background: '#36C4FF', textAlign: 'center' }}>
                        <img src='https://real11.com/new_script/img/logo.png' alt='Real 11' />
                    </div>
                    <div style={{ textAlign: 'center', padding: 20 }}>
                        <div style={{ width: '80%', margin: '15px auto' }}>
                            <TextField
                                fullWidth
                                type={'email'}
                                label='Email'
                                name='username'
                                value={userData.username}
                                onChange={changeHandler}
                                helperText={!isEmpty(userData.username) && !EMAIL_VALIDATION.test(userData.username) && 'Enter valid email address'}
                                error={!isEmpty(userData.username) && !EMAIL_VALIDATION.test(userData.username)}
                            >
                            </TextField>
                        </div>
                        <div style={{ width: '80%', margin: '15px auto', position: 'relative' }}>
                            <TextField
                                fullWidth
                                type={showPassword ? 'text' : 'password'}
                                label='Enter Password'
                                value={userData.password}
                                onChange={changeHandler}
                                name='password'                            
                            >
                            </TextField>
                            <div style={showPasswordIconStyle.iconDiv} onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOffIcon style={showPasswordIconStyle.icons} /> : <VisibilityIcon style={showPasswordIconStyle.icons} />}
                            </div>
                        </div>
                    </div>
                    <Button sx={{ display: 'block', margin: '10px auto', padding: '10px 30px', background: '#36C4FF' }} variant='contained' onClick={() => signIn()}>Sign In</Button>
                </div>
            }
        </>
    )
}

const showPasswordIconStyle = {
    iconDiv: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
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

export default Login