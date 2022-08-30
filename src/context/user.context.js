import axios from 'axios'
import React, { createContext } from 'react'
import { ADD_AND_GET_USER, GET_EDIT_DELETE_USER } from '../constant/endpoint'


export const UserContext = createContext()

function UserContextProvider(props) {
  const getUsers = async () => {
      const result = await axios.get(ADD_AND_GET_USER)
      return result
  }
  const addUser = async (data) => {
    const result = await axios.post(ADD_AND_GET_USER,data)
    return result
  }
  const deleteUser = async (id) => {
    const result = await axios.delete(GET_EDIT_DELETE_USER.replace(':id', id))
    return result 
  }
  
  const getUser = async (id) => {
    const result = await axios.get(GET_EDIT_DELETE_USER.replace(':id', id))
    return result 
  }
  
  const editUser = async (id, data) => {
    const result = await axios.patch(GET_EDIT_DELETE_USER.replace(':id', id), data)
    return result 
  }

  return (
    <UserContext.Provider
    value={{
        getUsers,
        addUser,
        deleteUser,
        getUser,
        editUser,
    }}
    >

        {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider