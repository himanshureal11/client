import axios from 'axios';

export const ACCESS_LEVEL = {
    ADMIN: 100,
    STUDENT: 50
}


export const EMAIL_VALIDATION = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


export const FILE_UPLOAD = {
    USER_PROFILE_PIC: 'USER_PROFILE_PIC',
    USER_PIC_WITH_GOVERNMENT_ID: 'USER_PIC_WITH_GOVERNMENT_ID'
}

export const API_REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
}

export const apiCalling = async (type, api, data = undefined) => {
    switch (type) {
        case API_REQUEST_TYPE.GET:
            return await axios.get(api)
        case API_REQUEST_TYPE.POST:
            return await axios.post(api, data)
        case API_REQUEST_TYPE.DELETE:
            return await axios.delete(api)
        case API_REQUEST_TYPE.PATCH:
            return axios.patch(api, data)
        default:
            break;
    }
}