import React, {useState} from "react";
import { useDispatch } from "react-redux"
import { updateUser } from "../../store/actions/index"
import "./style.css";

export default function Profile() {
    const dispatch = useDispatch()
    const [show , setShow] = useState({
        givenname: true,
        familyname: true,
        email: true,
        city: true,
        adress: true,
        phone: true,
        postal: true,
    })
    const [user, setUser] = useState({
        givenname: "Alan",
        familyname: "Casella",
        email: "alan.casella@hotmail.com",
        city: "CABA",
        adress: "Avenida Falsa 123",
        phone: "4856-9851",
        postal: "5000",
    })
    function handleClick(value) {
        setShow({...show, [value]: !show[value]})
        // setShow({...show, name: !show.name})
        
    }

    function handleInput(e) {
     
        setUser({... user, 
            [e.target.name]: e.target.value})
    }

    function handleCancel(value){
        setShow({...show, [value]: !show[value]})
       
    }

    function handleSubmit(e, user){
        e.preventDefault();
        dispatch(updateUser(1, user))
        alert("Sus datos fueron actualizados")
    }

    function handleReset(e, user) {
        e.preventDefault()
        console.log("Link de resetear contraseña")
    }

return (
    <>
    <form className="UserProfileForm">
        <div className="UserProfileRegistroImagen1">
        
        <div className="UserProfileDivContainer">
        
        {show.givenname ? <span onClick={() => handleClick("givenname")} className="SpanEdit" id="name">
            <h3 className="UserProfileH3">Nombre:</h3>
            <div className="StrongData">
            <strong >{user.givenname}</strong>
            </div>          
            <span className="SpanEditar">
                <img className="UserProfileEditImg" src="http://localhost:3001/images/BotonDeEditar.png"></img>
                Editar</span>
        </span> : <div className="UserProfileDivAfterIf">
                            <label for="name" className="UserProfileLabel">Nombre:</label><br></br>
                            <input className="UserProfileInput" autocomplete="off" size={40} type="text" name="givenname"  onChange={(e) => handleInput(e)} value={user.givenname}/>
                            <button className="UserProfileButtonAfterIf" onClick={() => handleCancel("givenname")}>Fijar Cambios</button>
                        </div>}
        {show.familyname ?<span className="SpanEdit" onClick={() => handleClick("familyname")}>
            <h3 className="UserProfileH3">Apellido:</h3>
            <div className="StrongData">
            <strong >{user.familyname}</strong>
            </div>
            <span className="SpanEditar">
                <img className="UserProfileEditImg" src="http://localhost:3001/images/BotonDeEditar.png"></img>
                Editar</span>
        </span> : <div className="UserProfileDivAfterIf">
                            <label className="UserProfileLabel" for="familyname">Apellido:</label><br></br>
                            <input className="UserProfileInput" autocomplete="off" size={40} type="text" name="familyname"  onChange={(e) => handleInput(e)} value={user.familyname}/>
                            <button className="UserProfileButtonAfterIf" onClick={() => handleCancel("familyname")}>Fijar Cambios</button>
                        </div>}
       {show.email ? <span onClick={() => handleClick("email")} className="SpanEdit">
            <h3 className="UserProfileH3">Email:</h3>
            <div className="StrongData">
            <strong >{user.email}</strong>
            </div>
            <span className="SpanEditar">
                <img className="UserProfileEditImg" src="http://localhost:3001/images/BotonDeEditar.png"></img>
                Editar</span>
        </span> : <div className="UserProfileDivAfterIf">
                            <label className="UserProfileLabel" for="email">Email:</label><br></br>
                            <input className="UserProfileInput" autocomplete="off" size={40} type="email" name="email"  onChange={(e) => handleInput(e)} value={user.email}/>
                            <button className="UserProfileButtonAfterIf" onClick={() => handleCancel("email")}>Fijar Cambios</button>
                        </div>}
        {show.city ? <span className="SpanEdit" onClick={() => handleClick("city")}>
            <h3 className="UserProfileH3">City:</h3>
            <div className="StrongData">
            <strong >{user.city}</strong>
            </div>
            <span className="SpanEditar">
                <img className="UserProfileEditImg" src="http://localhost:3001/images/BotonDeEditar.png"></img>
                Editar</span>
        </span> : <div className="UserProfileDivAfterIf">
                            <label className="UserProfileLabel" for="city">City:</label><br></br>
                            <input className="UserProfileInput" autocomplete="off" size={40} type="text" name="city"  onChange={(e) => handleInput(e)} value={user.city}/>
                            <button className="UserProfileButtonAfterIf" onClick={() => handleCancel("city")}>Fijar Cambios</button>
                        </div>}
        {show.adress ? <span onClick={() => handleClick("adress")} className="SpanEdit">
            <h3 className="UserProfileH3">Adress:</h3>
            <div className="StrongData">
            <strong >{user.adress}</strong>
            </div>
            <span className="SpanEditar">
                <img className="UserProfileEditImg" src="http://localhost:3001/images/BotonDeEditar.png"></img>
                Editar</span>
        </span> : <div className="UserProfileDivAfterIf">
                            <label className="UserProfileLabel" for="adress">Address:</label><br></br>
                            <input className="UserProfileInput" autocomplete="off" size={40} type="text" name="adress"  onChange={(e) => handleInput(e)} value={user.adress}/>
                            <button className="UserProfileButtonAfterIf" onClick={() => handleCancel("adress")}>Fijar Cambios</button>
                        </div>}
        {show.phone ? <span className="SpanEdit"onClick={() => handleClick("phone")}>
            <h3 className="UserProfileH3">Phone:</h3>
            <div className="StrongData">
            <strong >{user.phone}</strong>
            </div>
            <span className="SpanEditar">
                <img className="UserProfileEditImg" src="http://localhost:3001/images/BotonDeEditar.png"></img>
                Editar</span>
        </span> : <div className="UserProfileDivAfterIf">
                            <label className="UserProfileLabel" for="phone" >Phone:</label><br></br>
                            <input className="UserProfileButton" className="UserProfileInput" autocomplete="off" size={40} type="text" name="phone"  onChange={(e) => handleInput(e)} value={user.phone}/>
                            <button className="UserProfileButtonAfterIf" onClick={() => handleCancel("phone")}>Fijar Cambios</button>
                        </div>}
        {show.postal ? <span className="SpanEdit" onClick={() => handleClick("postal")}>
            <h3 className="UserProfileH3">Postal:</h3>
            <div className="StrongData">
            <strong >{user.postal}</strong>
            </div>
            <span className="SpanEditar">
            <img className="UserProfileEditImg" src="http://localhost:3001/images/BotonDeEditar.png"></img>
                Editar</span>
        </span> : <div className="UserProfileDivAfterIf">
                            <label className="UserProfileLabel" for="postal">Postal:</label><br></br>
                            <input className="UserProfileButton" className="UserProfileInput" autocomplete="off" size={40} type="text" name="postal"  onChange={(e) => handleInput(e)} value={user.postal}/>
                            <button className="UserProfileButtonAfterIf" onClick={() => handleCancel("postal")}>Fijar Cambios</button>
                        </div>}
                        <div className="UserDivButton">
                        <button onClick={(e) => handleSubmit(e, user)} className="UserActualizarButton">Actualizar Datos</button>
                        <button onClick={(e) => handleReset(e, user)} className="UserResetearButton">Resetear Contraseña</button>
                        </div>
                        </div>
                        </div>
    </form>
    </>
)
}