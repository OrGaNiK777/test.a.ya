import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct, getSizes } from '../services/api'
import { useCart } from '../context/CartContext'
import Slider from 'react-slick'

const ProductDetail = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [product, setProduct] = useState(null)
	const [sizes, setSizes] = useState([])
	const [selectedSizes, setSelectedSizes] = useState({})
	const { dispatch } = useCart()

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const productData = await getProduct(id)
				setProduct(productData)
			} catch (error) {
				console.error(error)
			}
		}

		const fetchSizes = async () => {
			try {
				const sizesData = await getSizes()
				setSizes(sizesData)
			} catch (error) {
				console.error(error)
			}
		}

		fetchProduct()
		fetchSizes()
	}, [id])

	const handleAddToCart = (color) => {
		const selectedSize = selectedSizes[color.id]

		dispatch({
			type: 'ADD_TO_CART',
			payload: {
				product: product.name,
				color,
				size: sizes.find((size) => size.id === selectedSize),
				productId: id,
			},
		})
		setSelectedSizes({})
	}

	if (!product || sizes.length === 0)
		return (
			<div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
				<div className='spinner-border' role='status'>
					<span className='visually-hidden'>Загрузка...</span>
				</div>
			</div>
		)

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	}

	return (
		<div className='container'>
			<h1 className=' text-center'>{product.name}</h1>
			<button className='btn btn-secondary mb-3' onClick={() => navigate(-1)}>
				Назад
			</button>
			<div className='row mt-3'>
				{product.colors.map((color) => (
					<div key={color.id} className='col-md-4 mb-3'>
						<div className='card'>
							<div className='position-relative'>
								<Slider {...settings}>
									{color.images.map((image, index) => (
										<div key={index}>
											<img src={image} className='img-fluid card-img-top' alt={color.name} />
										</div>
									))}
								</Slider>
							</div>
							<div className='card-body text-center'>
								<p className='card-text'>
									Цвет: <strong>{color.name}</strong>
								</p>
								<p className='card-text'>
									Цена: <strong>{color.price} р.</strong>
								</p>
								<p className='card-text'>{color.description}</p>
								<h4>Выберите размер:</h4>
								{sizes.map((size) => (
									<button
										key={size.id}
										className={`btn ${selectedSizes[color.id] === size.id ? 'btn-success' : 'btn-outline-secondary'} me-2`}
										onClick={() => {
											if (color.sizes.includes(size.id)) {
												setSelectedSizes((prevSizes) => ({
													...prevSizes,
													[color.id]: size.id,
												}))
											}
										}}
										disabled={!color.sizes.includes(size.id)}
									>
										{size.label}
									</button>
								))}

								<button className='btn btn-primary mt-3' onClick={() => handleAddToCart(color)} disabled={!selectedSizes[color.id]}>
									Добавить в корзину
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ProductDetail
