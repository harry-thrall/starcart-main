import { createSlice, nanoid } from '@reduxjs/toolkit'

const createItem = item => ({
	id: nanoid(),
	...item,
})
const initialState = {
	items: [],
	total: 0,
	prices: {
		people: 10,
		starships: 20,
		vehicles: 5.5,
		planets: 100,
		films: 12.99,
	},
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducer: {
		addItem: (state, action) => {
			// create item
			const inCart = state.cart.find((item) => item.id === action.payload.id);
			if (inCart) {
				inCart.quantity++;
			} else {
			  state.cart.push({ ...action.payload, quantity: 1 });
			}
			// add item to items
		},
		removeItem: (state, action) => {
			// find item
			const itemToRemove = state.cart.filter((item) => item.id !== action.payload);

			// remove item
			state.cart = itemToRemove;
		},
	},
})

export const { addItem, removeItem } = cartSlice
