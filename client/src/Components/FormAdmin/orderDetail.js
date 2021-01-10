import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getOrderById } from "../../store/actions/index";
import "./orderDetail.css";

const Order = (props) => {
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state)
    const history = useHistory();
    const [total, setTotal] = useState(0)

    useEffect(() => {
        props.match.params.id && dispatch(getOrderById(props.match.params.id));
    }, [])

    useEffect(() => {
        var sum = 0;
        !!orders.products && orders.products.map((prod) => {
            sum += prod.Order_products.unitprice * prod.Order_products.quantity
        })
        setTotal(sum)
    }, [orders])


    return (
        <div className="container-orderDetail">
            <div className="orderDetail-user">
                <h2 className="table-orderDetail">Detalle de Orden </h2>
                {<h4>Usuario: {orders.user && orders.user.givenname} {orders.user && orders.user.familyname}</h4>}
                <h4>Fecha: {orders && orders.date}</h4>
                <h4>Estado: {orders && orders.status}</h4>
            </div>
            <table className="Table">
                <thead>
                    <tr id="Tr" className="orderDetail-titulos">
                        <th className="Th">Id</th>
                        <th className="Th">Producto</th>
                        <th className="Th">Precio</th>
                        <th className="Th">Cantidad</th>
                        <th className="Th">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.products && orders.products.map((prod) => (
                        <tr id="Tr" className="table-orderDetail" key={prod.id}>
                            <td className="Td">{prod.id}</td>
                            <td className="Td">{prod.name}</td>
                            <td className="Td">{prod.Order_products.unitprice}</td>
                            <td className="Td">{prod.Order_products.quantity}</td>
                            <td className="Td">{prod.Order_products.unitprice * prod.Order_products.quantity}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <h3 className="orderDetail-user">Total: {total}</h3>
            <button className="back-button-orderDetail" onClick={() => history.goBack()}>Volver</button>
        </div>

    )
}

export default Order;