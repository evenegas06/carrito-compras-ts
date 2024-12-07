import { useEffect, useMemo, useState } from 'react';
import { db } from '../data/db';


export const useCart = () => {
    const MAX_QUANTITY = 5;
    const MIN_QUANTITY = 1;

    const initialCart = () => {
        const storage_cart = localStorage.getItem('cart');
        return storage_cart ? JSON.parse(storage_cart) : [];
    };

    /* ----- state ----- */
    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const isCartEmpty = useMemo(() => {
        return cart.length === 0;
    }, [cart]);

    const cartTotal = useMemo(() => {
        return cart.reduce((carry, item) => {
            return carry + item.quantity * item.price;
        }, 0);
    }, [cart]);


    /**
     *
     * @param {object} item
     */
    const addToCart = (item) => {
        const item_exists = cart.findIndex((cart_item) => {
            return cart_item.id === item.id;
        });

        if (item_exists >= 0) {
            if (cart[item_exists].quantity >= MAX_QUANTITY) return;

            const update_cart = [...cart]; // copy of state

            update_cart[item_exists].quantity++;

            setCart(update_cart);
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }
    };

    /**
     * Remove item from cart state.
     *
     * @param {int} id
     */
    const removeFromCart = (id) => {
        setCart(cart.filter((guitar) => guitar.id !== id));
    };

    /**
     * Increase item quantity.
     *
     * @param {int} id
     */
    const increaseQuantity = (id) => {
        const update_cart = cart.map((item) => {
            if (item.id === id && item.quantity < MAX_QUANTITY) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }

            return item;
        });

        setCart(update_cart);
    };

    /**
     * Decrease item quantity.
     *
     * @param {int} id
     */
    const decreaseQuantity = (id) => {
        const update_cart = cart.map((item) => {
            if (item.id === id && item.quantity > MIN_QUANTITY) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }

            return item;
        });

        setCart(update_cart);
    };

    /**
     *
     */
    const clearCart = () => {
        setCart([]);
    };

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isCartEmpty,
        cartTotal
    };
};