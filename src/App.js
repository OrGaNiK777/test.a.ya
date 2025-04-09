import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'

const App = () => {
	const [cartItems, setCartItems] = useState([])

	const addToCart = (item) => {
		setCartItems([...cartItems, item])
	}

	const removeFromCart = (index) => {
		const newCart = [...cartItems]
		newCart.splice(index, 1)
		setCartItems(newCart)
	}

	return (
		<Router>
			<div>
				<Navbar cartCount={cartItems.length} />
				<Routes>
						<Route path='/' element={<ProductList />} />
						<Route path='/product/:id' element={<ProductDetail addToCart={addToCart} />} />
						<Route path='/cart' element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
