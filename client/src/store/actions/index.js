import {
    ADD_CATEGORY,
    GET_CATEGORIES,
    DELETE_CATEGORY,
    MODIFY_CATEGORY,
    ERROR_MESSAGE,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    ADD_CATEGORY_PRODUCT,
    REMOVE_CATEGORY_PRODUCT,
    GET_PRODUCTS,
    MODIFY_PRODUCT,
    GET_PRODUCTS_BY_CATEGORY,
    ADD_TO_CARD,
    REMOVE_FROM_CART,
    GET_ORDERS,
    UPDATE_FROM_CART,
    CREATE_USER,
    GET_USERS,
    DELETE_USER,
    UPDATE_USER,
    DELETE_ORDER,
    DETAIL_USER,
    DELETE_CART,
    LOGIN,
    LOGIN_ERROR,
    LOGOUT,
    ADD_REVIEW,
    CREATE_ORDER,
    UPDATE_ORDER_TO_CREATE,
    UPDATE_ORDER_TO_PROCESS,
    CHECKOUT_END,
    UPDATE_ORDER_TO_FULL,
    UPDATE_ORDER_TO_REJECT,
    UPDATE_REVIEW,
    DELETE_REVIEW,
    GET_USER_REVIEWS,
    GET_ORDERS_STATUS,
  } from "../constants/constants";
  import axios from "axios";

  export const getProducts = () => async dispatch => {
      
    try {
        const res = await axios.get(`http://localhost:3001/products`)        
        dispatch( {
            type: GET_PRODUCTS,
            payload: res.data,
                    
        })
    }
    catch(e){
        console.log(e)
    }
  }
  export const getCategories = () => async dispatch => {
      try {
          const res = await axios.get(`http://localhost:3001/products/category`)
        dispatch( {
            type: GET_CATEGORIES,
            payload: res.data
        })
        }
        catch(e){
            console.log(e)
        }
  }