import { createSlice, current, nanoid } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import FavesModal from '../components/Faves/favesModal'

const createFave = (fave, name) => ({
	id: nanoid(),
	rating: 5,
	name,
	...fave,
})
const initialState = []

export const favesSlice = createSlice({
	name: 'faves',
	initialState,
	reducers: {
		addFave: (state, action) => {
			const name = action.payload.name ? action.payload.name : action.payload.title ? action.payload.title : 'no name'
			const fave = createFave(action.payload, name)
			if (current(state).length === 0) {
				state.push(fave)
			} else {
				const filmExists = current(state).some(e => e.title === name)
				const nameExists = current(state).some(e => e.name === name)

				if (filmExists || nameExists) {
					render(<FavesModal props={true}/>);
				} else {
					state.push(fave)
				}
			}
		},
		updateFave: (state, action) => {
			// find fave
			// update fave with array of ids if none exists,
			// or add related id if doesn't exist in array already
			// return state
		},
		rateFave: (state, action) => {
			// find fave
			// update new on that fave
			// return state
		},
		removeFave: (state, action) => {
			const id = action.payload

			/*
			 ! remove fave code here */
			/*
			 * make sure to return the whole state because it's just a single array of faves */
			// return state.???

			return current(state).filter(item => item.id !== id);
		},
	},
})

export const { addFave, removeFave, rateFave } = favesSlice.actions
export const selectFaveState = state => state.faves
