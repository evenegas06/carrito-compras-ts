import { db } from '../data/db';
import { CartItem, Guitar } from '../types';

export type CartActions =
	| { type: 'ADD_TO_CART'; payload: { item: Guitar } }
	| { type: 'REMOVE_FROM_CART'; payload: { id: Guitar['id'] } }
	| { type: 'DECREASE_QUANTITY'; payload: { id: Guitar['id'] } }
	| { type: 'INCREASE_QUANTITY'; payload: { id: Guitar['id'] } }
	| { type: 'CLEAR_CART' };

export type CartState = {
	data: Guitar[];
	cart: CartItem[];
};

export const initialState: CartState = {
	data: db,
	cart: [],
};

const MAX_QUANTITY = 5;
const MIN_QUANTITY = 1;

export const cartReducer = (
	state: CartState = initialState,
	action: CartActions
) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			const item_exists = state.cart.find((cart_item) => {
				return cart_item.id === action.payload.item.id;
			});

			let updated_cart: CartItem[] = [];

			if (item_exists) {
				updated_cart = state.cart.map((item) => {
					if (item.id === action.payload.item.id) {
						if (item.quantity < MAX_QUANTITY) {
							return {
								...item,
								quantity: item.quantity + 1,
							};
						} else {
							return item;
						}
					} else {
						return item;
					}
				});
			} else {
				const new_item: CartItem = { ...action.payload.item, quantity: 1 };
				updated_cart = [...state.cart, new_item];
			}

			return {
				...state,
				cart: updated_cart,
			};

		case 'REMOVE_FROM_CART':
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.payload.id),
			};

		case 'DECREASE_QUANTITY':
			return {
				...state,
			};

		case 'INCREASE_QUANTITY':
			const cart_increase = state.cart.map((item) => {
				if (item.id === action.payload.id && item.quantity < MAX_QUANTITY) {
					return {
						...item,
						quantity: item.quantity + 1,
					};
				}
				return item;
			});

			return {
				...state,
				cart: cart_increase,
			};

		case 'CLEAR_CART':
			return {
				...state,
			};

		default:
			return {
				...state,
			};
	}
};
