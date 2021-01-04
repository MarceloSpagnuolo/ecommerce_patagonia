import { Link } from "react-router-dom";
import React, { useEffect,  useState } from "react";
import SearchBar from "../SearchBar/SearchBar.js";
import "./styles.css";
import { connect } from "react-redux";
import { getCategories, getProducts, createUser, postCreateCart, getUserCart, getUserById, getCartByUser } from "../../store/actions/index.js";

function Home(props) {
  const [ total, setTotal] = useState(0);
  const [ show, setShow ] = useState(false);

  useEffect(() => {
    if (!props.user.id) {
      var user = JSON.parse(localStorage.getItem("user"));
      if(!user) {
        props.createUser({name: "guest", lastname: "guest", role: "guest"});
      } else {
        props.getUserById(user.id);
        props.getCartByUser(user.id);
      }
    }
  },[])
  
  useEffect(() => {
    if(props.user.id) {
      var user = JSON.parse(localStorage.getItem("user"));
      if(!user) {
        props.postCreateCart(props.user.id)
      }
      localStorage.setItem("user",JSON.stringify(props.user));
    }
    if(props.order.products) {
      setTotal(props.order.products.length)
    }
  },[props.user])

  useEffect(() => {
    if(props.order.products) {
      setTotal(props.order.products.length)
    }
  },[props.order])

  function handleLogin() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
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
          >
            Productos{" "}
          </Link>
          <Link className="btnMenu" to="/contact">
            Contáctenos{" "}
          </Link>
          <SearchBar></SearchBar>
          <div className="Navegation-Container-Carrito">
            <Link to="/cart">
            <img
              className="Navegation-Imagen-Carrito"
              src="https://image.flaticon.com/icons/png/512/107/107831.png"
            />
            {total > 0 && (
              <span className="Navegation-Cantidad">{total}</span>
            )}
            </Link>
          </div>
          <span className="btnMenu" onClick={() => handleLogin()}>Entrar</span>
          <span className="btnMenu" onClick={() => handleLogin()}>Registrarse</span>
        </nav>
      </div>
    </div>
      <div>
        {show && 
          <div className="Login-Container">
            <div className="Login-Content">
              <header className="Login-Header">
                Acceso de Usuario
              </header>
              <section className="Login-Section">
                <form>
                  <div className="Login-Campos">
                    <label for="email">Email registrado</label><br></br>
                    <input autofocus="true" autocorrect="off" size={40} type="email" id="email" name="email" className="Login-Campos" /><br></br>
                  </div>
                  <div className="Login-Campos">
                    <label for="pass">Contraseña</label><br></br>
                    <input size={40} type="password" id="pass" name="pass" className="Login-Campos" />
                  </div>
                </form>
                <div className="Login-Leyenda">
                  <span className="Login-Sep-Leyenda">Si no tiene una cuenta, deberá </span>
                  <Link to="/registro">registrarse</Link>
                </div>
              </section>
              <div className="Login-Btn-Social">
                <button className="Login-Btn-Google">
                  <img src="http://localhost:3001/images/google.png" className="Login-Logo-Btn" />
                  Acceder con Google
                </button>
                <button className="Login-Btn-Github">
                  <img src="http://localhost:3001/images/github.jpg" className="Login-Logo-Btn" />
                  Acceder con GitHub
                </button>
              </div>
              <footer className="Login-Footer">
                <button className="Login-Btn-Down" id="Login-Cancel" onClick={() => handleClose()}>Cancelar</button>
                <button className="Login-Btn-Down" 
                  title={true && "Debe ingresar los datos de acceso"} 
                  id="Login-Entrar" 
                  onClick={() => handleClose()}
                  disabled={true}>Entrar</button>
              </footer>
            </div>
          </div>}
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