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
  SEARCH_PRODUCT,
  GET_PRODUCT_BY_ID,
} from "../constants/constants";

const inicialState = {
  products: [],
  categories: [],
};

function ReducerProducts(state = inicialState, action) {
  //console.log(action);
  switch (action.type) {
    /****************************** PRODUCTS **********************************/
    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    case SEARCH_PRODUCT:
      return { ...state, products: action.payload };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case GET_ORDERS:
      return {};
    case GET_ORDERS_STATUS:
      return {};
    case GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        products: action.payload[0].products
      };
    case GET_PRODUCT_BY_ID:
      return { ...state, products: action.payload };
    case GET_USERS:
      return {};
    case GET_USER_REVIEWS:
      return {};
    case ADD_CATEGORY_PRODUCT:
      return {};
    case ADD_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.payload)
      }
    case ADD_REVIEW:
      return {};
    case ADD_TO_CARD:
      return {};
    case ADD_CATEGORY:
      return {
        ...state,
        categories: state.categories.concat(action.payload)
      };
    case UPDATE_FROM_CART:
      return {};
    case UPDATE_ORDER_TO_CREATE:
      return {};
    case UPDATE_ORDER_TO_FULL:
      return {};
    case UPDATE_ORDER_TO_PROCESS:
      return {};
    case UPDATE_ORDER_TO_REJECT:
      return {};
    case UPDATE_REVIEW:
      return {};
    case UPDATE_USER:
      return {};
    case DELETE_CART:
      return {};
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== action.payload)}
    case DELETE_ORDER:
      return {};
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload)}
    case DELETE_REVIEW:
      return {};
    case DELETE_USER:
      return {};
    case REMOVE_CATEGORY_PRODUCT:
      return {};
    case REMOVE_FROM_CART:
      return {};
    case MODIFY_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(p => {
          if (p.id === action.payload.id) {
            return action.payload
          } else {
            return p
          }
        })
      };
    case MODIFY_PRODUCT:
      return {
        ...state,
        products: state.products.map(p => {
          if (p.id === action.payload.id) {
            return action.payload
          } else {
            return p
          }
        })
      }
    // {...state,
    // products:  state.products.id === action.payload.id ? 
    // state.products.map(action.payload) : state
    case CREATE_ORDER:
      return {};
    case CREATE_USER:
      return {};
    case ERROR_MESSAGE:
      return alert(action.message);
    case LOGOUT:
      return {};
    case LOGIN:
      return {};
    case LOGIN_ERROR:
      return {};
    case DETAIL_USER:
      return {};
    case CHECKOUT_END:
      return {};
    default:
      return state
  }
}

export default ReducerProducts;
