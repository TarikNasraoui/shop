import axios from "axios";
import {
  CART_ADD_ITEM,
  REMOVE_CART_ITEM,
  USER_SAVE_SHIPPING_ADRESS,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAdress = (data) => (dispatch) => {
  dispatch({
    type: USER_SAVE_SHIPPING_ADRESS,
    payload: data,
  });
  localStorage.setItem("shippingAdress", JSON.stringify(data));
};
