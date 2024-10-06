import React, { useState, useEffect } from 'react';
import { getProduct, getSizes } from '../services/api';
import { useParams, Link } from 'react-router-dom';
import '../styles/ProductDetail.css';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchProductAndSizes = async () => {
      try {
        const [productData, sizesData] = await Promise.all([
          getProduct(parseInt(id)),
          getSizes()
        ]);
        setProduct(productData);
        setSizes(sizesData);
        setSelectedColor(productData.colors[0]);

        setSelectedSize(productData.colors[0].sizes[0] || null)
      } catch (error) {
        console.error('Ошибка при загрузке:', error);
      }
    };

    fetchProductAndSizes();
  }, [id]);

  if (!product) return <p>Загрузка...</p>;

  const handleAddToCart = () => {
    let size = 0
    sizes.forEach((item) => { if (selectedSize === item.id) { size = item.label } })
    addToCart({ ...product, selectedColor, size });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize(color.sizes[0] || null);
  };

  const handleNextImage = () => {
    if (selectedColor.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % selectedColor.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedColor.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex - 1 + selectedColor.images.length) % selectedColor.images.length
      );
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="product-detail">
      <div className="image-controls">
        <button onClick={handlePrevImage} disabled={selectedColor.images.length <= 1}>❮</button>
        <img
          src={selectedColor.images[currentImageIndex]}
          alt={product.name}
          className="product-detail-image"
          onClick={openModal}
        />
        <button onClick={handleNextImage} disabled={selectedColor.images.length <= 1}>❯</button>
      </div>

      <h1>{product.name}</h1>
      <h3>Цена: {selectedColor.price} руб.</h3>
      <p>{selectedColor.description}</p>
      <h3>Выбор цвета</h3>
      <div className="color-selection">
        {product.colors.map(color => (
          <button
            key={color.id}
            className={`color-button ${selectedColor.id === color.id ? 'active' : ''}`}
            onClick={() => handleColorChange(color)}
          >
            {color.name}
          </button>
        ))}
      </div>
      <h3>Выбор размера</h3>
      <div className="size-selection">
        {sizes.map(size => {
          const isAvailable = selectedColor.sizes.includes(size.id);
          return (
            <button
              key={size.id}
              className={`size-button ${selectedSize === size.id ? 'active' : ''}`}
              onClick={() => isAvailable && setSelectedSize(size.id)}
              disabled={!isAvailable}
            >
              {size.label}
            </button>
          );
        })}
      </div>

      <button className="add-to-cart-button" onClick={handleAddToCart}>Добавить в корзину</button>
      <Link className='back-button' to="/">Назад</Link>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>&times;</span>
            <img src={selectedColor.images[currentImageIndex]} alt={product.name + " " + selectedColor.name} className="modal-image" />
          </div>
        </div>
      )}
    </div >

  );
};

export default ProductDetail;