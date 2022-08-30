import axios from 'axios'
import { isEmpty } from 'lodash'
import create from 'zustand'
import { CHECK_USER_LOGEDIN, LOGIN_USER } from '../constant/endpoint'

// zustand store create

const isAuth =  !isEmpty(document.cookie) && JSON.parse(document.cookie)?.real11_user

export const useAuth = create((set) => ({
    user: isAuth,
    pageRefresh: false,
    pathname: '',
    login: async (user) => {
        const result = await axios.post(LOGIN_USER, user)
        return result
    },
    verifyuser: async () => {
        const user = await axios.get(CHECK_USER_LOGEDIN)
        return user
    },
    setUser: (data) =>  set({ user: data }),
    setPathName: (path) => set({pathname: path, pageRefresh: true})
}))
