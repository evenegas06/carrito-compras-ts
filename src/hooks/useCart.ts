import { useEffect, useMemo, useState } from 'react';
import { CartItem, Guitar } from '../types';

export const useCart = () => {
	/**
	 *
	 * @returns array
	 */
	const initialCart = (): CartItem[] => {
		const storage_cart = localStorage.getItem('cart');
		return storage_cart ? JSON.parse(storage_cart) : [];
	};

	/* ----- state ----- */
	const [cart, setCart] = useState(initialCart);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	/**
	 * Set cart state to empty.
	 */
	const clearCart = () => {
		setCart([]);
	};

	return {
		cart,
		clearCart,
	};
};
