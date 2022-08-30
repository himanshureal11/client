import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Styles from './question.module.scss'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Question(props) {
    const data = props.data
    return (
        <div className={Styles.card}>
            <div className={Styles.question}>
                <div>Q {data.number} {data.question}</div> <div style={{position: 'absolute', right: 0,padding: 5, top: 0}}><DeleteIcon style={{color: 'red',cursor: 'pointer'}} onClick={()=>props.deleteQuestion(data)} /> <EditIcon style={{color: 'blue',cursor: 'pointer'}} onClick={()=>props.editQuestion(data)} /></div> </div>
            <Box>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {data.options.map((option, i) => <Grid key={i} item xs={6}><Typography noWrap style={{color: option.isCorrect ? 'green' : 'black'}}>{option.option}</Typography></Grid>)}
                </Grid>
            </Box>
        </div>
    )
}

export default Question