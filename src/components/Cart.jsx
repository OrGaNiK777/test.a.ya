import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Cart = () => {
	const { state, dispatch } = useCart()
	const navigate = useNavigate()

	const handleRemoveFromCart = (itemToRemove) => {
		dispatch({ type: 'REMOVE_FROM_CART', payload: itemToRemove })
	}
	return (
		<div className='container my-4'>
			<h1 className='mb-4 text-center'>Корзина</h1>
			<button className='btn btn-secondary mb-3' onClick={() => navigate(-1)}>
				Назад
			</button>
			{state.items.length === 0 ? (
				<div className='alert alert-info text-center' role='alert'>
					Корзина пуста
				</div>
			) : (
				<div className='row'>
					{state.items.map((item, index) => (
						<div key={`cart-item-${index}`} className='col-md-4 mb-4'>
							<div className='card shadow-sm border-light rounded'>
								<div className='d-flex flex-column align-items-center p-3'>
									{item.color.images && <img src={item.color.images[0]} className='img-fluid rounded-start' alt={item.color.name} />}
									<div className='card-body text-center'>
										<h5 className='card-title'>{item.product}</h5>
										<p className='card-text mb-1'>
											Цвет: <strong>{item.color.name}</strong>
										</p>
										<p className='card-text mb-1'>
											Цена: <strong>{item.color.price} р.</strong>
										</p>
										<p className='card-text mb-1'>
											Размер: <strong>{item.size.label}</strong>
										</p>
									</div>
									<div className='d-flex justify-content-center mb-3'>
										<button className='btn btn-outline-danger px-4' onClick={() => handleRemoveFromCart(item)}>
											Удалить
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			<div className='text-center mt-4'>
				<h4>
					Итого: <strong>{state.items.reduce((total, item) => total + Number(item.color.price), 0)} р.</strong>
				</h4>
			</div>
		</div>
	)
}

export default Cart
