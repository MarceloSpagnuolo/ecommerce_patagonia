import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFullOrders } from '../../store/actions';
import "./TableOrders.css";


function TableOrders(props) {
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state)

    useEffect(() => {
        dispatch(getFullOrders());
    }, [])

    return (
        <div className="conteiner-orders-user">
            <h3 className="title-orders-user">Listado de Ordenes en el Sistema</h3>
            <table className="Table">
                <thead>
                    <tr id="Tr" className="headTable-orders-user">
                        <th className="Th">id</th>
                        <th className="Th">Usuario</th>
                        <th className="Th">Fecha</th>
                        <th className="Th">Estado</th>
                        <th className="Th">Total</th>
                        <th className="Th">Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length > 0 && orders.map((ord) => (
                        <tr id="Tr" className="ordersUsers-Datos" key={ord.id}>
                            <td className="Td">{ord.id}</td>
                            <td className="Td">{ord.user.givenname + " " + ord.user.familyname}</td>
                            <td className="Td">{ord.date}</td>
                            <td className="Td">{ord.status}</td>
                            <td className="Td">{ord.total}</td>
                            <td className="Td">
                                <Link to={`/admin/orders/${ord.id}`}>
                                    <button className="bottom-orders-user">Ver Orden</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )


}

export default TableOrders;