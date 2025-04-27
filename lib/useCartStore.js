'use client';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
	persist(
		(set, get) => ({
			cart: [], // Array to store cart items
			editingRod: null, // Store the rod being edited

			// Add an item to the cart
			addToCart: (item) => {
				set((state) => ({
					cart: [...state.cart, { ...item, cartItemId: uuidv4() }],
					editingRod: null,
				}));
			},

			// Remove an item from the cart
			removeFromCart: (cartItemId) => {
				set((state) => ({
					cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
				}));
			},

			// Clear the cart
			clearCart: () => set({ cart: [] }),

			// Set editing mode
			setEditingRod: (rod) => {
				set({ editingRod: rod });
			},

			// Remove editing mode
			clearEditingRod: () => {
				set({ editingRod: null });
			},

			// Updated updateCartItem in your useCartStore
			updateCartItem: (cartItemId, updatedItem) => {
				set((state) => {
					const newCart = [...state.cart];
					const index = newCart.findIndex(
						(item) => item.cartItemId === cartItemId
					);
					if (index !== -1) {
						newCart[index] = updatedItem;
					}
					return { cart: newCart };
				});
			},

			// Compute total price dynamically
			cartTotalPrice: () => {
				const cart = get().cart;
				return cart.reduce((total, item) => {
					const itemPrice = item.totalPrice || item.price || 0;
					return total + itemPrice;
				}, 0);
			},
			calculateShipping: () => {
				const cart = get().cart;

				const hasOpenWater = cart.some((item) =>
					item.category.includes('open-water')
				);
				const hasIceRod = cart.some((item) =>
					item.category.includes('ice-rods')
				);

				if (hasOpenWater) return 20;
				if (hasIceRod) return 10;
				return 0;
			},
		}),
		{
			name: 'cart-store', // Store data in localStorage
		}
	)
);

export default useCartStore;
