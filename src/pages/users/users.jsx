import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid, Stack, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { UserContext } from '../../context/user.context';
import Styles from '../../common_styles/card.module.css'
import { isEmpty } from 'lodash';

export default function Users() {
    const navigate = useNavigate()
    const userContext = useContext(UserContext)
    const [users, setUsers] = useState([])
    const getUsers = async () => {
        const result = await userContext.getUsers()
        if (result.data.status === 'success') {
            const users = result.data.data
            setUsers([...users])
        }
    }
    const deleteUser = async (e, id) => {
        e.preventDefault()
        const result = await userContext.deleteUser(id)
        if (result.data.status === 'success') {
            getUsers()
        }
    }
    const editUser = async (e, id) => {
        e.preventDefault()
        navigate(`/edit_user/${id}`, { replace: true })
    }
    useEffect(() => {
        if(isEmpty(users)){
            getUsers()
        }
    })
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={2} columnSpacing={'auto'} columns={{ xs: 4, sm: 12, md: 12, lg: 12 }} sx={{m : 0, width: '100%', }}>
                {users?.map((user, i) => <Grid key={i} item xs sm={4} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Paper elevation={6} className={Styles.card_paper}>
                        <Link to={`/user/${user._id}`} style={{ textDecoration: 'none', color: '#000', width: 'inherit' }}>
                            <Typography variant='p' component={'p'} noWrap width={'inherit'}>{user.access_level === 100 ? 'ADMIN' : 'STUDENT'}</Typography>
                            <Typography variant='h6' component={'h6'} noWrap fontWeight={600} letterSpacing={1} width={'inherit'}>
                                {(user.name).toUpperCase()}
                            </Typography>
                            <Typography variant='p' component={'p'} noWrap width={'inherit'} padding={'0 5px'}>{user.username}</Typography>
                        </Link>
                        <Box component={'div'} sx={{ position: 'absolute', top: '1rem', right: 0, zIndex: 9 }}>
                                <DeleteIcon style={{ color: 'red', margin: '0 .5rem', cursor: 'pointer' }} onClick={(e) => deleteUser(e, user._id)} />
                                <EditIcon style={{ color: 'blue', margin: '0 .5rem', cursor: 'pointer' }} onClick={(e) => editUser(e, user._id)} />
                        </Box>
                    </Paper>
                </Grid>)}
                <Grid item  xs sm={4} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Paper elevation={6} className={Styles.card_paper} onClick={() => navigate(`/add_user`)}>
                        <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                            <AddCircleRoundedIcon sx={{ fontSize: 100, color: 'blue' }} />
                            <Typography variant='h6' fontWeight={600}>
                                Add User
                            </Typography>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}