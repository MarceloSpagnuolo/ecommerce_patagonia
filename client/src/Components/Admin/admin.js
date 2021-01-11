import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./admin.css";

function Admin() {
    const { user } = useSelector(state => state);


    return user.role === "admin" ? (
        <div className="Admin-Container-Total">
            <h2 className="Admin-Admin">ADMINISTRACION</h2>
            <div className="Admin-Container">
                <Link to="admin/products">
                    <div className="Admin-Content-Photo">
                        <img className="Admin-Imagen" src="http://localhost:3001/images/products.jpg" alt="PRODUCTOS" />
                        <span className="Admin-Titulo">PRODUCTOS</span>
                    </div>
                </Link>
                <Link to="admin/categories" >
                    <div className="Admin-Content-Photo">
                        <img className="Admin-Imagen" src="http://localhost:3001/images/categories.jpg" alt="CATEGORIAS" />
                        <span className="Admin-Titulo">CATEGORIAS</span>
                    </div>
                </Link>
            </div>
            <div className="Admin-Container">
                <Link to="admin/orders">
                    <div className="Admin-Content-Photo">
                        <img className="Admin-Imagen" src="http://localhost:3001/images/orders.jpg" alt="ORDENES" />
                        <span className="Admin-Titulo">ORDENES</span>
                    </div>
                </Link>
                <Link to="admin/users">
                    <div className="Admin-Content-Photo">
                        <img className="Admin-Imagen" src="http://localhost:3001/images/users.jpg" alt="USUARIOS" />
                        <span className="Admin-Titulo">USUARIOS</span>
                    </div>
                </Link>
            </div>
        </div>
    )
    : <Redirect to="/unauthorize" />
};

export default Admin;