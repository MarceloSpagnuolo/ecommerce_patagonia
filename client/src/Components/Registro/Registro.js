import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useDispatch } from "react-redux"
import { createUser } from "../../store/actions/index"
import "./registro.css";

export default function Registro() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);

    return (
        <Formik initialValues={{
            givenname: "",
            familyname: "",
            email: "",
            password: "",
            city: "",
            adress: "",
            phone: "",
            postal: "",
            role: "user"
        }} validate={(values) => {
            const errors = {};
            //Expresiones regulares para password y email
            //regPass requiere entre 8 y 16 characters. y minimo una mayuscula, minuscula, char especial y numero
            //regMail requiere solo un formato de email asi "example@correo.com" pero se le agrega la posibilidad de agregar
            // un "." algo mas alfinal ejemp "example@correo.com.ar"
            const regPass = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/.test(values.password))
            const regMail = /^([a-zA-Z0-9._+-]+)(@[a-zA-Z0-9-.]+)(\.)+(.[a-zA-Z]{2,4}){1,2}$/gm.test(values.email)
            ////////////////////////
            if (!values.givenname) { errors.givenname = "Debe ingresar un nombre" }
            if (!values.familyname) { errors.familyname = "Debe ingresar su apellido" }
            if (!values.email) { errors.email = "Debe ingresar su email" }
            else if (!regMail) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = "Debe ingresar una contraseña"
            }else if (values.password.length > 15 || values.password.length < 6) {
                errors.password = "La contraseña debe poseer entre 6 y 15 caractéres"
            }
             else if(!regPass) {
                errors.password = "Su contraseña debe poseer al menos una mínuscula, una mayúsucla y un número" 
            } 

            return errors

        }} onSubmit={async (values) => {
            dispatch(createUser(values));
            setShow(false);
        }}>{({
            isSubmitting,
            isValid
        }) => (
            <>
                <div className="Registro-Body">
                    <div className="Registro-Imagen1">
                    </div>
                    <div className="Registro-Formik">
                        <h1 className="Registro-Title">Registro de Usuario</h1>
                        {show ?
                            <Form className="Registro-Form">
                                <div>
                                    <label className="Registro-Form-Label" htmlFor="Registro">Nombre*</label><br></br>
                                    <Field className="Registro-Form-Input" name="givenname" />
                                    <ErrorMessage name="givenname">{message => <div className="Registro-Form-Error">{message}</div>}</ErrorMessage>
                                </div>

                                <div>
                                    <label className="Registro-Form-Label" htmlFor="Registro">Apellido*</label><br></br>
                                    <Field className="Registro-Form-Input" name="familyname" />
                                    <ErrorMessage name="familyname">{message => <div className="Registro-Form-Error">{message}</div>}</ErrorMessage>
                                </div>

                                <div>
                                    <label className="Registro-Form-Label" htmlFor="Registro">Email*</label><br></br>
                                    <Field className="Registro-Form-Input" type="email" name="email" />
                                    <ErrorMessage name="email">{message => <div className="Registro-Form-Error">{message}</div>}</ErrorMessage>
                                </div>

                                <div>
                                    <label className="Registro-Form-Label" htmlFor="Registro">Contraseña*</label><br></br>
                                    <Field className="Registro-Form-Input" name="password" type="password" />
                                    <ErrorMessage name="password">{message => <div className="Registro-Form-Error">{message}</div>}</ErrorMessage>
                                </div>

                                <div>
                                    <label className="Registro-Form-Label" htmlFor="Registro">Ciudad</label><br></br>
                                    <Field className="Registro-Form-Input" name="city" />
                                </div>

                                <div>
                                    <label className="Registro-Form-Label" htmlFor="Registro">Direccion</label><br></br>
                                    <Field className="Registro-Form-Input" name="adress" />
                                </div>

                                <div>
                                    <label className="Registro-Form-Label" htmlFor="Registro">Teléfono</label><br></br>
                                    <Field className="Registro-Form-Input" name="phone" />
                                </div>

                                <div>
                                    <label className="Registro-Form-Label" htmlFor="Registro">Código Postal</label><br></br>
                                    <Field className="Registro-Form-Input" name="postal" />
                                </div>
                                <span>*Campos Obligatorios</span>
                                <button type="submit"
                                    className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                                    id="Registro-Btn-Submit"
                                    disabled={isSubmitting || !isValid}>
                                    Registrarse
                    </button>
                            </Form>
                            :
                            <div className="Registro-Formik">
                                <h2 className="Registro-Title">Muchas Gracias por</h2>
                                <h2 className="Registro-Title">registrarse en nuestro</h2>
                                <h2 className="Registro-Title">ECOMMERCE PATAGONIA</h2>
                            </div>
                        }
                    </div>
                    <div className="Registro-Imagen2">
                    </div>
                </div>
            </>
        )}
        </Formik>
    )
}