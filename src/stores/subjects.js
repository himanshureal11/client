import create from 'zustand'

export const useSubjects = create((set)=>({
    subjects: [],
    setSubjects: (data) =>  set({ subjects: data }),
}))