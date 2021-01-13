import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFullOrders, updateOrder } from '../../store/actions';
import "./TableOrders.css";







function TableOrders(props) {
    const dispatch = useDispatch();
    const [estado, setEstado] = useState("todos")
    const [display, setDisplay] = useState(false)
    const [update, setUpdate] = useState("")
    const [a, setA] = useState("")
    const { orders, user } = useSelector(state => state)
    // console.log(orders, "aoisjdoiajsd", estado)
    useEffect(() => {
        dispatch(getFullOrders());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [estado, updateOrder])
    //"carrito", "creada", "procesando", "cancelada", "completa"
    function status(status) {
        setEstado(status)
    }
    function editStatus(id, status) {
        const order = {
            total: 100,
            date: "2017-08-09T14:00:00.000Z",
            status: status
        }
        dispatch(updateOrder(id, order))
    }

    const DivsButtons = ({ id }) => {
        const estados = ["carrito", "creada", "procesando", "cancelada", "completa"]
        return (
            <div className="ppol">
                <div className="megaprueba">
                    {estados.map(s => (
                        <button className="bsStado" id={s === update ? s : ""} onClick={() => setUpdate(s)}>{s}</button>
                    ))}
                    <button className="cancelarEsTO" onClick={() => { setUpdate(""); setDisplay(false) }}>x</button>
                    <button className="cambiarEsTO" onClick={() => { editStatus(id, update); setDisplay(false) }}>Cambiar estado</button>
                </div>
            </div>
        )
    }

    return user.role === "admin" ? (
        <div className="divContaianerOrders">
            <div className="divImgOrder">
                <div className="imgTiOrders"><img src="http://localhost:3001/images/fondoOrders.gif" alt=""/></div>
            </div>

            <div className="buttonContainerOrder">
                <div className="mnj"><img src="http://localhost:3001/images/fondoVERT.gif" alt=""/></div>
                <div className="mj"><span><p className="pepsito">Estados</p></span></div>
                <div className="buttonsContainerStatus">
                    <button onClick={() => status("todos")}>todos</button>
                    <button onClick={() => status("carrito")}>carrito</button>
                    <button onClick={() => status("creada")}>creada</button>
                    <button onClick={() => status("procesando")}>procesando</button>
                    <button onClick={() => status("cancelada")}>cancelada</button>
                    <button onClick={() => status("completa")}>completa</button>
                </div>
            </div>
            <div className="conteiner-orders-user">
                <div className="divTitleOrder">
                    <h3 className="title-orders-user">Listado de Ordenes en el Sistema</h3>
                </div>

                <table className="tableOrders">
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
                        {!!orders && orders.length > 0 && orders.map((ord) => {
                            if (estado === "todos") {
                                return (
                                    <tr className="ordersUsers-Datos" key={ord.id}>
                                        <td>{ord.id}</td>
                                        <td>{ord.user.givenname + " " + ord.user.familyname}</td>
                                        <td>{ord.date}</td>
                                        <td className={`orStatus ${ord.status}`}>{ord.status}
                                            <div className="nb"><button className="rty" onClick={() => { setDisplay(!display); setA(ord.id); setUpdate(ord.status) }}><img src="https://cdn.discordapp.com/attachments/764979688446885898/797350101030928414/editar_2.png" alt=""/></button>
                                                {display && a === ord.id ? <DivsButtons id={ord.id} /> : null}
                                            </div>
                                        </td>
                                        <td>{ord.total}</td>
                                        <td className="botonFeo">
                                            <div>
                                                <Link to={`/admin/orders/${ord.id}`}>
                                                    <button className="bottom-orders-user">Ver Orden</button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>)
                            } else if (estado === ord.status) {
                                return (
                                    <tr className="ordersUsers-Datos" key={ord.id}>
                                        <td>{ord.id}</td>
                                        <td>{ord.user.givenname + " " + ord.user.familyname}</td>
                                        <td>{ord.date}</td>
                                        <td className={`orStatus ${ord.status}`}>{ord.status}
                                            <div className="nb"><button className="rty" onClick={() => { setDisplay(!display); setA(ord.id); setUpdate(ord.status) }}><img src="https://cdn.discordapp.com/attachments/764979688446885898/797350101030928414/editar_2.png" alt=""/></button>
                                                {display && a === ord.id ? <DivsButtons id={ord.id} /> : null}
                                            </div>
                                        </td>
                                        <td>{ord.total}</td>
                                        <td >
                                            <Link to={`/admin/orders/${ord.id}`}>
                                                <button className="bottom-orders-user">Ver Orden</button>
                                            </Link>
                                        </td>
                                    </tr>)
                            }
                        return null}
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
    : <div className="Authorized-Container">
        <img className="Authorized-Imagen" src="http://localhost:3001/images/401.jpg" alt=""/>
      </div>
}





export default TableOrders;