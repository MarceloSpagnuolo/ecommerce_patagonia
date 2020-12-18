import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useDispatch } from "react-redux"
import { createUser } from "../../store/actions/index"

export default function Registro() {
    const dispatch = useDispatch();

    return (
       <Formik initialValues={{
           name: "",
           lastname: "",
           email: "",
           hashedpassword: "",
           city: "",
           adress: "",
           phone: "",
           postal: "",
           role: "user"
       }} validate= {(values) => {
           const errors = {};
           if(!values.name) {errors.name = "Debe ingresar un nombre"}
           if(!values.lastname) {errors.lastname = "Debe ingresar su apellido"}
           if(!values.email) {errors.email = "Debe ingresar su email"} else if 
           (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
           }
           if(/^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{7,15}$/.test(values.hashedpassword)) {errors.hashedpassword = "Debe ingresar su contraseña"}
           
            return errors
       }} onSubmit={(values) => {
        console.log(values);
        dispatch(createUser(values));
       }}>{({
           isSubmitting,
           isValid
       }) => (
            <>
            <h1>Registro de Usuario</h1>
            <Form>
                <div>
                    <label htmlFor="Registro">Nombre</label>
                    <ErrorMessage name="name">{message => <div>{message}</div>}</ErrorMessage>
                    <Field className="RegistroInput" name="name"/>
                </div>

                <div>
                    <label htmlFor="Registro">Apellido</label>
                    <ErrorMessage name="lastname">{message => <div>{message}</div>}</ErrorMessage>
                    <Field className="RegistroInput" name="lastname"/>
                </div>

                <div>
                    <label htmlFor="Registro">Email</label>
                    <ErrorMessage name="email">{message => <div>{message}</div>}</ErrorMessage>
                    <Field className="RegistroInput" type="email" name="email"/>
                </div>

                <div>
                    <label htmlFor="Registro">Contraseña</label>
                     <ErrorMessage name="hashedpassword">{message => <div>{message}</div>}</ErrorMessage>
                    <Field className="RegistroInput" type="password" name="hashedpassword"/>
                </div>

                <div>
                    <label htmlFor="Registro">Ciudad</label>
                    <Field className="RegistroInput" name="city"/>
                </div>

                <div>
                    <label htmlFor="Registro">Direccion</label>
                    <Field className="RegistroInput" name="adress"/>
                </div>

                <div>
                    <label htmlFor="Registro">Teléfono</label>
                    <Field className="RegistroInput" name="phone"/>
                </div>

                <div>
                    <label htmlFor="Registro">Código Postal</label>
                    <Field className="RegistroInput" name="postal"/>
                </div>

                <button type="submit"
                        className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                        disabled={isSubmitting || !isValid}>
                        Registrarse
                </button>
            </Form>
            </>
       )}
        </Formik>
    )
}