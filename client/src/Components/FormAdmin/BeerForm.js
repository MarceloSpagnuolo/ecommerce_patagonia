import React, {useEffect} from 'react';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import './BeerForm.css'
import { connect } from 'react-redux';
import { addProduct, modifyProduct, getImages } from '../../store/actions/index';
import Checkcat from "../../Components/FormAdmin/CheckCategories";
import Multer from "../Multer/Multer.js"
import { Redirect } from 'react-router-dom';


const cerveza = "http://localhost:3001/images/nodisponible.jpg"

const BeerForm = (props) => {
    console.log(props.images, "SOY LAS IMAGENES")

    useEffect(() => {
        if(props.data){
        props.getImages(props.data.id)}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return props.user.role === "admin" ? (
        <Formik initialValues={props.data || {
            name: '',
            appearance: '',
            description: '',
            price: '',
            stock: '',
            volume: '355 cc',
            destacado: false,
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
            if (values.price < -1 || isNaN(values.price)) {
                errors.price = 'Debe ingresar un numero'
            }
            if (!values.stock || isNaN(values.stock)) {
                errors.stock = 'Debe ingresar un numero'
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
                {/* <h1 className="tbeer">Administrador de Productos</h1> */}
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

                    <div className="row"> Destacado
                <Field name="destacado" as="select" className="input">
                            <option value={false} >NO</option>
                            <option value={true}>SI</option>
                        </Field>

                    </div>

                    <div className="row"> Image
                <Field name="thumbnail" as="select" className="input">
                <option value={cerveza}>{cerveza}</option>
                {props.data && props.images.length > 0 && props.images.map(elem => (
                    <option value={elem.path}>{elem.path}</option>
                ))}
                </Field>
                    </div>

                    {props.data ? <div>
                        <Multer id={props.data.id} />
                    </div> : null}

                    {props.data ? <div>
                        <Checkcat data={props.data}></Checkcat>
                    </div> : null}

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
    : <Redirect to="/unauthorize" />
}

function mapStateToProps(state) {
    return {
        products: state.products,
        user: state.user,
        images: state.images
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addProduct: (producto) => dispatch(addProduct(producto)),
        modifyProduct: (id, producto) => dispatch(modifyProduct(id, producto)),
        getImages: (id) => dispatch(getImages(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerForm);

