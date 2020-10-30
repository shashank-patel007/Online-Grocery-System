import React, { useReducer } from 'react';

import { CartReducer, sumItems } from './CartReducer';
import CartContext from './CartContext';
import { SetUser, TokenService } from '../../services/storage.service';
import Axios from 'axios';

const CartState = ({ children }) => {
	// var storage = [];
	// if (SetUser.getUser()) {
	// 	storage = localStorage.getItem(`CART-${SetUser.getUser().name}`)
	// 		? JSON.parse(localStorage.getItem(`CART-${SetUser.getUser().name}`))
	// 		: [];
	// }
	// const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };
	const initialState = { cartItems: [], total: 0, cartId: '', cartOwner: '' };
	const [ state, dispatch ] = useReducer(CartReducer, initialState);

	const findQuantity = (product) => {
		const item = state.cartItems.find((item) => item.id === product.id);
		return item.quantity;
	};

	const getCart = async () => {
		var config = {
			method: 'get',
			url: 'http://127.0.0.1:8000/shopping_cart/',
			headers: {
				Authorization: `Token ${TokenService.getToken()}`,
				'Content-Type': 'application/json'
			}
		};

		await Axios(config).then((response) => {
			const res = response.data;
			dispatch({ type: 'SET_CART', payload: res });
		});
	};

	const increase = async (payload, flag) => {
		var qty = 0;
		if (flag) qty = findQuantity(payload);
		else qty = payload.quantity;
		var config = {
			method: 'post',
			url: 'http://127.0.0.1:8000/shopping_cart/',
			headers: {
				Authorization: `Token ${TokenService.getToken()}`,
				'Content-Type': 'application/json'
			},
			data: {
				product_id: payload.id,
				qty: qty + 1
			}
		};

		await Axios(config).then((response) => {
			const res = response.data;
			dispatch({ type: 'SET_CART', payload: res });
		});
		// dispatch({ type: 'INCREASE', payload });
	};

	const decrease = async (payload, flag) => {
		var qty = 0;
		if (flag) qty = findQuantity(payload);
		else qty = payload.quantity;
		var config = {
			method: 'post',
			url: 'http://127.0.0.1:8000/shopping_cart/',
			headers: {
				Authorization: `Token ${TokenService.getToken()}`,
				'Content-Type': 'application/json'
			},
			data: {
				product_id: payload.id,
				qty: qty - 1
			}
		};

		await Axios(config).then((response) => {
			const res = response.data;
			dispatch({ type: 'SET_CART', payload: res });
		});
	};

	const addProduct = async (payload) => {
		var config = {
			method: 'post',
			url: 'http://127.0.0.1:8000/shopping_cart/',
			headers: {
				Authorization: `Token ${TokenService.getToken()}`,
				'Content-Type': 'application/json'
			},
			data: {
				product_id: payload.id,
				qty: 1
			}
		};

		await Axios(config).then((response) => {
			const res = response.data;
			dispatch({ type: 'SET_CART', payload: res });
		});
		// dispatch({ type: 'ADD_ITEM', payload });
	};

	const removeProduct = async (payload) => {
		var config = {
			method: 'post',
			url: 'http://127.0.0.1:8000/shopping_cart/',
			headers: {
				Authorization: `Token ${TokenService.getToken()}`,
				'Content-Type': 'application/json'
			},
			data: {
				product_id: payload.id,
				qty: 0
			}
		};

		await Axios(config).then((response) => {
			const res = response.data;
			dispatch({ type: 'SET_CART', payload: res });
		});
	};

	const clearCart = () => {
		dispatch({ type: 'CLEAR' });
	};

	const removeCart = () => {
		dispatch({ type: 'REMOVE_CART' });
	};

	const handleCheckout = () => {
		console.log('CHECKOUT', state);
		dispatch({ type: 'CHECKOUT' });
	};

	const contextValues = {
		removeProduct,
		addProduct,
		increase,
		decrease,
		clearCart,
		handleCheckout,
		removeCart,
		getCart,
		...state
	};
	return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};

export default CartState;