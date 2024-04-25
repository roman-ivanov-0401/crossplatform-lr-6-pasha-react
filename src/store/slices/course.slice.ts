import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourseModel } from '../../models/course.model'

export interface ICourseSliceState {
    currentCourse: CourseModel | undefined
}

const initialState: ICourseSliceState = {
    currentCourse: undefined,
}

export const courseSlice = createSlice({
    name: 'courseSlice',
    initialState,
    reducers: {
        setCurrentCourse(state, { payload }: PayloadAction<CourseModel>) {
            state.currentCourse = payload
        },
    },
})

export const { setCurrentCourse } = courseSlice.actions

export default courseSlice.reducer
