import React, { useEffect, useState } from "react";
import "./login.css"


function Login(props) {
    console.log(props);
    const [show, setShow ] = useState(true);

    useEffect(() => {
        setShow(props.show);
    },[])

    function handleClose() {
        setShow(false);
    }

    return (
        <div className="Login-Container" id={show && "Login-Show"}>
            <div className="Login-Content">
                <header className="Login-Header">
                    Acceso de Usuario
                </header>
                <section className="Login-Section">
                    Cuerpo de la ventana
                </section>
                <footer className="Login-Footer">
                    <button onClick={() =>handleClose()}>Cerrar</button>
                </footer>
            </div>

        </div>
    );
};

export default Login;