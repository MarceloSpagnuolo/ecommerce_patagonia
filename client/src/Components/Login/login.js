import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { useDispatch } from "react-redux";
import { getUserByToken } from "../../store/actions/index.js"

function Login({ guestId, show, onClose }) {
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
            const newToken = await axios.post("http://localhost:3001/auth/login", estado)
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
            <div className="Login-Content">
                <header className="Login-Header">
                    Acceso de Usuario
                </header>
                <section className="Login-Section">
                    <form>
                        <div className="Login-Campos">
                            <label for="email">Email registrado</label><br></br>
                            <input autofocus="true" size={40} type="email" id="email" name="email" className="Login-Campos" onChange={(e) => handleInput(e)} />
                        </div>
                        <div className="Login-Campos">
                            <label for="password">Contraseña</label><br></br>
                            <input size={40} type="password" id="pass" name="password" className="Login-Campos" onChange={(e) => handleInput(e)} />
                        </div>
                    </form>
                    <div className="Login-Campos">
                        <button onClick={() => handleReset()} >Olvidé mi contraseña</button>
                    </div>
                    <div className="Login-Leyenda">
                        <span className="Login-Sep-Leyenda">Si no tiene una cuenta, deberá </span>
                        <Link to="/registro" onClick={() => { onClose && onClose() }}>registrarse</Link>
                    </div>
                </section>
                <div className="Login-Btn-Social">
                    <button className="Login-Btn-Google">
                        <img src="http://localhost:3001/images/google.png" className="Login-Logo-Btn" alt="img-google" />
                            Acceder con Google
                    </button>
                    <button className="Login-Btn-Facebook">
                        <img src="http://localhost:3001/images/facebook.png" className="Login-Logo-Btn" alt="img-facebook" />
                        Acceder con Facebook
                    </button>
                </div>
                <footer className="Login-Footer">
                    <button className="Login-Btn-Down" id="Login-Cancel" onClick={() => { onClose && onClose() }}>Cancelar</button>
                    <button className="Login-Btn-Down"
                        title={(estado.email.length === 0 || estado.password.length === 0) && "Debe ingresar los datos de acceso"}
                        id="Login-Entrar"
                        onClick={() => handleLogueo()}
                        disabled={estado.email.length === 0 || estado.password.length === 0}>Entrar</button>
                </footer>
            </div>
        </div>
    ) : null;
};

export default Login;