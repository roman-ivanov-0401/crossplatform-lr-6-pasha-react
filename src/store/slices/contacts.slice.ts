import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContactModel } from '../../models/contact.model'

interface IContactsSliceState {
    currentContact: ContactModel | undefined
}

const initialState: IContactsSliceState = {
    currentContact: undefined,
}

export const contactsSlice = createSlice({
    name: 'contactSlice',
    initialState,
    reducers: {
        setCurrentContact(state, { payload }: PayloadAction<ContactModel>) {
            state.currentContact = payload
        },
    },
})

export default contactsSlice.reducer

export const { setCurrentContact } = contactsSlice.actions
