import { apiCalling, API_REQUEST_TYPE } from "../constant"
import { ADD_AND_GET_SUBJECT, EDIT_AND_DELETE_SUBJECT } from "../constant/endpoint"

export const getAllSubjects =  async () => {
    return await apiCalling(API_REQUEST_TYPE.GET, ADD_AND_GET_SUBJECT)
}

export const deleteSubjectById = async (id) => {
    return await apiCalling(API_REQUEST_TYPE.DELETE,EDIT_AND_DELETE_SUBJECT.replace(':id', id))
}

export const addAndEditSubject = async (data,id = undefined) => {
    if(id){
        return await apiCalling(API_REQUEST_TYPE.PATCH,EDIT_AND_DELETE_SUBJECT.replace(':id',id), data)
    }else{
        return await apiCalling(API_REQUEST_TYPE.POST, ADD_AND_GET_SUBJECT, data)
    }
}