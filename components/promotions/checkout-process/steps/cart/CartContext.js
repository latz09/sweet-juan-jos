'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [cartTotal, setCartTotal] = useState(0);

	// Whenever `cart` changes, recalculate the total
	useEffect(() => {
		const newTotal = cart.reduce(
			(sum, item) => sum + parseFloat(item.price) * item.quantity,
			0
		);
		setCartTotal(newTotal);
	}, [cart]);

	// Add item to cart
	const addToCart = (item) => {
		setCart((prev) => {
			const existingItem = prev.find(
				(cartItem) =>
					cartItem.name === item.name && cartItem.price === item.price
			);
			if (existingItem) {
				// If item exists, increment its quantity
				return prev.map((cartItem) =>
					cartItem.name === item.name && cartItem.price === item.price
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				);
			}
			// If item doesn't exist, add it to the cart
			return [...prev, { ...item, quantity: 1 }];
		});
	};

	// Remove item from cart
	const removeFromCart = (id) => {
		setCart((prev) => prev.filter((item) => item.id !== id));
	};

	// Update item quantity
	const updateCartItemQuantity = (id, newQuantity) => {
		setCart((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, quantity: newQuantity } : item
			)
		);
	};

	// Clear the entire cart
	const clearCart = () => {
		setCart([]); // Set cart to an empty array
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				cartTotal,
				addToCart,
				removeFromCart,
				updateCartItemQuantity,
				clearCart, // Expose the clearCart function
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
