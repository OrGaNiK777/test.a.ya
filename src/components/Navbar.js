import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = ({ cartCount }) => {
	return (
		<nav className='navbar'>
			<Link to={`${process.env.PUBLIC_URL}`}>Список товаров</Link>
			<Link to='/cart'>Корзина ({cartCount})</Link>
		</nav>
	)
}

export default Navbar
