import { Link } from "react-router-dom";
import React from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import "./styles.css"

const Home = () => (
  <div className="home">
    <Link to="/">
      <img className="logo" src="https://seeklogo.com/images/P/patagonia-cerveza-logo-E4330326F4-seeklogo.com.png" />
    </Link>
    <div className="segundo">
      <h1 className="titleEcom">Ecommerce Patagonia</h1>
      <nav className="navegacion">
        <Link className="btnMenu" to="/">Inicio </Link>
        <Link className="btnMenu" to="/categories">Categorias </Link>
        <Link className="btnMenu" to="/products">Productos </Link>
        <Link className="btnMenu" to="/contact">Contáctenos </Link>
        <SearchBar></SearchBar>
      </nav>
    </div>
  </div>
);

export default Home;
