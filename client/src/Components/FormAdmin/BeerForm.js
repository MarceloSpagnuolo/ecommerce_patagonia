import React, { Fragment } from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import './BeerForm.css'


/*
Primera parte del formulario del administrdor de productos.
Solo se implemento la funcionalidad "C" del CRUD, esta tiene ya
tiene validaciones a la hora de ingresar informacion a los campos
Los estilos son provisionales y para nada definitivos, solo se crearon para generar mas intuicion.
*/

//La constante cerveza se usa para tener una imagen predeterminada si no se agrega una al formulario
const cerveza = "https://cdn.shopify.com/s/files/1/1103/5152/products/preview-full-Patagonia_Amber_Lager_1000_x_2048_efb25f80-f87e-49c5-b9d0-8fd0b647a30b_600x.jpg?v=1559755721"

const BeerForm = (props) => {
    const {
        isSubmitting,
        isValid
    } = props
    return (
        <Fragment>
            <h1>Administrador de Productos</h1>
            <Form className="form">
                <div className="row">
                    <label htmlFor="producto">Nombre</label>
                    <Field name="name" className="input" />
                    <ErrorMessage name="name">
                        {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className="row">
                    <label htmlFor="producto">Appearance</label>
                    <Field as='textarea' name="appearance" className="input" />
                    <ErrorMessage name="appearance">
                        {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className="row">
                    <label htmlFor="producto">Description</label>
                    <Field as='textarea' name="description" className="input" />
                    <ErrorMessage name="description">
                        {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className="row">Price
                <Field name="price" className="input" />
                    <ErrorMessage name="price">
                        {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className="row"> Stock
                <Field name="stock" className="input" />
                    <ErrorMessage name="stock">
                        {message => <div className="error">{message}</div>}
                    </ErrorMessage>
                </div>

                <div className="row"> Volumen
                <Field name="volume" as="select" className="input">
                        <option value="355cc">355 cc</option>
                        <option value="473cc">473 cc</option>
                        <option value="730cc">730 cc</option>
                    </Field>

                </div>

                <div className="row"> Image
                <Field name="thumbnail" className="input" />
                </div>

                <button
                    type="submit"
                    className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                    disabled={isSubmitting || !isValid}
                // onClick={ () => createBeers(beer) }
                >Submit</button>

            </Form>
        </Fragment>
    )
}


export default withFormik({
    mapPropsToValues(props) {
        return {
            name: '',
            appearance: '',
            description: '',
            price: '',
            stock: '',
            volume: '355 cc',
            thumbnail: ''
        }
    },

    validate(values) {
        const errors = {};
        if (!values.name) {
            errors.name = 'Se tiene que llenar el campo'
        }
        if (!values.description) {
            errors.description = 'Se tiene que llenar el campo'
        } else if (values.description.length < 10) {
            errors.description = 'La descripción tiene que ser mas amplia'
        }
        if (!values.appearance) {
            errors.appearance = 'Se tiene que llenar el campo'
        } else if (values.appearance.length < 5) {
            errors.appearance = 'La apariencia tiene que ser mas amplia'
        }
        if (!values.price || isNaN(values.price)) {
            errors.price = 'Debe ingresar un numero'
        }
        if (!values.stock || isNaN(values.stock)) {
            errors.stock = 'Debe ingresar un numero'
        }
        if (!values.thumbnail) {
            values.thumbnail = cerveza;
        }

        return errors;
    },

    handleSubmit(values, { props, formikBag }) {
        console.log(values);
        props.createBeers(values)
        formikBag.setSubmitting(false);
    }
})(BeerForm);