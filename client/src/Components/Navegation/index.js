import { Link } from 'react-router-dom'
import React from 'react'
 const Home = () =>
    <div className="home">
        <h1>Ecommerce Patagonia</h1>
        <nav>
            <Link to="/">Home </Link>
            <Link to="/categories">Categorias </Link>
            <Link to="/products">Productos </Link>
            <Link to="/contact">Contactenos </Link>
        </nav>
    </div>

    export default Home
