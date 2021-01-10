import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import "./styles.css";
import { connect, useDispatch } from "react-redux";
import { getCategories,
         getProducts,
         createUser,
         postCreateCart,
         getUserCart,
         getUserById,
         getCartByUser,
         copyCartToStore,
         copyUserToStore,
         getUserByToken,
         postProductToCart
        } from "../../store/actions/index.js";
import Login from "../Login/login.js";
import { LOGOUT } from "../../store/constants/constants.js";


function Home(props) {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!props.user.id) {
      const token = localStorage.getItem("userToken");
      if(!token) {
        var localUser = JSON.parse(localStorage.getItem("guestUser"));
        if(!localUser) {
          const carrito = { id: 0, total: 0, status: "carrito", date: Date.now() };
          const usuario = { id: 0, givenname: "Guest", familyname: "Guest" , role: "guest" };
          localStorage.setItem("guestUser", JSON.stringify(usuario));
          localStorage.setItem("guestCart", JSON.stringify(carrito));
          localUser = JSON.parse(localStorage.getItem("guestUser"));
        }
        const localCart = JSON.parse(localStorage.getItem("guestCart"));
        props.copyUserToStore(localUser);
        props.copyCartToStore(localCart);
      } else {
        props.getUserByToken(token);
      }
    }
  }, [])

  useEffect(() => {
    if (props.user.id > 0) {
      props.getCartByUser(props.user.id);
    }
  }, [props.user])

  useEffect(() => {
    // se borra si es usuario guest aunque no este logueado
    if (props.user.id > 0) {
      const localCart = JSON.parse(localStorage.getItem("guestCart"));
      if (localCart && localCart.products && localCart.products.length > 0) {
        localCart.products.map((elem) => {
          dispatch(postProductToCart(props.order.id, elem.id, {unitprice: elem.Order_products.unitprice, quantity: elem.Order_products.quantity }))
        })
      }
      localStorage.removeItem("guestCart");
      localStorage.removeItem("guestUser");
    }
    if (props.order.products) {
      setTotal(props.order.products.length);
    } else {
      setTotal(0);
    }
  }, [props.order])

  function handleClick() {
    props.getProducts(12, 0);
    props.getCategories();
  }

  function salir() {
    localStorage.removeItem("userToken");
    window.location.href = "/";
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
              {props.user && props.user.role === "admin" ?
              <Link className="btnMenu" to="/admin">
                <span>Admin</span>
              </Link>
              : null }
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
            {props.user && props.user.role === "guest" ?
            <div className="btnMenu">
              <span onClick={() => setShow(true)}>Entrar</span>
            </div>
              : props.user && <div className="btnMenu">
                <img className="Navigation-User" src="http://localhost:3001/images/user.png" />
                <span>{props.user.givenname}</span></div>}
              {props.user && props.user.role === "guest" ?
              <Link to="/registro"  className="btnMenu"><span>Registrarse</span></Link>
              : <div className="btnMenu"><span onClick={() => salir()}>Salir</span></div> }
          </nav>
        </div>
      </div>
      <div>
        { props.user && <Login guestId={props.user.id} show={show} onClose={() => setShow((p) => !p)} />}
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
    copyUserToStore: (payload) => dispatch(copyUserToStore(payload)),
    copyCartToStore: (payload) => dispatch(copyCartToStore(payload)),
    getUserByToken: (payload) => dispatch(getUserByToken(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);