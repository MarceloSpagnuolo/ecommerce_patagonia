import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFullOrders } from '../../store/actions';

function TableOrders() {
    const dispatch = useDispatch();
    const { order } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getFullOrders())
    }, [])

    return (
        <div>
            <h4>Listado de Ordenes en el Sistema</h4>
            <table>
                <thead>
                    <tr className="ordersUsers-titulos">
                        <th>id</th>
                        <th>Usuario</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order.map((ord) => (
                        <tr className="ordersUsers-Datos">
                            <td>{ord.id}</td>
                            <td>{ord.user}</td>
                            <td>{ord.date}</td>
                            <td>{ord.status}</td>
                            <td>{ord.total}</td>
                            <Link to={`/admin/order/${ord.id}`}>
                                <button>Ver Orden</button>
                            </Link>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )


}


export default TableOrders;