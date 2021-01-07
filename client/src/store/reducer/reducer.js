import {
  ADD_CATEGORY,
  GET_CATEGORIES,
  DELETE_CATEGORY,
  MODIFY_CATEGORY,
  ERROR_MESSAGE,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  MODIFY_PRODUCT,
  GET_REVIEWS,
  GET_PRODUCTS_BY_CATEGORY,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_FROM_CART,
  CREATE_USER,
  GET_USERS,
  DELETE_USER,
  UPDATE_USER,
  DETAIL_USER,
  DELETE_CART,
  LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  ADD_REVIEW,
  CHECKOUT_END,
  UPDATE_REVIEW,
  DELETE_REVIEW,
  GET_USER_REVIEWS,
  SEARCH_PRODUCT,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_JOIN_CATEGORY,
  POST_PRODUCT_JOIN_CATEGORY,
  DELETE_PRODUCT_JOIN_CATEGORY,
  ADD_CATEGORY_PRODUCT,
  REMOVE_CATEGORY_PRODUCT,
  GET_CART_BY_IDUSER,
  POST_CREATE_CART,
  PUT_CHANGE_QUANTITY,
  GET_ORDERS,
  GET_ORDERS_STATUS,
  GET_ORDER_BY_USER,
  GET_ORDER_BY_ID,
  CREATE_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER_TO_CREATE,
  UPDATE_ORDER_TO_PROCESS,
  UPDATE_ORDER_TO_FULL,
  UPDATE_ORDER_TO_REJECT,
  GET_FULL_ORDERS,
  GET_USER_CART,
  POST_PRODUCT_TO_CART,
  GET_USER_BY_ID,
  DEL_PRODUCT_TO_CART,
  EMPTY_ALL_PRODUCTS_OF_CART,
  GET_IMAGES,
  ADD_IMAGES,
  DELETE_IMAGES,
} from "../constants/constants";

const inicialState = {
  products: [],
  categories: [],
  reviews: [],
  order: [],
  users: {},
  images: []
};

function ReducerProducts(state = inicialState, action) {
  switch (action.type) {
    /****************************** PRODUCTS **********************************/
    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    case SEARCH_PRODUCT:
      return { ...state, products: action.payload };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case GET_FULL_ORDERS:
      return { ...state, order: action.payload };
    case GET_ORDER_BY_ID:
      return { ...state, order: action.payload };
    case GET_ORDERS_STATUS:
      return {};
    case GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT_BY_ID:
      return { ...state, products: action.payload };
    case GET_CART_BY_IDUSER:
      return { ...state, order: action.payload };
    case GET_USERS:
      return { ...state, users: action.payload };
    case GET_REVIEWS:
      return { ...state, reviews: action.payload }
    case GET_USER_REVIEWS:
      return {};
    case GET_PRODUCT_JOIN_CATEGORY:
      return { ...state, products: action.payload };
    case ADD_CATEGORY_PRODUCT:
      return {};
    case ADD_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.payload),
      };
    case ADD_REVIEW:
      console.log("reducer", action.payload)
      return {
        ...state,
        reviews: state.reviews.concat(action.payload)
      };
    case ADD_TO_CART:
      return {};
    case ADD_CATEGORY:
      return {
        ...state,
        categories: state.categories.concat(action.payload),
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
      console.log(action.payload, "reducer")
      return {
        ...state,
        reviews: state.reviews.map((r) => {
          if (r.id === action.payload.id) {
            return action.payload;
          } else {
            return r;
          }
        }),
      };
    case UPDATE_USER:
      return {};
    case DELETE_CART:
      return {};
    case PUT_CHANGE_QUANTITY:
      return {
        ...state,
        order: action.payload,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };
    case DELETE_ORDER:
      return {};
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
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
        categories: state.categories.map((p) => {
          if (p.id === action.payload.id) {
            return action.payload;
          } else {
            return p;
          }
        }),
      };
    case MODIFY_PRODUCT:
      return {
        ...state,
        products: state.products.map((p) => {
          if (p.id === action.payload.id) {
            return action.payload;
          } else {
            return p;
          }
        }),
      };
    case CREATE_ORDER:
      return {};
    case CREATE_USER:
      return { ...state, users: action.payload };
    case ERROR_MESSAGE:
      alert(action.message);
      return { ...state };
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
    case POST_PRODUCT_JOIN_CATEGORY:
      return { ...state, products: action.payload };
    case DELETE_PRODUCT_JOIN_CATEGORY:
      return { ...state, products: action.payload };
    case POST_CREATE_CART:
      return { ...state, order: action.payload };
    case GET_USER_CART:
      return { ...state, users: action.payload };
    case POST_PRODUCT_TO_CART:
      return { ...state, order: action.payload };
    case GET_USER_BY_ID:
      return { ...state, users: action.payload };
    case DEL_PRODUCT_TO_CART:
      return { ...state, order: action.payload };
    case EMPTY_ALL_PRODUCTS_OF_CART:
      return { ...state, order: action.payload };
    case GET_IMAGES:
      return { ...state, images: action.payload };
    case ADD_IMAGES:
      return {
        ...state,
        images: state.images.concat(action.payload),
      };
    case DELETE_IMAGES:
      return {
        ...state,
        images: state.products.filter(
          (image) => image.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export default ReducerProducts;
