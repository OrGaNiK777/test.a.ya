import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/api'
import { Link } from 'react-router-dom'

const ProductList = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const data = await getProducts()
				setProducts(data)
			} catch (error) {
				console.error(error)
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
	}, [])

	if (loading) {
		return (
			<div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
				<div className='spinner-border' role='status'>
					<span className='visually-hidden'>Загрузка...</span>
				</div>
			</div>
		)
	}

	return (
		<div className='container'>
			<h1 className='text-center'>Список товаров</h1>
			<div className='row'>
				{products.map((product) => (
					<div className='col-4 mb-4' key={product.id}>
						<Link to={`/product/${product.id}`} className='text-decoration-none'>
							<div className='card text-center'>
								<img src={product.colors[0].images[0]} className='card-img-top' alt={product.name} />
								<div className='card-body'>
									<h5 className='card-title'>{product.name}</h5>
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}

export default ProductList
