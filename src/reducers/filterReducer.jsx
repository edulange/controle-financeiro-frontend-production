import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
	name: 'filter',
	initialState: '00', // Inicialize com '00' para "Todos os Meses"
	reducers: {
		setFilter: (state, action) => {
			return action.payload
		},
	},
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
