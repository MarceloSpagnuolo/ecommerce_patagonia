import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./admin.css";

function Admin() {
    const { user } = useSelector(state => state);

    return user.role === "admin" ? (
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
                <Link to="admin/users">
                    <div className="Admin-Content-Photo">
                        <img className="Admin-Imagen" src="http://localhost:3001/images/users.jpg" />
                        <span className="Admin-Titulo">USUARIOS</span>
                    </div>
                </Link>
            </div>
        </div>
        ) : 
        <div className="Authorized-Container">
            <img className="Authorized-Imagen" src="http://localhost:3001/images/401.jpg" />
        </div> ;
};

export default Admin;