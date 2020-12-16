import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

function TableOrders(props) { 
    const dispatch = useDispatch();
    const { order } = useSelector((state) => state);
    const history = useHistory();

    useEffect(() => {
        //dispatch(getOrder())
    },[])

    return (
        <div>
            <h2>Detalle de Orden </h2>
            <h4>Estado: {props.status}</h4>
            <h4>Fecha: {props.date}</h4>
            <h4>Usuario: {props.users.name}</h4>
            <table>
                <thead>
                    <tr className="orderDetail-titulos">
                        <th>id</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {props.map((ord) => (
                    <tr className="OrderDetail-Datos">
                        <td>{props.products.id}</td>
                        <td>{props.products.name}</td>
                        <td>{props.products.precio}</td>
                        <td>{props.products.quantity}</td>
                        <td>{props.order.total}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => history.goBack()}>Volver</button>
        </div> 
    )


}


export default TableOrders;