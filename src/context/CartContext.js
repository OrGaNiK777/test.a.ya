import React, { createContext, useReducer, useContext } from 'react'
const CartContext = createContext()
const initialState = {
	items: [],
}

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			return {
				...state,
				items: [...state.items, action.payload],
			}

		case 'REMOVE_FROM_CART': {
			const itemToRemove = action.payload
			let updatedItems = [...state.items]
			const itemIndex = updatedItems.findIndex((i) => i.product === itemToRemove.product && i.color.name === itemToRemove.color.name && i.size.label === itemToRemove.size.label)

			if (itemIndex >= 0) {
				updatedItems.splice(itemIndex, 1)
			}

			return {
				...state,
				items: updatedItems,
			}
		}

		default:
			return state
	}
}

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState)

	return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export const useCart = () => {
	return useContext(CartContext)
}
