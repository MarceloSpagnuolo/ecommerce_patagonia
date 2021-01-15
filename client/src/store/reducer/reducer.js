import {
  //users
  CREATE_USER,
  GET_USERS,
  GET_USER_BY_ID,
  GET_USER_BY_TOKEN,
  GET_USER_CART,
  PUT_ROLE_USER,
  COPY_USER_TO_STORE,
  UPDATE_USER,

  //products
  ADD_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCTS_BY_CATEGORY,
  GET_PRODUCT_JOIN_CATEGORY,
  POST_PRODUCT_JOIN_CATEGORY,
  SEARCH_PRODUCT,
  DELETE_PRODUCT_JOIN_CATEGORY,
  MODIFY_PRODUCT,
  DELETE_PRODUCT,

  //categories
  ADD_CATEGORY,
  GET_CATEGORIES,
  MODIFY_CATEGORY,
  DELETE_CATEGORY,

  //cart
  POST_CREATE_CART,
  GET_CART_BY_IDUSER,
  POST_PRODUCT_TO_CART,
  PUT_CHANGE_QUANTITY,
  DEL_PRODUCT_TO_CART,
  EMPTY_ALL_PRODUCTS_OF_CART,
  COPY_CART_TO_STORE,

  //orders
  GET_FULL_ORDERS,
  GET_ORDER_BY_ID,
  UPDATE_ORDER,
  GET_ORDER_BY_STATUS,


  //review
  ADD_REVIEW,
  GET_REVIEWS,
  UPDATE_REVIEW,

  //multer
  GET_IMAGES,
  ADD_IMAGES,
  DELETE_IMAGES,



  //msj error
  ERROR_MESSAGE,









  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_FROM_CART,
  DELETE_USER,
  DETAIL_USER,
  DELETE_CART,
  LOGIN,
  LOGIN_ERROR,
  CHECKOUT_END,
  DELETE_REVIEW,
  GET_USER_REVIEWS,
  ADD_CATEGORY_PRODUCT,
  REMOVE_CATEGORY_PRODUCT,
  GET_ORDERS_STATUS,
  CREATE_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER_TO_CREATE,
  UPDATE_ORDER_TO_PROCESS,
  UPDATE_ORDER_TO_FULL,
  UPDATE_ORDER_TO_REJECT,

} from "../constants/constants";

const inicialState = {
  products: [],
  categories: [],
  reviews: [],
  order: [],
  orders: [],
  users: {},
  images: [],
  user: {}
};

function ReducerProducts(state = inicialState, action) {
  switch (action.type) {
    ////////////////////////////////////   USERS   //////////////////////////////////////////

    case CREATE_USER:
      return { ...state, user: action.payload };
    case GET_USERS:
      return { ...state, users: action.payload };
    case GET_USER_BY_ID:
      return { ...state, user: action.payload };
    case GET_USER_BY_TOKEN:
      return { ...state, user: action.payload };
    case GET_USER_CART:
      return { ...state, users: action.payload };
    case PUT_ROLE_USER:
      return {
        ...state,
        users: state.users.map((us) => {
          if (us.id === action.payload.id) {
            return action.payload;
          } else {
            return us;
          }
        })
      };
    case COPY_USER_TO_STORE:
      return {
        ...state,
        user: action.payload
      }
    case UPDATE_USER:
      return {...state, user: action.payload};

    ////////////////////////////////////   USERS   //////////////////////////////////////////








    ////////////////////////////////////   PRODUCTS   //////////////////////////////////////////

    case ADD_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.payload),
      };
    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    case GET_PRODUCT_BY_ID:
      return { ...state, products: action.payload };
    case GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT_JOIN_CATEGORY:
      return { ...state, products: action.payload };
    case POST_PRODUCT_JOIN_CATEGORY:
      return { ...state, products: action.payload };
    case SEARCH_PRODUCT:
      return { ...state, products: action.payload };
    case DELETE_PRODUCT_JOIN_CATEGORY:
      return { ...state, products: action.payload };
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
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload[0]
        ),
      };
    ////////////////////////////////////   PRODUCTS   //////////////////////////////////////////







    ////////////////////////////////////   CATEGORIES   //////////////////////////////////////////

    case ADD_CATEGORY:
      return {
        ...state,
        categories: state.categories.concat(action.payload),
      };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
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
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload[0]
        ),
      };

    ////////////////////////////////////   CATEGORIES   //////////////////////////////////////////






    ////////////////////////////////////   CART   //////////////////////////////////////////

    case POST_CREATE_CART:
      return { ...state, order: action.payload };

    case GET_CART_BY_IDUSER:
      return { ...state, order: action.payload };
    case POST_PRODUCT_TO_CART:
      return { ...state, order: action.payload };
    case PUT_CHANGE_QUANTITY:
      return {
        ...state,
        order: action.payload,
      };
    case DEL_PRODUCT_TO_CART:
      return { ...state, order: action.payload };
    case EMPTY_ALL_PRODUCTS_OF_CART:
      return { ...state, order: action.payload };
    case COPY_CART_TO_STORE:
      return {
        ...state,
        order: action.payload
      }

    ////////////////////////////////////   CART   //////////////////////////////////////////






    ////////////////////////////////////   ORDERS   //////////////////////////////////////////

    case GET_FULL_ORDERS:
      return { ...state, orders: action.payload };
    case GET_ORDER_BY_STATUS:
      return { ...state, orders: action.payload };
    case GET_ORDER_BY_ID:
      return { ...state, orders: action.payload };
    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((o) => {
          if (o.id === action.payload.id) {
            o.status = action.payload.status
            return o;
          } else {
            return o;
          }
        }),
      };
      
    ////////////////////////////////////   ORDERS   //////////////////////////////////////////





    ////////////////////////////////////   REVIEWS   //////////////////////////////////////////

    case ADD_REVIEW:
      return {
        ...state,
        reviews: state.reviews.concat(action.payload)
      };
    case GET_REVIEWS:
      return { ...state, reviews: action.payload }
    case UPDATE_REVIEW:
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

    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(
          (reviews) => reviews.id !== action.payload
        ),
      };
    ////////////////////////////////////   REVIEWS   //////////////////////////////////////////





    ////////////////////////////////////   MULTER   //////////////////////////////////////////

    case ADD_IMAGES:
      return {
        ...state,
        images: state.images.concat(action.payload),
      };
    case GET_IMAGES:
      return { ...state, images: action.payload };
    case DELETE_IMAGES:
      return {
        ...state,
        images: state.products.filter(
          (image) => image.id !== action.payload
        ),
      };

    ////////////////////////////////////   MULTER   //////////////////////////////////////////





    ////////////////////////////////////   MSJ ERROR   //////////////////////////////////////////

    case ERROR_MESSAGE:
      alert(action.message);
      return { ...state };

    ////////////////////////////////////   MSJ ERROR   //////////////////////////////////////////







    ////////////////////////////////////////////////////////////////
    case GET_ORDERS_STATUS:
      return {};
    case GET_USER_REVIEWS:
      return {};
    case ADD_CATEGORY_PRODUCT:
      return {};
    case ADD_TO_CART:
      return {};
    case DELETE_ORDER:
      return {};
    case CREATE_ORDER:
      return {};
    case DELETE_CART:
      return {};
    case DELETE_USER:
      return {};
    case REMOVE_CATEGORY_PRODUCT:
      return {};
    case REMOVE_FROM_CART:
      return {};
    case LOGIN:
      return {};
    case LOGIN_ERROR:
      return {};
    case DETAIL_USER:
      return {};
    case CHECKOUT_END:
      return {};
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
    default:
      return state;
  }
}

export default ReducerProducts;
