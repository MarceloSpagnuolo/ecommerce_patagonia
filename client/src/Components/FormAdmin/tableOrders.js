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
            <table>
                <thead>
                    <tr className="headTable-orders-user">
                        <th>id</th>
                        <th>Usuario</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Total</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 && orders.map((ord) => (
                        <tr className="ordersUsers-Datos">
                            <td>{ord.id}</td>
                            <td>{ord.user.givenname + " " + ord.user.familyname}</td>
                            <td>{ord.date}</td>
                            <td>{ord.status}</td>
                            <td>{ord.total}</td>
                            <td >
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