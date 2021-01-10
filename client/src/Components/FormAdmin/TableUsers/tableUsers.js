import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, putRoleUser } from "../../../store/actions";
import "./tableUsers.css"


const TableUser = () => {
    const { users } = useSelector((state) => state);
    const dispatch = useDispatch()
    const [usLocal, setUsLocal] = useState(8)

    useEffect(() => {
        dispatch(getUsers());
    }, []);


    const handleClick = (id, role) => {
        dispatch(putRoleUser(id, role))
    }

    return (
        <div className="table-users-container">
            <h2 className="table-users-titles">Usuarios</h2>
            <table className="table-users">
                <thead className="table-users-titles">
                    <tr>
                        <th>Id</th>
                        <th>Apellido y Nombre</th>
                        <th>Email</th>
                        <th>Ciudad</th>
                        <th>Dirección</th>
                        <th>Codigo Postal</th>
                        <th>Telefono</th>
                        <th>Rol</th>
                        <th>Cambiar Rol</th>
                    </tr>

                </thead>
                <tbody>
                    {!!users && users.length > 0 && users.map((us) => (
                        <tr>
                            <td>{us.id}</td>
                            <td>{us.familyname + " " + us.givenname}</td>
                            <td>{us.email}</td>
                            <td>{us.city}</td>
                            <td>{us.adress}</td>
                            <td>{us.postal}</td>
                            <td>{us.phone}</td>
                            <td>{us.role}</td>
                            <td>
                                {usLocal !== us.id ?
                                    (us.role === "user") ? <button className="table-user-button"
                                        onClick={() => handleClick(us.id, { "role": "admin" })}>Promover</button> :
                                        (us.role === "admin") ? <button className="table-user-button"
                                            onClick={() => handleClick(us.id, { "role": "user" })}>Remover</button> : null
                                    : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default TableUser;