import axios from "axios";

import {
  //users
  CREATE_USER,
  GET_USERS,
  GET_USER_BY_ID,
  GET_USER_BY_TOKEN,
  GET_USER_CART,
  PUT_ROLE_USER,
  LOGIN,
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


  //review
  ADD_REVIEW,
  GET_REVIEWS,
  UPDATE_REVIEW,
  DELETE_REVIEW,

  //multer
  GET_IMAGES,
  ADD_IMAGES,
  DELETE_IMAGES,



  //msj error
  ERROR_MESSAGE,
} from "../constants/constants.js";
const jwt = require("jsonwebtoken");

const url = "http://localhost:3001/";


////////////////////////////   USERS   ////////////////////////////////////// 

//Crea un usuario y se loguea
export const createUser = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}users/`, payload);
    if (res) {
      const { email, password } = payload;
      const datos = { email, password };
      const newToken = await axios.post("http://localhost:3001/auth/login", datos);
      if (newToken) {
        localStorage.setItem("userToken", newToken.data);
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken.data}`;
      }
    };
    dispatch({
      type: CREATE_USER,
      payload: res.data,
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para crear el usuario",
    });
  }
};

//Modificar el Rol del usuario
export const putRoleUser = (id, payload) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}auth/promote/${id}`, payload)
    dispatch({
      type: PUT_ROLE_USER,
      payload: res.data,
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al cambiar el rol del usuario",
    })
  }
};

//Trae todos los Usuarios ordenados por apellido
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}users/?order=["familyname"]`)
    dispatch({
      type: GET_USERS,
      payload: res.data,
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al traer los usuarios"
    })
  }
};

//Trae un usuario especifico por id
export const getUserById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}users/${userId}`)
    dispatch({
      type: GET_USER_BY_ID,
      payload: res.data,
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "No se encuentra el Usuario",
    });
  }
};

//Trae el carrito de un usuario
export const getUserCart = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}users/${userId}/cart`)
    dispatch({
      type: GET_USER_CART,
      payload: res.data,
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para traer la órden de compra",
    });
  }
};


//Devuelve el token del usuario
export const login = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}auth/login`, payload);
    dispatch({
      type: LOGIN,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "No se encuentra ese usuario",
    });
  }
};

//Devuelve el usuario del token
export const getUserByToken = (payload) => async (dispatch) => {
  try {
    localStorage.setItem("userToken", payload);
    axios.defaults.headers.common["Authorization"] = `Bearer ${payload}`
    const usuario = jwt.decode(payload)
    dispatch({
      type: GET_USER_BY_TOKEN,
      payload: usuario
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "No se encuentra el usuario"
    });
  }
};

export const updateUser = (id, payload) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}users/${id}`, payload);
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al actualizar usuario",
    });
  }
}

//Copia el GUESTUSER en el store
export const copyUserToStore = (guestUser) => (dispatch) => {
  dispatch({
    type: COPY_USER_TO_STORE,
    payload: guestUser
  })
}

////////////////////////////   USERS   ////////////////////////////////////// 





////////////////////////////   PRODUCTS   ////////////////////////////////////// 

//Trae todos los productos
export const getProducts = (limite, jump) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}products/?limit=${limite}&offset=${jump}&include="categories"&order=["name"]`);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al mostrar productos",
    });
  }
};

//agregar producto
export const addProduct = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}products/`, payload);
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al añadir producto",
    });
  };

  // catIds.forEach(catId => {
  //     axios.put(`http://${url}/products/${productId}/category/${catId}`)
  //         .then(res => {
  //             if (res.status === 200) {
  //                 dispatch({
  //                     type: ADD_CATEGORY_PRODUCT,
  //                     product: res.data.data
  //                 })
  //             }
  //             else {
  //                 dispatch({
  //                     type: ERROR_MESSAGE,
  //                     message: 'Error al añadir categoría(s) al producto'
  //                 })
  //             }
  //         })
  // })
};

//ACTUALIZAR PRODUCTO
export const modifyProduct = (id, producto) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}products/${id}`, producto);
    dispatch({
      type: MODIFY_PRODUCT,
      payload: res.data[1][0],
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al actualizar producto",
    });
  }
};

//Borra un producto
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${url}products/${id}`);
    dispatch({
      type: DELETE_PRODUCT,
      payload: [id, res.data]
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al eliminar el producto",
    });
  }
};

// Trae LOS productos por la categoria
export const getProductByCategory = (nameCat, limit, offset) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}products/categoria/?nameCat=${nameCat}&limit=${limit}&offset=${offset}`);
    dispatch({
      type: GET_PRODUCTS_BY_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al encontrar los productos",
    });
  }
};

//Funcion de SearchBar Busca por nombre
export const searchProduct = (productName) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}products/search?query=${productName}`);
    dispatch({
      type: SEARCH_PRODUCT,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al buscar el producto",
    });
  }
};

// Trae producto por id
export const getProductById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}products/${id}`);
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Ese id no existe",
    });
  }
};

// Trae todos los productos con sus respectivas categorias
export const getProductJoinCategory = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}products/?include="categories"`);
    dispatch({
      type: GET_PRODUCT_JOIN_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al encontrar los productos con sus categorias",
    });
  }
};

// Agrega una categoria a un producto
export const postProductJoinCategory = (idProd, idCat) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}relations/${idProd}/category/${idCat}`);
    dispatch({
      type: POST_PRODUCT_JOIN_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al agregar categoria a un producto",
    });
  }
};

// Elimina una categoria a un producto
export const deleteProductJoinCategory = (idProd, idCat) => async (
  dispatch
) => {
  try {
    const res = await axios.delete(
      `${url}relations/${idProd}/category/${idCat}`
    );
    dispatch({
      type: DELETE_PRODUCT_JOIN_CATEGORY,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al eliminar categoria de un producto",
    });
  }
};

////////////////////////////   PRODUCTS   ////////////////////////////////////// 





////////////////////////////   CATEGORIES   ////////////////////////////////////// 

//Trae todas las categorias
export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}categories`);
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al mostrar categorías",
    });
  }
};

// Agrega una categoría
export const addCategory = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}categories/`, payload);
    dispatch({
      type: ADD_CATEGORY,
      payload: res.data[0],
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al añadir categoría",
    });
  }
};

// Modifica una categoría
export const updateCategory = (id, category) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}categories/${id}`, category);
    dispatch({
      type: MODIFY_CATEGORY,
      payload: res.data[1][0],
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al actualizar una categoría",
    });
  }
};

// Borra una categoría
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${url}categories/${id}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: [id, res.data]
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Error al eliminar la categoría",
    });
  }
};

////////////////////////////   CATEGORIES   ////////////////////////////////////// 






////////////////////////////   CART   ////////////////////////////////////// 


//Agrega productos al carrito Y modifica la cantidad del producto en el carrito
export const postProductToCart = (orderId, productId, payload) => async (dispatch) => {
  const { unitprice, quantity } = payload;
  var res;
  try {
    if (orderId === 0) {
      var localCart = JSON.parse(localStorage.getItem("guestCart"));
      if (!localCart.products) {
        localCart.products = []
      }
      if (localCart.products.length === 0) {
        const producto = await axios.get(`${url}products/${productId}`);
        localCart.products.push(producto.data);
        localCart.products[0].Order_products = { quantity, unitprice }
      } else {
        var isExist = false;
        for (let i = 0; i < localCart.products.length; i++) {
          if (localCart.products[i].id === productId) {
            isExist = true;
            localCart.products[i].Order_products.quantity += quantity;
            localCart.products[i].Order_products.unitprice = unitprice;
          }
        }
        if (!isExist) {
          const producto = await axios.get(`${url}products/${productId}`);
          localCart.products.push(producto.data);
          localCart.products[localCart.products.length - 1].Order_products = { quantity, unitprice };
        }
      }
      localStorage.setItem("guestCart", JSON.stringify(localCart));
      res = { data: localCart };
    } else {
      res = await axios.post(`${url}orders/${orderId}/cart/${productId}`, payload)
    }
    dispatch({
      type: POST_PRODUCT_TO_CART,
      payload: res.data,
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "No se pudo agregar el producto al carrito",
    });
  }
};


//Elimina un producto del carrito
export const delProductToCart = (orderId, productId) => async (dispatch) => {
  var res;
  try {
    if (orderId === 0) {
      var localCart = JSON.parse(localStorage.getItem("guestCart"));
      localCart.products = localCart.products.filter((elem) => elem.id !== productId);
      localStorage.setItem("guestCart", JSON.stringify(localCart));
      res = { data: localCart };
    } else {
      res = await axios.delete(`${url}orders/${orderId}/cart/${productId}`)
    }
    dispatch({
      type: DEL_PRODUCT_TO_CART,
      payload: res.data,
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "No se encuentra el Producto en ese Carrito",
    });
  }
};


//Vacia el carrito
export const emptyAllProductsOfCart = (orderId) => async (dispatch) => {
  var res;
  try {
    if (orderId === 0) {
      var localCart = JSON.parse(localStorage.getItem("guestCart"));
      localCart.products = [];
      localStorage.setItem("guestCart", JSON.stringify(localCart));
      res = { data: localCart };
    } else {
      res = await axios.delete(`${url}orders/${orderId}/products`)
    }
    dispatch({
      type: EMPTY_ALL_PRODUCTS_OF_CART,
      payload: res.data,
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "No se encuentran Productos es ese Carrito",
    });
  }
};


//Trae el carrito del usuario con sus productos agregados
export const getCartByUser = (idUser) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}orders/${idUser}/cart`)
    dispatch({
      type: GET_CART_BY_IDUSER,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para acceder al carrito",
    });
  }
};

//Crea un carrito para un usuario
export const postCreateCart = (idUser) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}orders/${idUser}`);
    dispatch({
      type: POST_CREATE_CART,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para crear el carrito",
    });
  }
};

//Cambia el stock de productos en el store
export const putQuantity = (idUser, idOrder, idProduct, cant) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}users/${idUser}/cart`, idOrder, idProduct, cant);
    dispatch({
      type: PUT_CHANGE_QUANTITY,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para modificar la cantidad del producto",
    });
  }
};

//Copia el GUESTCART en el store
export const copyCartToStore = (guestCart) => (dispatch) => {
  dispatch({
    type: COPY_CART_TO_STORE,
    payload: guestCart
  })
}

////////////////////////////   CART   ////////////////////////////////////// 





////////////////////////////   ORDERS   ////////////////////////////////////// 

//Trae todas las ordenes de compras con sus usuarios y sus productos
export const getFullOrders = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}orders/filter`);
    dispatch({
      type: GET_FULL_ORDERS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para traer las ordenes de compra",
    });
  }
};

//Trae todas las ordenes de un usuario
export const getOrderById = (orderId) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}orders/${orderId}`);
    dispatch({
      type: GET_ORDER_BY_ID,
      payload: res.data,
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas para traer la órden de compra",
    });
  }
};

//Moificar order /:id UPDATE_ORDER
export const updateOrder = (id, payload) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}orders/${id}`, payload);
    dispatch({
      type: UPDATE_ORDER,
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al modificar la order",
    });
  }
}

////////////////////////////   ORDERS   ////////////////////////////////////// 





////////////////////////////   REVIEW   ////////////////////////////////////// 

//Agrega una review de un usuario a un producto
export const addReview = (user_id, product_id, payload) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}reviews/${user_id}/product/${product_id}`, payload)
    dispatch({
      type: ADD_REVIEW,
      payload: res.data,
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Review no creada",
    });
  }
};

//Trae todas las reviews con sus usuarios
export const getReviews = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}reviews/?include="user"`)
    dispatch({
      type: GET_REVIEWS,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al conseguir las reviews"
    })
  }
};

//Modifica la review del usuario logueado
export const updateReview = (id, payload) => async (dispatch) => {
  try {
    const res = await axios.put(`${url}reviews/${id}`, payload);
    dispatch({
      type: UPDATE_REVIEW,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al modifucar la review"
    })
  }
};

//DELETE_REVIEW
export const deleteReview = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${url}reviews/removeReview/${id}`)
    dispatch({
      type: DELETE_REVIEW ,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al conseguir las reviews"
    })
  }
}

////////////////////////////   REVIEW   ////////////////////////////////////// 





////////////////////////////   MULTER   ////////////////////////////////////// 

///Trae todas las imagenes de un producto por id
export const getImages = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}multer/?where={"productId":${id}}`);
    dispatch({
      type: GET_IMAGES,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al traer las imágenes",
    });
  }
};

//Agrega imagen a un producto por id
export const addImages = (payload, id) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}multer/${id}`, payload);
    dispatch({
      type: ADD_IMAGES,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas al añadir imágenes",
    });
  }
};


//Elimina imagen de producto por id
export const deleteImages = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${url}multer/${id}`);
    dispatch({
      type: DELETE_IMAGES,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: ERROR_MESSAGE,
      message: "Problemas borrar una imagen",
    });
  }
};

////////////////////////////   MULTER   ////////////////////////////////////// 


