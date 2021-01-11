import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import "./styles.css";
import { connect, useDispatch } from "react-redux";
import {
  getCategories,
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


function Home(props) {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!props.user.id) {
      const token = localStorage.getItem("userToken");
      if (!token) {
        var localUser = JSON.parse(localStorage.getItem("guestUser"));
        if (!localUser) {
          const carrito = { id: 0, total: 0, status: "carrito", date: Date.now() };
          const usuario = { id: 0, givenname: "Guest", familyname: "Guest", role: "guest" };
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
          dispatch(postProductToCart(props.order.id, elem.id, { unitprice: elem.Order_products.unitprice, quantity: elem.Order_products.quantity }))
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
            alt="img-logo"
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
              <Link className="btnMenu" to="/contacto">
                <span>Contáctenos</span>
              </Link>
            </div>
            {props.user && props.user.role === "admin" ?
              <Link className="btnMenu" to="/admin">
                <span>Admin</span>
              </Link>
              : <Link className="nununu" to="/admin">
                <span>Admin</span>
              </Link>}
            <div className="ss-home">

              <Link to="/cart">
                <img
                  className="Navegation-Imagen-Carrito"
                  src="https://cdn.discordapp.com/attachments/764979688446885898/792228021385691136/icons8-carrito-de-compras-64.png"
                  alt="img-carrito"
                />
                {total > 0 && (
                  <span className="Navegation-Cantidad">{total}</span>
                )}
              </Link>
              <SearchBar />
              <div className="megaDivNav">
                {props.user.role === "guest" ?
                  <div className="divEntrarNav">
                    <span className="entrarNav" onClick={() => setShow(true)}><img className="iconEntrar" src="https://cdn.discordapp.com/attachments/764979688446885898/797733755603124254/usuario_1.png" alt="" />Entrar
                  </span>
                  </div>
                  : <div className="divEntrarNav" ><span className="entrarNav"><img className="iconEntrar" src="https://cdn.discordapp.com/attachments/764979688446885898/797733755603124254/usuario_1.png" alt="" />{props.user.givenname}</span></div>}
                {props.user && props.user.role === "guest" ?
                  <div className="divRegistroNav"><Link to="/registro"><span id="registroNav"><img className="iconRegis" src="https://cdn.discordapp.com/attachments/764979688446885898/797734641536598026/agregar-usuario_1.png" alt="" />Registrarse</span></Link></div>
                  : <div className="divRegistroNav"><span id="registroNav" onClick={() => salir()}><img className="iconRegis" src="https://cdn.discordapp.com/attachments/764979688446885898/797944797762551818/logout_1.png" alt="" />Salir</span></div>}
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div>
        {props.user && <Login guestId={props.user.id} show={show} onClose={() => setShow((p) => !p)} />}
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