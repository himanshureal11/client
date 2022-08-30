import React from 'react'
import { Outlet } from 'react-router-dom'

function LoginLayout(props) {
    const height = window.innerHeight
  return (
    <div style={{minHeight: `${height}px`, width: '100%'}}>
        <div style={{height: `${height}px`, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#107aa7'}}>
            <Outlet />
        </div>
    </div>
  )
}

export default LoginLayout