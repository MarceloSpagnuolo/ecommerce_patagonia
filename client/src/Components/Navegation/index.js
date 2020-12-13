import { Link } from "react-router-dom";
import React from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import "./styles.css"
import { connect } from "react-redux";
import {getCategories, getProducts} from "../../store/actions/index.js"

function Home(props) {

  function handleClick() {
    props.getProducts();
    props.getCategories();
  }

  return(
  <div className="home">
    <Link to="/">
      <img className="logo" src="https://seeklogo.com/images/P/patagonia-cerveza-logo-E4330326F4-seeklogo.com.png" />
    </Link>
    <div className="segundo">
      <h1 className="titleEcom">Ecommerce Patagonia</h1>
      <nav className="navegacion">
        <Link className="btnMenu" to="/">Home </Link>
        <Link className="btnMenu" to="/categories">Categorias </Link>
        <Link className="btnMenu" to="/products" onClick={() => handleClick()}>Productos </Link>
        <Link className="btnMenu" to="/contact">Contáctenos </Link>
        <SearchBar></SearchBar>
      </nav>
    </div>
  </div>
);}

function mapStateToProps(state) {
  return {
    products: state.products,
    categories: state.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(getProducts()),
    getCategories: () => dispatch(getCategories()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)