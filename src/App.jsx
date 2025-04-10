import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import { CartProvider } from './context/CartContext'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
	return (
		<CartProvider>
			<Router>
				<Navbar />
				<div className='container'>
					<Routes>
						<Route path={`${process.env.PUBLIC_URL}`} element={<ProductList />} />
						<Route path='/product/:id' element={<ProductDetail />} />
						<Route path='/cart' element={<Cart />} />
					</Routes>
				</div>
			</Router>
		</CartProvider>
	)
}

export default App
