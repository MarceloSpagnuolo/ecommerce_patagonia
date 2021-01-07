import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";


function Login({ guestId, show, onClose }) {
    const [ estado, setEstado ] = useState({
        email: '',
        pass: ''
    })
    /* const [ mail, setMail ] = useState('');
    const [ pass, setPass ] = useState(''); */
    
    function handleInput(e) {
        setEstado({... estado, 
            [e.target.name]: e.target.value})
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
                            <label for="pass">Contraseña</label><br></br>
                            <input size={40} type="password" id="pass" name="pass" className="Login-Campos" onChange={(e) => handleInput(e)}/>
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
                    <button className="Login-Btn-Facebook">
                        <img src="http://localhost:3001/images/facebook.png" className="Login-Logo-Btn" />
                        Acceder con Facebook
                    </button>
                </div>
                <footer className="Login-Footer">
                <button className="Login-Btn-Down" id="Login-Cancel" onClick={() => {onClose && onClose()}}>Cancelar</button>
                <button className="Login-Btn-Down" 
                  title={ estado.email.length === 0 || estado.pass.length === 0 && "Debe ingresar los datos de acceso"} 
                  id="Login-Entrar" 
                  onClick={() => {onClose && onClose()}}
                  disabled={ estado.email.length  === 0 || estado.pass.length === 0 }>Entrar</button>
              </footer>
            </div>
        </div>
    ) : null;
};

export default Login;