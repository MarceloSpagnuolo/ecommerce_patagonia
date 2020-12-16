import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

function TableOrders(props) {
    // const dispatch = useDispatch();
    const { order } = useSelector((state) => state);
    const history = useHistory();
    const [total, setTotal] = useState(0);


    useEffect(() => {
        var currentOrder = order.filter((ord) => ord.id === props.id)
    }, [])

    return (
        <div>
            <h2>Detalle de Orden </h2>
            <h4>Usuario: {props.users.name}</h4>
            <h4>Fecha: {props.date}</h4>
            <h4>Estado: {props.status}</h4>
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
                    {currentOrder[0].products.map((prod) => (
                        <tr className="OrderDetail-Datos">
                            <td>{prod.id}</td>
                            <td>{prod.name}</td>
                            <td>{prod.order.price}</td>
                            <td>{prod.order.quantity}</td>
                            <td>{prod.order.price * prod.order.quantity}</td>
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


export default TableOrders;