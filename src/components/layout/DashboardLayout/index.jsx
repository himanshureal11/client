import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../../stores'
import Header from './Header'
import Sidebar from './Sidebar'

function Index() {
    const user = useAuth(state => state.user)
    const height = window.innerHeight
    return (<Box component='div' style={{ minHeight: `${height}px`, display: 'flex' }}>
        <Header />
        {user.access_level > 50 && <Sidebar />}
        <Box component='div'  sx={{ flexGrow: 1, justifyContent: 'center', mt: '70px', display: 'flex', position: 'relative' }}>
            <Outlet />
        </Box>
    </Box>
    )
}

export default Index