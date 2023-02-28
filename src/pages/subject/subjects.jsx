import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { capitalize, isEmpty } from 'lodash';
import Styles from '../../common_styles/card.module.css'
import { useSubjects } from '../../stores';
import { addAndEditSubject, deleteSubjectById, getAllSubjects } from '../../actions/subjects';

export default function Subjects(props) {
    const {subjects, setSubjects} = useSubjects()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [id,setId] = useState(undefined)
    const [error,setError] = useState(false)
    
    const handleClose = () => {
        setDialogOpen(false)
        setInputValue('')
        setId(undefined)
    }
    const onSubmit = async () => {
        if(validate()){
            const data = {
                subject_name: inputValue
            }
            const result = await addAndEditSubject(data, id)
            if(result.data.status === 'success'){
                getSubjects()
                handleClose()
            }
        }
    }
    const getSubjects = async () => {
        const result = await getAllSubjects()
        if(result.data.status === 'success'){
            const subjects = result.data.data
            if(!isEmpty(subjects)){
                setSubjects([...subjects])
            }
        }
    }
    const deleteSubject = async (e, id) => {
        e.preventDefault()
        const result =  await deleteSubjectById(id)
        if(result.data.status === 'success'){
            const data = subjects.filter(data => data._id !== id)
            setSubjects(data)
        }
    }
    const editSubject = async (e, data) => {
        e.preventDefault()
        setDialogOpen(true)
        setId(data._id)
        setInputValue(data.subject_name)
    }
    const validate = () => {
        if(isEmpty(inputValue)){
            setError(true)
            return false
        }
        return true
    }
    useEffect(()=>{
        if(isEmpty(subjects)){
            getSubjects()
        }
    })
    return (
        <Box sx={{ width: '100%' }}>
            <Dialog open={dialogOpen} onClose={handleClose}>
                <div style={{ width: 500 }}>
                    <Typography variant='h5' sx={{ textAlign: 'center', m: 2, fontWeight: 600 }}>Add Subject</Typography>
                    <DialogContent>
                        <TextField
                            label="Add Subject"
                            type='text'
                            fullWidth
                            variant='outlined'
                            value={inputValue}
                            onChange={(e) => {
                                setError(false)
                                setInputValue(e.target.value)
                            }}
                            helperText={error && 'This field cannot be null'}
                            error={error}
                        />
                    </DialogContent>
                    <DialogActions sx={{alignItems: 'center', justifyContent: 'center'}}>
                        <Button variant='contained' size='large' color='error' fullWidth onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' size='large' fullWidth onClick={onSubmit}>Submit</Button>
                    </DialogActions>
                </div>
            </Dialog>
            <Grid container rowSpacing={2} columnSpacing={'auto'} columns={{ xs: 4, sm: 12, md: 12, lg: 12 }} sx={{m : 0, width: '100%'}}>
                {subjects?.map((subject, i) => <Grid key={i} item  xs sm={4} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Paper elevation={6} className={Styles.card_paper} ><Link to={`/questions/${subject.subject_name}/${subject._id}`} style={{ textDecoration: 'none', color: '#000' }}><Typography variant='h5' fontWeight={700} letterSpacing={3}>{capitalize(subject.subject_name)}</Typography><div style={{position: 'absolute', top: '1rem', right: 0, zIndex: 9}}><DeleteIcon style={{color: 'red', margin: '0 .5rem',cursor: 'pointer'}} onClick={(e)=>deleteSubject(e,subject._id)} /> <EditIcon style={{color: 'blue', margin: '0 .5rem',cursor: 'pointer'}} onClick={(e)=>editSubject(e, subject)} /></div></Link></Paper></Grid>)}
                <Grid item xs sm={4} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Paper elevation={6} className={Styles.card_paper} onClick={()=>setDialogOpen(true)}><Stack sx={{ justifyContent: 'center', alignItems: 'center' }}><AddCircleRoundedIcon sx={{ fontSize: 100, color: 'blue' }} /><Typography variant='h6' fontWeight={600}>Add Subject</Typography></Stack></Paper></Grid>
            </Grid>
        </Box>

    );
}
