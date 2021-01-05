import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";

function Admin() {

    return (
        <div className="Admin-Container-Total">
            <h2 className="Admin-Admin">ADMINISTRACION</h2>
            <div className="Admin-Container">
                <Link to="admin/products">
                    <div className="Admin-Content-Photo">
                        <img className="Admin-Imagen" src="http://localhost:3001/images/products.jpg" />
                        <span className="Admin-Titulo">PRODUCTOS</span>
                    </div>
                </Link>
                <Link to="admin/categories" >
                    <div className="Admin-Content-Photo">
                        <img className="Admin-Imagen" src="http://localhost:3001/images/categories.jpg" />
                        <span className="Admin-Titulo">CATEGORIAS</span>
                    </div>
                </Link>
            </div>
            <div className="Admin-Container">
                <Link to="admin/orders">
                    <div className="Admin-Content-Photo">
                        <img className="Admin-Imagen" src="http://localhost:3001/images/orders.jpg" />
                        <span className="Admin-Titulo">ORDENES</span>
                    </div>
                </Link>
                <div className="Admin-Content-Photo">
                    <img className="Admin-Imagen" src="http://localhost:3001/images/users.jpg" />
                    <span className="Admin-Titulo">USUARIOS</span>
                </div>
            </div>
        </div>
    )
};

export default Admin;