import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { browserHistory } from 'react-router';
import axios from "axios";
import "./login.css";
import { useDispatch } from "react-redux";
import { getUserByToken } from "../../store/actions/index.js"

const url = "https://ecommerce-patagonia.herokuapp.com";

function Login({ guestId, show, onClose }, props) {
    const dispatch = useDispatch();
    const [estado, setEstado] = useState({
        email: '',
        password: ''
    })

     function handleReset() {
        alert("Ruta de MailGun");
    }

    function handleInput(e) {
        setEstado({
            ...estado,
            [e.target.name]: e.target.value
        })
    }

    const handleLogueo = async () => {
        try {
            //enviamos el mail y el password a la ruta /login
            const newToken = await axios.post(`${url}/auth/login`, estado)
            if (newToken) {  //si la ruta nos devolvió un token
                dispatch(getUserByToken(newToken.data))
                onClose();
            }
        } catch (e) {
            alert("Los datos están incorrectos");
        }
    }

    return show ? (
        <div className="Login-Container">
            <div className="LoginSub-Content">
                <header className="LoginDiv-Header">
                    <div className="nameLogin">Acceso de Usuario</div>
                </header>
                <section className="LoginDiv-Section">
                    <form>
                        <div className="LoginDiv-Campos">
                            <label className="nameInput" htmlFor="email">Email registrado</label><br></br>
                            <input autoFocus={true} size={40} type="email" id="email" name="email" className="LoginDivInput-Campos" pattern={/^([a-zA-Z0-9._+-]+)(@[a-zA-Z0-9-.]+)(\.)+(.[a-zA-Z]{2,4}){1,2}$/gm} onChange={(e) => handleInput(e)} />
                        </div>
                        <div className="LoginDiv-Campos">
                            <label className="nameInput" htmlFor="password">Contraseña</label><br></br>
                            <input size={60} type="password" id="pass" name="password" className="LoginDivInput-Campos" onChange={(e) => handleInput(e)} />
                        </div>
                    </form>
                    <div className="LoginDiv-Campos btLogMeOlvide">
                        <button className="btnOlvidePass" onClick={() => handleReset()} >Olvidé mi contraseña</button>
                    </div>
                </section>
                <div className="gridLogin4">
                    <div className="Login-Leyenda noRegistrLogin">
                        <span className="Login-Sep-Leyenda">Si no tiene una cuenta, deberá </span>
                        <Link to="/registro" className="ToRegis" onClick={() => { onClose && onClose() }}>Registrarse</Link>
                    </div>
                    <div className="Login-Btn-Social btnGoogleLogin">
                        <a href={`${url}/auth/google`} className="Login-Btn-Google">
                            Acceder con Google
                            <img src={`${url}/images/google.png`} className="Login-Logo-Btn googleIcon" alt="img-google" />
                        </a>
                    </div>
                    <div className="Login-Btn-Social btnFaceLogin" >
                        <a href={`${url}/auth/facebook`} className="Login-Btn-Facebook">
                            Acceder con Facebook
                            <img src={`${url}/images/facebook.png`} className="Login-Logo-Btn faceIcon" alt="img-facebook" />
                        </a>
                    </div>
                    <div className="LoginDiv-Footer loginEntrarSalir">
                        <button className="Login-Btn-Down" id="Login-Cancel" onClick={() => { onClose && onClose() }}>Cancelar</button>
                        <button className="Login-Btn-Down"
                            title={(estado.email.length === 0 || estado.password.length === 0) ? "Debe ingresar los datos de acceso" : null}
                            id="Login-Entrar"
                            onClick={() => handleLogueo()}
                            disabled={estado.email.length === 0 || estado.password.length === 0}>Acceder</button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default Login;