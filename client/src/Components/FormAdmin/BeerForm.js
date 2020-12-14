import React from 'react';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import './BeerForm.css'
import { connect } from 'react-redux';
import { addProduct, modifyProduct } from '../../store/actions/index'



const cerveza = "http://localhost:3001/images/nodisponible.jpg"

const BeerForm = (props) => {
    console.log(props)

    return (
        <Formik initialValues={props.data || {
            name: '',
            appearance: '',
            description: '',
            price: '',
            stock: '',
            volume: '355 cc',
            thumbnail: ''
        }} validate={(values) => {
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
        }} onSubmit={(values) => {
            if (props.data) {               
                props.modifyProduct(props.data.id, values)
                props.seteadora.seteadora(props.seteadora.setEdit, props.seteadora.edit)
            } else {
                //Logica de crear (POST)
                props.addProduct(values)
                props.seteadora.seteadora(props.seteadora.setDisplay, props.seteadora.display)
            }
        }}>{({
            isSubmitting,
            isValid
        }) => (
            <>
                <h1 className="tbeer">Administrador de Productos</h1>
                <Form className="form">
                    <div className="row">
                        <label htmlFor="producto">Nombre</label>
                        <ErrorMessage name="name">
                            {message => <div className="error">{message}</div>}
                        </ErrorMessage>
                        <Field name="name" className="input" />
                    </div>

                    <div className="row">
                        <label htmlFor="producto">Appearance</label>
                        <ErrorMessage name="appearance">
                            {message => <div className="error">{message}</div>}
                        </ErrorMessage>
                        <Field as='textarea' name="appearance" className="input" />
                    </div>

                    <div className="row">
                        <label htmlFor="producto">Description</label>
                        <ErrorMessage name="description">
                            {message => <div className="error">{message}</div>}
                        </ErrorMessage>
                        <Field as='textarea' name="description" className="input" />
                    </div>

                    <div className="row">Price
                        <ErrorMessage name="price">
                            {message => <div className="error">{message}</div>}
                        </ErrorMessage>
                <Field name="price" className="input" />
                    </div>

                    <div className="row"> Stock
                        <ErrorMessage name="stock">
                            {message => <div className="error">{message}</div>}
                        </ErrorMessage>
                <Field name="stock" className="input" />
                    </div>

                    <div className="row"> Volumen
                <Field name="volume" as="select" className="input">
                            <option value="355 cc">355 cc</option>
                            <option value="473 cc">473 cc</option>
                            <option value="730 cc">730 cc</option>
                        </Field>

                    </div>

                    <div className="row"> Image
                <Field name="thumbnail" className="input" />
                    </div>

                    <button
                        type="submit"
                        className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                        disabled={isSubmitting || !isValid}
                    >Submit</button>

                </Form>
            </>
        )}
        </Formik >

    )
}

function mapStateToProps(state) {
    return {
        products: state.products,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addProduct: (producto) => dispatch(addProduct(producto)),
        modifyProduct: (id, producto) => dispatch(modifyProduct(id, producto))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerForm);

