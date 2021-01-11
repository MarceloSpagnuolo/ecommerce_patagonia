import React, { useState } from "react";
import "./contacto.css";

function Contacto() {
    const [estado, setEstado] = useState({
        name: '',
        email: ''
    })

    function handleInput(e) {
        setEstado({
            ...estado,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="Contacto-Body">
            <table className="Contacto-Table">
                <tbody>
                    <tr className="Contacto-Tr">
                        <th className="Contacto-Th">DESARROLLADORES</th>
                        <th className="Contacto-Th">CONTACTO</th>
                        <th className="Contacto-Th">UBICACION</th>
                    </tr>
                    <tr>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Flecha" src="http://localhost:3001/images/flecha.png" alt="img-flecha" />
                                    <span>Alvarez Alejandro David</span>
                                </div>
                            </div>
                        </td>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Github" src="http://localhost:3001/images/github.png" alt="img-gitHub" />
                                    <span>GitHub: aalvag</span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Gmail" src="http://localhost:3001/images/gmail.png" alt="img-gmail" />
                                    <span>Gmail: </span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Facebook" src="http://localhost:3001/images/linkedin.png" alt="img-linkedin" />
                                    <span>Linkedin: </span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Instagram" src="http://localhost:3001/images/instagram.png" alt="img-instagram" />
                                    <span>Instagram: </span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Phone" src="http://localhost:3001/images/phone.png" alt="img-whatsapp" />
                                    <span>+54 11 23976209</span>
                                </div>
                            </div></td>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Lugar" src="http://localhost:3001/images/lugar.png" alt="img-ubicacion" />
                                    <span>Buenos Aires, Argentina</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr className="Contacto-Tr">
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Flecha" src="http://localhost:3001/images/flecha.png" alt="img-flecha" />
                                    <span>Casella Alan Daniel</span>
                                </div>
                            </div>
                        </td>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Github" src="http://localhost:3001/images/github.png" alt="img-github" />
                                    <span>GitHub: AlanCasella</span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Gmail" src="http://localhost:3001/images/gmail.png" alt="img-gmail" />
                                    <span>Gmail: </span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Facebook" src="http://localhost:3001/images/linkedin.png" alt="img-linkedin" />
                                    <span>Linkedin: </span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Instagram" src="http://localhost:3001/images/instagram.png" alt="img-instagram" />
                                    <span>Instagram: </span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Phone" src="http://localhost:3001/images/phone.png" alt="img-whatsapp" />
                                    <span>+54 11 40912932</span>
                                </div>
                            </div>
                        </td>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Lugar" src="http://localhost:3001/images/lugar.png" alt="img-ubiacion" />
                                    <span>CABA, Argentina</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Flecha" src="http://localhost:3001/images/flecha.png" alt="img-flecha" />
                                    <span>Nieto Daniel Ignacio</span>
                                </div>
                            </div>
                        </td>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Github" src="http://localhost:3001/images/github.png" alt="img-github" />
                                    <span>GitHub: Daniel-Ignacio-Nieto</span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Gmail" src="http://localhost:3001/images/gmail.png" alt="img-gmail" />
                                    <span>Gmail: </span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Facebook" src="http://localhost:3001/images/linkedin.png" alt="img-linkedin" />
                                    <span>Linkedin: </span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Instagram" src="http://localhost:3001/images/instagram.png" alt="img-instagram" />
                                    <span>Instagram: </span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Phone" src="http://localhost:3001/images/phone.png" alt="img-whatsapp" />
                                    <span>+54 351 5918511</span>
                                </div>
                            </div>
                        </td>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Lugar" src="http://localhost:3001/images/lugar.png" alt="img-ubiacion" />
                                    <span>Córdoba, Argentina</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Flecha" src="http://localhost:3001/images/flecha.png" alt="img-flecha" />
                                    <span>Salazar Eliezer</span>
                                </div>
                            </div>
                        </td>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Github" src="http://localhost:3001/images/github.png" alt="img-github" />
                                    <span>GitHub: babinobass</span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Gmail" src="http://localhost:3001/images/gmail.png" alt="img-gmail" />
                                    <span>Gmail: </span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Facebook" src="http://localhost:3001/images/linkedin.png" alt="img-linkedin" />
                                    <span>Linkedin: </span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Instagram" src="http://localhost:3001/images/instagram.png" alt="img-instagram" />
                                    <span>Instagram: </span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Phone" src="http://localhost:3001/images/phone.png" alt="img-whatsapp" />
                                    <span>+54 311 27656812</span>
                                </div>
                            </div>
                        </td>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Lugar" src="http://localhost:3001/images/lugar.png" alt="img-ubiacion" />
                                    <span>Buenos Aires, Argentina</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Flecha" src="http://localhost:3001/images/flecha.png" alt="img-flecha" />
                                    <span>Spagnuolo Ricardo Marcelo</span>
                                </div>
                            </div>
                        </td>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Github" src="http://localhost:3001/images/github.png" alt="img-github" />
                                    <span>GitHub: MarceloSpagnuolo</span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Gmail" src="http://localhost:3001/images/gmail.png" alt="img-gmail" />
                                    <span>Gmail: lu4huf@gmail.com</span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Facebook" src="http://localhost:3001/images/linkedin.png" alt="img-linkedin" />
                                    <span>Linkedin: Marcelo Spagnuolo</span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Instagram" src="http://localhost:3001/images/instagram.png" alt="img-instagram" />
                                    <span>Instagram: marcelospagnuolo</span>
                                </div>
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Phone" src="http://localhost:3001/images/phone.png" alt="img-whatsapp" />
                                    <span>+54 351 6185440</span>
                                </div>
                            </div>
                        </td>
                        <td className="Contacto-Td">
                            <div className="Contacto-Datos">
                                <div className="Contacto-Renglon">
                                    <img className="Contacto-Icono-Lugar" src="http://localhost:3001/images/lugar.png" alt="img-flecha" />
                                    <span>Leones, Córdoba, Argentina</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="Contacto-Body-Form">
                <div className="Contacto-Imagen">
                    <img src="http://localhost:3001/images/logocp.png" alt="img-logocp" />
                </div>
                <form autocomplete="off">
                    <div className="Contacto-Form">
                        <div>
                            <label for="name">Su Nombre</label><br></br>
                            <input className="Contacto-Input" size={20} type="text" autoFocus="True" name="name" onChange={(e) => handleInput(e)} />
                        </div>
                        <div>
                            <label for="email">Su Email</label><br></br>
                            <input className="Contacto-Input" size={20} type="email" name="email" onChange={(e) => handleInput(e)} />
                        </div>
                        <div>
                            <label for="phone">Su Teléfono</label><br></br>
                            <input className="Contacto-Input" size={12} type="tel" name="phone" onChange={(e) => handleInput(e)} />
                        </div>
                    </div>
                    <div className="Contacto-Form">
                        <div>
                            <label for="asunto">Asunto</label><br></br>
                            <input size={57} className="Contacto-Input" type="text" name="asunto" onChange={(e) => handleInput(e)} />
                        </div>
                    </div>
                    <div className="Contacto-Form">
                        <div>
                            <label for="mensaje">Su Mensaje</label><br></br>
                            <textarea rows={10} cols={58} className="Contacto-Input" name="mensaje" onChange={(e) => handleInput(e)} />
                        </div>
                    </div>
                    <div className="Contacto-Botones">
                        <div>
                            <button>Restablecer</button>
                            <button>Enviar</button>
                        </div>
                    </div>
                </form>
                <div className="Contacto-Imagen">
                    <img src="http://localhost:3001/images/logocp.png" alt="img-logocp" />
                </div>
            </div>
        </div>
    )
}

export default Contacto;