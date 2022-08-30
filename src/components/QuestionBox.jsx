import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

function QuestionBox(props) {
    const data = props?.data
    const [checked, setChecked] = useState('')
    const handleChange = (e) => {
        setChecked(e.target.name)
    }
    return (
        <div style={{ margin: 20 }}>
            <div style={{height: '60px', display: 'flex'}}> <span style={{color: '#000', fontWeight: 'bold', fontSize: 26}}>Q</span><Typography variant='h6' ml={2}>{data?.question}</Typography></div>
            <FormGroup>
                <Box>
                    <Grid container>
                        {data?.options.map((option,i) => {
                            return <Grid item xs={6} key={i} sx={{margin: 1}}>
                                <FormControlLabel control={<Checkbox name={option.option} onChange={(e) => {
                                    props.handleSelected({ id: data._id, ...option })
                                    handleChange(e)
                                }
                                } checked={checked === option.option} />} label={option.option} />
                            </Grid>
                        })
                        }
                    </Grid>
                </Box>
            </FormGroup>
        </div>
    )
}

export default QuestionBox

