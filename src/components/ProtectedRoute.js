import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../stores'

function ProtectedRoute({access_level = 0 }) {
    const user = useAuth()
    const location = useLocation()
    return (user?.user?.username && user?.user?.access_level >= access_level) ? <Outlet /> : <Navigate to='/login' replace state={{ from: location }} /> 
}

export default ProtectedRoute