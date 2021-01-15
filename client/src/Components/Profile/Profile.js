import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  updateUser,
  getUserByToken,
  getOrdersByUser,
} from "../../store/actions/index";
import "./style.css";
import Modal from "../Modal/Modal.js";
import ResetPassword from "./ResetPassword.js";

export default function Profile() {
  const dispatch = useDispatch();
  const { user, orders } = useSelector((state) => state);
  const [disable, setDisable] = useState(0);
  const [display, setDisplay] = useState(false);
  const [show, setShow] = useState({
    givenname: true,
    familyname: true,
    email: true,
    city: true,
    adress: true,
    phone: true,
    postal: true,
  });
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    dispatch(getOrdersByUser(user.id))
  },[])

  useEffect(() => {
    setUsuario({
      id: user.id,
      givenname: user.givenname,
      familyname: user.familyname,
      email: user.email,
      city: user.city,
      adress: user.adress,
      phone: user.phone,
      postal: user.postal,
    });
  }, [user]);

  function handleClick(value) {
    setShow({ ...show, [value]: !show[value] });
    setDisable(disable + 1);
  }

  function handleInput(e) {
    if (
      e.target.name === "givenname" ||
      e.target.name === "familyname" ||
      e.target.name === "email"
    ) {
      if (e.target.value === "") {
        alert("Este campo no puede estar vacio");
      }
    }
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  }

  function handleCancel(e, value) {
    if (usuario.givenname === "" || usuario.familyname === "") {
      e.preventDefault();
      alert("Este campo no puede estar vacío");
    } else if (
      !/^([a-zA-Z0-9._+-]+)(@[a-zA-Z0-9-.]+)(\.)+(.[a-zA-Z]{2,4}){1,2}$/gm.test(
        usuario.email
      )
    ) {
      e.preventDefault();
      alert("Email no válido");
    } else {
      setShow({ ...show, [value]: !show[value] });
      setDisable(disable - 1);
    }
  }

  async function handleSubmit(e, user) {
    e.preventDefault();
    dispatch(updateUser(user.id, user));
    const res = await axios.get(`http://localhost:3001/auth/me`);
    dispatch(getUserByToken(res.data));
    alert("Sus datos fueron actualizados");
  }

  function handleReset(e, user) {
    e.preventDefault();
    setDisplay(true);
  }

  function handleEliminar(id) {
    var result = window.confirm("Si elimina su cuenta no podrá volver a entrar con este usuario. ¿Desea continuar con la operación?");
if (result) {
  axios.delete(`http://localhost:3001/users/${id}`)
  localStorage.removeItem("userToken");
  window.location.href = "/";
}
  }

  return (
    <div className="UserProfileFirstDiv">
      <div className="UserProfileForm">
        <div className="divImgProfile">
          <div className="UserProfileRegistroImagen1">
            <img
              className="imgPstaProfile"
              src="http://localhost:3001/images/Imagencita.jpg"
              alt=""
            />
          </div>
        </div>
        <Modal
          title="Resetear Contraseña"
          show={display}
          onClose={() => setDisplay(false)}
        >
          <ResetPassword seteadora={setDisplay}></ResetPassword>
        </Modal>
        <form>
          <div className="UserProfileDivContainer">
            {show.givenname ? (
              <span
                onClick={() => handleClick("givenname")}
                className="SpanEdit"
                id="name"
              >
                <h3 className="UserProfileH3">Nombre:</h3>
                <div className="StrongData">
                  <strong>{usuario.givenname}</strong>
                </div>
                <span className="SpanEditar">
                  <img
                    className="UserProfileEditImg"
                    src="http://localhost:3001/images/BotonDeEditar.png"
                    alt=""
                  ></img>
                  Editar
                </span>
              </span>
            ) : (
              <div className="UserProfileDivAfterIf">
                <label for="name" className="UserProfileLabel">
                  Nombre:
                </label>
                <br></br>
                <input
                  className="UserProfileInput"
                  autoComplete="off"
                  size={40}
                  type="text"
                  name="givenname"
                  pattern=".{1,}"
                  onChange={(e) => handleInput(e)}
                  value={usuario.givenname}
                />
                <button
                  className="UserProfileButtonAfterIf"
                  onClick={(e) => handleCancel(e, "givenname")}
                >
                  Fijar Cambios
                </button>
              </div>
            )}
            {show.familyname ? (
              <span
                className="SpanEdit"
                onClick={() => handleClick("familyname")}
              >
                <h3 className="UserProfileH3">Apellido:</h3>
                <div className="StrongData">
                  <strong>{usuario.familyname}</strong>
                </div>
                <span className="SpanEditar">
                  <img
                    className="UserProfileEditImg"
                    src="http://localhost:3001/images/BotonDeEditar.png"
                    alt=""
                  ></img>
                  Editar
                </span>
              </span>
            ) : (
              <div className="UserProfileDivAfterIf">
                <label className="UserProfileLabel" for="familyname">
                  Apellido:
                </label>
                <br></br>
                <input
                  className="UserProfileInput"
                  autoComplete="off"
                  size={40}
                  type="text"
                  name="familyname"
                  onChange={(e) => handleInput(e)}
                  value={usuario.familyname}
                />
                <button
                  className="UserProfileButtonAfterIf"
                  onClick={(e) => handleCancel(e, "familyname")}
                >
                  Fijar Cambios
                </button>
              </div>
            )}
            {show.email ? (
              <span onClick={() => handleClick("email")} className="SpanEdit">
                <h3 className="UserProfileH3">Email:</h3>
                <div className="StrongData">
                  <strong>{usuario.email}</strong>
                </div>
                <span className="SpanEditar">
                  <img
                    className="UserProfileEditImg"
                    src="http://localhost:3001/images/BotonDeEditar.png"
                    alt=""
                  ></img>
                  Editar
                </span>
              </span>
            ) : (
              <div className="UserProfileDivAfterIf">
                <label className="UserProfileLabel" for="email">
                  Email:
                </label>
                <br></br>
                <input
                  className="UserProfileInput"
                  autoComplete="off"
                  size={40}
                  type="email"
                  name="email"
                  onChange={(e) => handleInput(e)}
                  value={usuario.email}
                />
                <button
                  className="UserProfileButtonAfterIf"
                  onClick={(e) => handleCancel(e, "email")}
                >
                  Fijar Cambios
                </button>
              </div>
            )}
            {show.city ? (
              <span className="SpanEdit" onClick={() => handleClick("city")}>
                <h3 className="UserProfileH3">Ciudad:</h3>
                <div className="StrongData">
                  <strong>{usuario.city}</strong>
                </div>
                <span className="SpanEditar">
                  <img
                    className="UserProfileEditImg"
                    src="http://localhost:3001/images/BotonDeEditar.png"
                    alt=""
                  ></img>
                  Editar
                </span>
              </span>
            ) : (
              <div className="UserProfileDivAfterIf">
                <label className="UserProfileLabel" for="city">
                  Ciudad:
                </label>
                <br></br>
                <input
                  className="UserProfileInput"
                  autoComplete="off"
                  size={40}
                  type="text"
                  name="city"
                  onChange={(e) => handleInput(e)}
                  value={usuario.city}
                />
                <button
                  className="UserProfileButtonAfterIf"
                  onClick={(e) => handleCancel(e, "city")}
                >
                  Fijar Cambios
                </button>
              </div>
            )}
            {show.adress ? (
              <span onClick={() => handleClick("adress")} className="SpanEdit">
                <h3 className="UserProfileH3">Dirección:</h3>
                <div className="StrongData">
                  <strong>{usuario.adress}</strong>
                </div>
                <span className="SpanEditar">
                  <img
                    className="UserProfileEditImg"
                    src="http://localhost:3001/images/BotonDeEditar.png"
                    alt=""
                  ></img>
                  Editar
                </span>
              </span>
            ) : (
              <div className="UserProfileDivAfterIf">
                <label className="UserProfileLabel" for="adress">
                  Dirección:
                </label>
                <br></br>
                <input
                  className="UserProfileInput"
                  autoComplete="off"
                  size={40}
                  type="text"
                  name="adress"
                  onChange={(e) => handleInput(e)}
                  value={usuario.adress}
                />
                <button
                  className="UserProfileButtonAfterIf"
                  onClick={(e) => handleCancel(e, "adress")}
                >
                  Fijar Cambios
                </button>
              </div>
            )}
            {show.phone ? (
              <span className="SpanEdit" onClick={() => handleClick("phone")}>
                <h3 className="UserProfileH3">Teléfono:</h3>
                <div className="StrongData">
                  <strong>{usuario.phone}</strong>
                </div>
                <span className="SpanEditar">
                  <img
                    className="UserProfileEditImg"
                    src="http://localhost:3001/images/BotonDeEditar.png"
                    alt=""
                  ></img>
                  Editar
                </span>
              </span>
            ) : (
              <div className="UserProfileDivAfterIf">
                <label className="UserProfileLabel" for="phone">
                  Teléfono:
                </label>
                <br></br>
                <input
                  className="UserProfileInput"
                  autoComplete="off"
                  size={40}
                  type="text"
                  name="phone"
                  onChange={(e) => handleInput(e)}
                  value={usuario.phone}
                />
                <button
                  className="UserProfileButtonAfterIf"
                  onClick={(e) => handleCancel(e, "phone")}
                >
                  Fijar Cambios
                </button>
              </div>
            )}
            {show.postal ? (
              <span className="SpanEdit" onClick={() => handleClick("postal")}>
                <h3 className="UserProfileH3">Postal:</h3>
                <div className="StrongData">
                  <strong>{usuario.postal}</strong>
                </div>
                <span className="SpanEditar">
                  <img
                    className="UserProfileEditImg"
                    src="http://localhost:3001/images/BotonDeEditar.png"
                    alt=""
                  ></img>
                  Editar
                </span>
              </span>
            ) : (
              <div className="UserProfileDivAfterIf">
                <label className="UserProfileLabel" for="postal">
                  Postal:
                </label>
                <br></br>
                <input
                  className="UserProfileInput"
                  autoComplete="off"
                  size={40}
                  type="text"
                  name="postal"
                  onChange={(e) => handleInput(e)}
                  value={usuario.postal}
                />
                <button
                  className="UserProfileButtonAfterIf"
                  onClick={(e) => handleCancel(e, "postal")}
                >
                  Fijar Cambios
                </button>
              </div>
            )}
            <div className="UserDivButton">
              <button
                onClick={(e) => handleSubmit(e, usuario)}
                className="UserActualizarButton"
                disabled={disable > 0}
                title={disable > 0 ? "Debe Fijar los cambios" : null}
              >
                Actualizar Datos
              </button>
              <div className="UserDivButton">
                <button
                className="UserActualizarButton"
                >
                  Ver Ordenes
                </button>
              </div>
              <button
                onClick={(e) => handleReset(e, usuario)}
                className="UserResetearButton"
                disabled={disable > 0}
                title={disable > 0 ? "Debe Fijar los cambios" : null}
              >
                Resetear Contraseña
              </button>
            </div>            
          </div>          
        </form>
        <div>
        <button className="UserActualizarButton" onClick={() => handleEliminar(user.id)}>Eliminar Cuenta</button>
        </div>
              <div className="Profile-Table-Orders">
                <table id="Profile-Table" className="table">
                  <thead>
                    <tr id="Tr" className="titulo">
                      <th className="Th">Nro</th>
                      <th className="Th">Fecha</th>
                      <th className="Th">Total</th>
                      <th className="Th">Estado</th>
                      <th className="Th"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders && orders.length > 0 && orders.map((elem) => (
                      <tr id="Tr" key={elem.id} className="index">
                        <td className="Td">{elem.id}</td>
                        <td className="Td">{elem.date}</td>
                        <td className="Td">{elem.total}</td>
                        <td className="Td">{elem.status}</td>
                        <td className="Td">
                          <Link to={`/profile/orderdetail/${elem.id}`}>
                            <button className="edit">Ver detalle</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
      </div>
    </div>
  );
}
