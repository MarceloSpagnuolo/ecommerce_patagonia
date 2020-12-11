import axios from 'axios'

import {
    GET_PRODUCTS,
    ERROR_MESSAGE,
    MODIFY_PRODUCT,
    ADD_PRODUCT,
    DELETE_PRODUCT,
    ADD_CATEGORY_PRODUCT,
    REMOVE_CATEGORY_PRODUCT,
} from '../constants/constans';

const url = 'localhost:3001';

export const getproducts = () => async dispatch => {
    try {
        const product = await axios.get(`http://${url}/products`)
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
//pasar parametro catIds 
export const addProduct = (payload) => async (dispatch) => {
    try {
        const product = await axios.post(`http://${url}/products/`, payload)
        dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        })

    } catch (e) {
        dispatch({
            type: ERROR_MESSAGE,
            message: 'Error al añadir categoría(s) al producto'
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
        const actualizarProducto = await axios.put(`http://${url}/products/${dat.id}`, dat)
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

export const deltProduct=(id)=>  async (dispatch) => {

    try{
        const eliminarProducto = await axios.delete(`http://${url}/products/${id}`)
        dispatch({
            type: DELETE_PRODUCT

        })
    }catch(e){
        dispatch({
            type: ERROR_MESSAGE,
            message: 'Error al eliminar el producto'
        })
    }        
}