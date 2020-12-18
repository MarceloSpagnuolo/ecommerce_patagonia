import { Link } from "react-router-dom";
import React from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import "./styles.css";
import { connect } from "react-redux";
import { getCategories, getProducts } from "../../store/actions/index.js";

function Home(props) {
  function handleClick() {
    props.getProducts(12,0);
    props.getCategories();
  }

  return (
    <div className="home">
      <Link to="/">
        <img
          className="logo"
          src="https://seeklogo.com/images/P/patagonia-cerveza-logo-E4330326F4-seeklogo.com.png"
        />
      </Link>
      <div className="segundo">
        <h1 className="titleEcom">Ecommerce Patagonia</h1>
        <nav className="navegacion">
          <Link className="btnMenu" to="/">
            Inicio{" "}
          </Link>
          <Link className="btnMenu" to="/categories">
            Categorias{" "}
          </Link>
          <Link
            className="btnMenu"
            to="/products/?page=1"
            onClick={() => handleClick()}
          >
            Productos{" "}
          </Link>
          <Link className="btnMenu" to="/contact">
            Contáctenos{" "}
          </Link>
          <SearchBar></SearchBar>
          <img
            className="Navegation-Imagen-Carrito"
            src="https://image.flaticon.com/icons/png/512/107/107831.png"
          />
        </nav>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
    categories: state.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: (limit, offset) => dispatch(getProducts(limit, offset)),
    getCategories: () => dispatch(getCategories()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
