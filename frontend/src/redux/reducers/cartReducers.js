import {
  CART_ADD_ITEM,
  REMOVE_CART_ITEM,
  USER_SAVE_SHIPPING_ADRESS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAdress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_CART_ITEM:
      const id = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== id),
      };
    case USER_SAVE_SHIPPING_ADRESS:
      return {
        ...state,
        shippingAdress: action.payload,
      };
    default:
      return state;
  }
};
