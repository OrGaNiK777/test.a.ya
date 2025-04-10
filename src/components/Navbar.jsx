import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Navbar = () => {
	const { state } = useCart()

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-secondary '>
			<div className='container-fluid '>
				<Link className='navbar-brand text-light' to={process.env.PUBLIC_URL}>
					Магазин
				</Link>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						<Link className='nav-link active text-light' to={process.env.PUBLIC_URL}>
							Каталог товаров
						</Link>

						<Link className='nav-link text-light' to='/cart'>
							Корзина ({state.items.length})
						</Link>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
