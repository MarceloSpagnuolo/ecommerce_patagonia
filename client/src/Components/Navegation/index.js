import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import "./styles.css";
import { connect } from "react-redux";
import { getCategories, getProducts, createUser, postCreateCart, getUserCart, getUserById, getCartByUser } from "../../store/actions/index.js";
import Login from "../Login/login.js";

function Home(props) {
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    localStorage.clear();   //Esto es solo para desarrollar la aplicacion, después se elimina.
    if (!props.user.id) {
      var user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        props.createUser({ givenname: "guest", familyname: "guest", role: "guest" });
      } else {
        props.getUserById(user.id);
        props.getCartByUser(user.id);
      }
    }
  }, [])

  useEffect(() => {

    if (props.user.id) {
      var user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        props.postCreateCart(props.user.id)
      }
      localStorage.setItem("user", JSON.stringify(props.user));
    }
    if (props.order.products) {
      setTotal(props.order.products.length)
    }
  }, [props.user])

  useEffect(() => {
    if (props.order.products) {
      setTotal(props.order.products.length)
    }
  }, [props.order])

  function handleClick() {
    props.getProducts(12, 0);
    props.getCategories();
  }

  return (
    <>
      <div className="home">
        <Link to="/">
          <img
            className="logo"
            src="https://seeklogo.com/images/P/patagonia-cerveza-logo-E4330326F4-seeklogo.com.png"
          />
        </Link>
        <div className="segundo">
          <h1 className="titleEcom">ECOMMERCE PATAGONIA</h1>
          <nav className="navegacion">
            <div className="prueba-nav">
              <Link className="btnMenu" to="/">
                <span>Inicio</span>
              </Link>
            </div>
            <div className="prueba-nav">
              <Link className="btnMenu" to="/categories">
                <span>Categorias</span>
              </Link>
            </div>
            <div className="prueba-nav">
              <Link
                className="btnMenu"
                to="/products/?page=1"
                onClick={() => handleClick()}
              >
                <span>Productos</span>
              </Link>
            </div>
            <div className="prueba-nav">
              <Link className="btnMenu" to="/contact">
                <span>Contáctenos</span>
              </Link>
            </div>
            <div className="ss-home">

              <Link to="/cart">
                <img
                  className="Navegation-Imagen-Carrito"
                  src="https://cdn.discordapp.com/attachments/764979688446885898/792228021385691136/icons8-carrito-de-compras-64.png"
                />
                {total > 0 && (
                  <span className="Navegation-Cantidad">{total}</span>
                )}
              </Link>
              <SearchBar />
            </div>
            {props.user.role === "guest" ?
              <span className="btnMenu" onClick={() => setShow(true)}>Entrar</span>
              : <span className="btnMenu">{props.user.givenname}</span>}
            <Link to="/registro"><span className="btnMenu">Registrarse</span></Link>
          </nav>
        </div>
      </div>
      <div>
        <Login guestId={props.user.id} show={show} onClose={() => setShow((p) => !p)} />
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
    categories: state.categories,
    user: state.user,
    order: state.order,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: (limit, offset) => dispatch(getProducts(limit, offset)),
    getCategories: () => dispatch(getCategories()),
    createUser: (payload) => dispatch(createUser(payload)),
    postCreateCart: (id) => dispatch(postCreateCart(id)),
    getUserCart: (id) => dispatch(getUserCart(id)),
    getUserById: (id) => dispatch(getUserById(id)),
    getCartByUser: (id) => dispatch(getCartByUser(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);