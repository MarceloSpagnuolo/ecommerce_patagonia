import "./login.css"

function Login(guestId) {
    
    function handleClose() {
        document.body.removeChild(loginContainerEl);
    }

    const loginContainerEl = document.createElement('div');
    loginContainerEl.className="Login-Container";
        const loginContentEl = document.createElement('div')
        loginContentEl.className = "Login-Content";
    loginContainerEl.appendChild(loginContentEl);

            const loginContentHeaderEl = document.createElement('header');
            loginContentHeaderEl.className="Login-Header"
            loginContentHeaderEl.innerHTML = "Acceso de Usuario";

            const loginContentBodyEl = document.createElement('section');
            loginContentBodyEl.className = "Login-Section"

                const loginContentBodyFormEl = document.createElement('form');

                    const loginContentBodyFormDivEl = document.createElement('div');
                    loginContentBodyFormDivEl.className = "Login-Campos";

                        const loginContentBodyFormDivLabel1El = document.createElement('label');
                        loginContentBodyFormDivLabel1El.for = "email";
                        loginContentBodyFormDivLabel1El.innerHTML = "Email registrado";
                        const loginSalto = document.createElement('br');
                        const logonContenBodyFormDivInput1El = document.createElement('input');
                        logonContenBodyFormDivInput1El.autofocus = true;
                        logonContenBodyFormDivInput1El.size = 40;
                        logonContenBodyFormDivInput1El.type = "email";
                        logonContenBodyFormDivInput1El.id = "email";
                        logonContenBodyFormDivInput1El.className = "Login-Campos";
                        logonContenBodyFormDivInput1El.name = "email";

                    loginContentBodyFormDivEl.appendChild(loginContentBodyFormDivLabel1El);
                    loginContentBodyFormDivEl.appendChild(loginSalto);
                    loginContentBodyFormDivEl.appendChild(logonContenBodyFormDivInput1El);

                    const loginContentBodyFormDiv2El = document.createElement('div');
                    loginContentBodyFormDiv2El.className = "Login-Campos"
                        const loginContentBodyFormDiv2Label1El = document.createElement('label');
                        loginContentBodyFormDiv2Label1El.for = "pass";
                        loginContentBodyFormDiv2Label1El.innerHTML = "Contraseña";
                        const loginSalto2 = document.createElement('br');
                        const logonContenBodyFormDiv2Input1El = document.createElement('input');
                        logonContenBodyFormDiv2Input1El.size = 40;
                        logonContenBodyFormDiv2Input1El.type = "password";
                        logonContenBodyFormDiv2Input1El.id = "pass";
                        logonContenBodyFormDiv2Input1El.className = "Login-Campos";
                        logonContenBodyFormDiv2Input1El.name = "pass";

                    loginContentBodyFormDiv2El.appendChild(loginContentBodyFormDiv2Label1El);
                    loginContentBodyFormDiv2El.appendChild(loginSalto2);
                    loginContentBodyFormDiv2El.appendChild(logonContenBodyFormDiv2Input1El);

                loginContentBodyFormEl.appendChild(loginContentBodyFormDivEl);
                loginContentBodyFormEl.appendChild(loginContentBodyFormDiv2El);

            loginContentBodyEl.appendChild(loginContentBodyFormEl);

                const loginContentBodyDivEl = document.createElement('div');
                loginContentBodyDivEl.className = "Login-Leyenda";

                    const loginContentBodyDivSpanEl = document.createElement('span');
                    loginContentBodyDivSpanEl.className = "Login-Sep-Leyenda";
                    loginContentBodyDivSpanEl.innerHTML = "Si no tiene una cuenta, deberá";
                    const loginContentBodyDivLinkEl = document.createElement('a');
                    loginContentBodyDivLinkEl.href = "/registro";
                    loginContentBodyDivLinkEl.innerHTML = "registrarse";

                loginContentBodyDivEl.appendChild(loginContentBodyDivSpanEl);
                loginContentBodyDivEl.appendChild(loginContentBodyDivLinkEl);

            loginContentBodyEl.appendChild(loginContentBodyDivEl);

            const loginContentFooterEl = document.createElement('footer');
            loginContentFooterEl.className="Login-Footer";

            const loginContentDivEl = document.createElement('div');
            loginContentDivEl.className = "Login-Btn-Social";

                const loginContentDivButtonEl = document.createElement('button');
                loginContentDivButtonEl.className = "Login-Btn-Google";
                loginContentDivButtonEl.innerHTML = "Acceder con Google";
                
                const loginContenDivButtonImageEl = document.createElement('img');
                loginContenDivButtonImageEl.src = `${process.env.REACT_APP_API_URL}/images/google.png`;
                loginContenDivButtonImageEl.className = "Login-Logo-Btn";
                
                loginContentDivButtonEl.appendChild(loginContenDivButtonImageEl);
                loginContentDivEl.appendChild(loginContentDivButtonEl);

                const loginContentDivButton2El = document.createElement('button');
                loginContentDivButton2El.className = "Login-Btn-Facebook";
                loginContentDivButton2El.innerHTML = "Acceder con Facebook";

                const loginContentDivButton2ImageEl = document.createElement('img');
                loginContentDivButton2ImageEl.src = `${process.env.REACT_APP_API_URL}/images/facebook.png`;
                loginContentDivButton2ImageEl.className = "Login-Logo-Btn";

                loginContentDivButton2El.appendChild(loginContentDivButton2ImageEl);
                loginContentDivEl.appendChild(loginContentDivButton2El);

        loginContentEl.appendChild(loginContentHeaderEl);
        loginContentEl.appendChild(loginContentBodyEl);
        loginContentEl.appendChild(loginContentDivEl);
        loginContentEl.appendChild(loginContentFooterEl);
    
                const loginFooterButtonCancelEl = document.createElement('button');
                loginFooterButtonCancelEl.innerHTML = "Cancelar";
                loginFooterButtonCancelEl.className = "Login-Btn-Down";
                loginFooterButtonCancelEl.id = "Login-Cancel"
                loginFooterButtonCancelEl.addEventListener("click", handleClose);

                const loginFooterButtonAceptarEl = document.createElement('button');
                loginFooterButtonAceptarEl.innerHTML = "Entrar";
                loginFooterButtonAceptarEl.className = "Login-Btn-Down";
                loginFooterButtonAceptarEl.id = "Login-Entrar";
                loginFooterButtonAceptarEl.disabled = true;
                loginFooterButtonAceptarEl.title = "Debe ingresar los datos de acceso";

            loginContentFooterEl.appendChild(loginFooterButtonCancelEl);
            loginContentFooterEl.appendChild(loginFooterButtonAceptarEl);
    
    document.body.appendChild(loginContainerEl);
};
                
export default Login;