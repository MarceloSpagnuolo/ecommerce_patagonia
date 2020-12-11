import axios from 'axios'

import {
    GET_PRODUCTS,
    ERROR_MESSAGE,
    MODIFY_PRODUCT,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    ADD_CATEGORY_PRODUCT,
    REMOVE_CATEGORY_PRODUCT,
    ADD_CATEGORY,
    GET_CATEGORIES,
    MODIFY_CATEGORY,
    DELETE_CATEGORY,
} from '../constants/constans';

const url = 'http://localhost:3001/';

//Trae todos los productos
export const getproducts = () => async dispatch => {
    try {
        const product = await axios.get(`${url}products`)
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data

        })
    } catch (e) {
        dispatch(
            {
                type: ERROR_MESSAGE,
                message: "Error al mostrar productos"
            }
        )

    }
}
//agregar producto
export const addProduct = (payload) => async (dispatch) => {
    try {
        const product = await axios.post(`${url}products/`, payload)
        dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: ERROR_MESSAGE,
            message: 'Error al añadir producto'
        })

    }
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

}

//ACTUALIZAR PRODUCTO
export const updProduct=(dat)=>  async (dispatch) => {

    try{
        const actualizarProducto = await axios.put(`${url}products/${dat.id}`, dat)
        dispatch({
            type: MODIFY_PRODUCT,
            payload: res.data
        })
    }catch(e){
        dispatch({
            type: ERROR_MESSAGE,
            message: 'Error al actualizar producto'
        })
    }        
}

//Borra un producto
export const deltProduct=(id)=>  async (dispatch) => {

    try{
        const eliminarProducto = await axios.delete(`${url}products/${id}`)
        dispatch({
            type: DELETE_PRODUCT,
            payload: id

        })
    }catch(e){
        dispatch({
            type: ERROR_MESSAGE,
            message: 'Error al eliminar el producto'
        })
    }        
}

//Trae todas las categorias
export const getCategories = () => async dispatch => {
    try {
        const category = await axios.get(`${url}categories`)
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data

        })
    } catch (e) {
        dispatch(
            {
                type: ERROR_MESSAGE,
                message: "Error al mostrar productos"
            }
        )

    }
}

// Agrega una categoría
export const addCategory = (payload) => async (dispatch) => {
    try {
        const addcategory = await axios.post(`${url}categories/`, payload)
        dispatch({
            type: ADD_CATEGORY,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: ERROR_MESSAGE,
            message: 'Error al añadir producto'
        })

    }
}

// Modifica una categoría
export const updProduct=(dat)=>  async (dispatch) => {

    try{
        const updcategory = await axios.put(`${url}categories/${dat.id}`, dat)
        dispatch({
            type: MODIFY_CATEGORY,
            payload: res.data
        })
    }catch(e){
        dispatch({
            type: ERROR_MESSAGE,
            message: 'Error al actualizar producto'
        })
    }        
}

// Borra una categoría
export const deltCategory=(id)=>  async (dispatch) => {

    try{
        const deltcategory = await axios.delete(`${url}categories/${id}`)
        dispatch({
            type: DELETE_PRODUCT,
            payload: id

        })
    }catch(e){
        dispatch({
            type: ERROR_MESSAGE,
            message: 'Error al eliminar el producto'
        })
    }        
}