import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getOrderById} from "../../store/actions/index";

const Order = (props) => {
    const dispatch = useDispatch();
    const { order } = useSelector(state => state)
    const history = useHistory();

    useEffect(() => {
        props.match.params.id &&  dispatch(getOrderById(props.match.params.id));
        return function cleanup() { };
    },[])


      return (
        <div>
            <h2>Detalle de Orden </h2>
            {<h4>Usuario: {order.user && order.user.name} {order.user && order.user.lastname}</h4>}
            <h4>Fecha: {order && order.date}</h4>
            <h4>Estado: {order && order.status}</h4>
            <table>                <thead>
                    <tr className="orderDetail-titulos">
                        <th>id</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order.products && order.products.map((prod) => (
                       <tr className="OrderDetail-Datos">
                       <td>{prod.id}</td>
                       <td>{prod.name}</td>
                       <td>{prod.Order_products.unitprice}</td>
                       <td>{prod.Order_products.quantity}</td>
                       <td>{prod.Order_products.unitprice * prod.Order_products.quantity}</td>
                   </tr>
                    ))}

                </tbody>
            </table>
            <h3>Total</h3>
            <h3></h3>
            <button onClick={() => history.goBack()}>Volver</button>
        </div>
        
      )
}

export default Order;