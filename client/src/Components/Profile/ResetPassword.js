import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, ErrorMessage, Form } from "formik";
import {getUserByToken} from "../../store/actions/index.js"

export default function ResetPassword(props) {
    const dispatch = useDispatch()
  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validate={(values) => {
        const errors = {};
        //Expresiones regulares para password y email
        //regPass requiere entre 8 y 16 characters. y minimo una mayuscula, minuscula, char especial y numero
        //regMail requiere solo un formato de email asi "example@correo.com" pero se le agrega la posibilidad de agregar
        // un "." algo mas alfinal ejemp "example@correo.com.ar"
        const regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/.test(
          values.password
        );
        ////////////////////////
        if (!values.password) {
          errors.password = "Debe ingresar su contraseña";
        } else if (!regPass) {
          errors.password =
            "La contraseña debe tener entre 8 y 16 caracteres y al menos una mayúsucla, minúscula, número y caracter especial";
        }
        if (values.password !== values.confirmPassword) {
          errors.confirmPassword = "Las contraseñas no coinciden";
        }

        return errors;
      }}
      onSubmit={async (values) => {
        console.log(values);
        const res = await axios.post(`http://localhost:3001/users/passwordReset`, values);
        dispatch(getUserByToken(res.data))
        props.seteadora(false)
      }}
    >
      {({ isSubmitting, isValid }) => (
        <>
          <Form className="Registro-Form">
            <div>
              <label className="Registro-Form-Label" htmlFor="Registro">
                Nueva Contraseña:
              </label>
              <br></br>
              <Field
                className="Registro-Form-Input"
                name="password"
                type="password"
              />
              <ErrorMessage name="password">
                {(message) => (
                  <div className="Registro-Form-Error">{message}</div>
                )}
              </ErrorMessage>
            </div>

            <div>
              <label className="Registro-Form-Label" htmlFor="Registro">
                Confirmar Contraseña:
              </label>
              <br></br>
              <Field
                className="Registro-Form-Input"
                name="confirmPassword"
                type="password"
              />
              <ErrorMessage name="confirmPassword">
                {(message) => (
                  <div className="Registro-Form-Error">{message}</div>
                )}
              </ErrorMessage>
            </div>
            <button
              type="submit"
              className={`submit ${isSubmitting || !isValid ? "disabled" : ""}`}
              id="Registro-Btn-Submit"
              disabled={isSubmitting || !isValid}
            >
              Actualizar Contraseña
            </button>
          </Form>
          <div className="Registro-Imagen2"></div>
        </>
      )}
    </Formik>
  );
}
