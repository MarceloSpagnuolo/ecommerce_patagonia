import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFullOrders } from '../../store/actions';

function TableOrders(props) {
    const dispatch = useDispatch();
    const { order } = useSelector(state => state)

    useEffect(() => {
        dispatch(getFullOrders());
        return function cleanup() { }; 
    },[])

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
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {order.length > 0 && order.map((ord) => (
                        <tr className="ordersUsers-Datos">
                            <td>{ord.id}</td>
                            <td>{ord.user.name+" "+ord.user.lastname}</td>
                            <td>{ord.date}</td>
                            <td>{ord.status}</td>
                            <td>{ord.total}</td>
                            <Link to={`/admin/orders/${ord.id}`}>
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