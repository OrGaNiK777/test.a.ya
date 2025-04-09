import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Cart.css';

const Cart = ({ cartItems, removeFromCart }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(`${process.env.PUBLIC_URL}`);
    };

    return (
        <div className="cart">
            <h1>Корзина</h1>
            {cartItems.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index} className="cart-item">
                            <div className="cart-item-details">
                                <img
                                    src={item.selectedColor.images[0]}
                                    alt={item.name}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-info">
                                    <h3>{item.name}</h3>
                                    <p>Цвет: {item.selectedColor.name}</p>
                                    <p>Размер: {item.size}</p>
                                    <p>Цена: {item.selectedColor.price} руб.</p>
                                    <button className="remove-button" onClick={() => removeFromCart(index)}>Удалить</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <button className="back-button" onClick={handleGoBack}>Назад</button>
        </div>
    );
};

export default Cart;