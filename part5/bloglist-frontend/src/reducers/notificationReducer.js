import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', type: '' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (_state, action) => action.payload,
    clearNotification: () => initialState
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, type = 'info', durationMs = 5000) => dispatch => {
  dispatch(setNotification({ message, type }))
  setTimeout(() => dispatch(clearNotification()), durationMs)
}

export default notificationSlice.reducer
