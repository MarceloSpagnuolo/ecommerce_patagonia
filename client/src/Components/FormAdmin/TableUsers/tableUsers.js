import React, { useEffect, useState  } from "react";
import axios from "axios";
import { useSelector, useDispatch} from "react-redux";
import { Redirect } from "react-router-dom";
import { getUsers, putRoleUser } from "../../../store/actions";
import "./tableUsers.css"


const TableUser = () => {
    const [cambio, setCambio] = useState(true)
    const { users, user } = useSelector((state) => state);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers());
    }, [cambio]);


    const handleClick = (id, role) => {
        dispatch(putRoleUser(id, role))
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/users/${id}`)
        setCambio(!cambio)
        console.log(cambio)
    }

    return user.role === "admin" ? (
        <div className="table-users-container">
            <h2 className="table-users-titles">Usuarios</h2>
            <table className="Table">
                <thead className="table-users-titles">
                    <tr id="Tr">
                        <th className="Th">Id</th>
                        <th className="Th">Apellido y Nombre</th>
                        <th className="Th">Email</th>
                        <th className="Th">Ciudad</th>
                        <th className="Th">Dirección</th>
                        <th className="Th">Codigo Postal</th>
                        <th className="Th">Telefono</th>
                        <th className="Th">Rol</th>
                        <th className="Th">Cambiar Rol</th>
                        <th className="Th">Eliminar Usuario</th>
                    </tr>

                </thead>
                <tbody>
                    {!!users && users.length > 0 && users.map((us) => (
                        <tr id="Tr" key={us.id}>
                            <td className="Td">{us.id}</td>
                            <td className="Td">{us.familyname + " " + us.givenname}</td>
                            <td className="Td">{us.email}</td>
                            <td className="Td">{us.city}</td>
                            <td className="Td">{us.adress}</td>
                            <td className="Td">{us.postal}</td>
                            <td className="Td">{us.phone}</td>
                            <td className="Td">{us.role}</td>
                            <td className="Td">
                                {user.id !== us.id ?
                                    (us.role === "user") ? <button className="table-user-button"
                                        onClick={() => handleClick(us.id, { "role": "admin" })}>Promover</button> :
                                        (us.role === "admin") ? <button className="table-user-button"
                                            onClick={() => handleClick(us.id, { "role": "user" })}>Remover</button> : null
                                    : null}
                            </td>
                            <td className="Td">
                                {(us.id !== user.id) && (us.role !== "deleted")  ? 
                                <div><button onClick={(() => handleDelete(us.id))} className="table-user-button">Eliminar</button></div> : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
    : <div className="Authorized-Container">
        <img className="Authorized-Imagen" src="http://localhost:3001/images/401.jpg" />
      </div>
}


export default TableUser;