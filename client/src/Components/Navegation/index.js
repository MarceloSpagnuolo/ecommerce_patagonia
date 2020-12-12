import { Link } from 'react-router-dom'
import React from 'react'
import SearchBar from "../SearchBar/SearchBar.js"

 const Home = () =>
    <div className="home">
        <h1>Ecommerce Patagonia</h1>
        <nav>
            <Link to="/">Home </Link>
            <Link to="/categories">Categorias </Link>
            <Link to="/products">Productos </Link>
            <Link to="/contact">Contactenos </Link>
            <SearchBar></SearchBar>
        </nav>
    </div>

    export default Home
