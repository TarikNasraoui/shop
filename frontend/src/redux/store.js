import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailsReducer,
  DeleteProductReducer,
  CreateProductReducer,
  UpdateProductReducer,
  ProductReviewReducer,
  productTopRatedReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  creatOrderReducer,
  OrderDetailReducer,
  OrderPayReducer,
  OrderMyListReducer,
  OrderListReducer,
  OrderDeliverReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  deletedProduct: DeleteProductReducer,
  createdProduct: CreateProductReducer,
  updatedProduct: UpdateProductReducer,
  productReviewed: ProductReviewReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdated: userUpdateProfileReducer,
  userList: userListReducer,
  orderCreate: creatOrderReducer,
  orderDails: OrderDetailReducer,
  orderPay: OrderPayReducer,
  myOrders: OrderMyListReducer,
  listOrders: OrderListReducer,
  orderDeliver: OrderDeliverReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
