import React from 'react';
import { connect } from 'react-redux';
import { getProducts, getCategories, postProductJoinCategory } from '../../store/actions/index';
import { Form, Field, ErrorMessage, Formik } from 'formik';


const Relationship = (props) => {
    return (
        <Formik initialValues={props.data || {
            idP: '',
            idG: '',
        }} validate={(values) => {
            const errors = {};
            if (!values.idP) {
                errors.idP = 'Se tiene que llenar el campo'
            }
            if (!values.idG) {
                errors.idG = 'Se tiene que llenar el campo'
            }
            return errors;
        }} onSubmit={(values) => {
            if (props.data) {
                props.updateCategory(props.data.id, values)
                props.seteadora.seteadora(props.seteadora.setEdit, props.seteadora.edit)
            } else {
                props.postProductJoinCategory(values.idP, values.idG)
                props.seteadora.seteadora(props.seteadora.setDisplay, props.seteadora.display)
            }
        }}>{({
            isSubmitting,
            isValid
        }) => (
            <>
                <h1>Asignacion de categoria</h1>
                <Form className="form">
                    <div className="row">
                        <label htmlFor="producto">Cerveza</label>
                        <ErrorMessage name="idP">
                            {message => <div className="error">{message}</div>}
                        </ErrorMessage>
                        <Field as='select' name="idP" className="input" >
                            {props.products.length > 0 && props.products.map((e) => {

                                return (
                                    <option value={e.id}>{e.name} {e.volume}</option>
                                )

                            })}
                        </Field>
                    </div>

                    <div className="row">
                        <label htmlFor="producto">Categoria</label>
                        <ErrorMessage name="idG">
                            {message => <div className="error">{message}</div>}
                        </ErrorMessage>
                        <Field as='select' name="idG" className="input" >
                            {props.categories.length > 0 && props.categories.map((e) => {

                                return (
                                    <option value={e.id}>{e.name}</option>
                                )

                            })}
                        </Field>
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
        categories: state.categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
        getProducts: () => dispatch(getProducts()),
        postProductJoinCategory: (id1, id2) => dispatch(postProductJoinCategory(id1, id2))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Relationship)