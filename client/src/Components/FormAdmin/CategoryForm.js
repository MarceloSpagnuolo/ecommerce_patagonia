import React from 'react';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import { connect } from 'react-redux';
import { addCategory, updateCategory } from '../../store/actions/index'


const CategoryForm = (props) => {
    return (
        <Formik initialValues={props.data || {
            name: '',
            description: '',
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

            return errors;
        }} onSubmit={(values) => {
            if (props.data) {               
                props.updateCategory(props.data.id, values)
                props.seteadora.seteadora(props.seteadora.setEdit, props.seteadora.edit)
            } else {
                props.addCategory(values)
                props.seteadora.seteadora(props.seteadora.setDisplay, props.seteadora.display)
            }
        }}>{({
            isSubmitting,
            isValid
        }) => (
            <>
                <h1>Administrador de categoria</h1>
                <Form className="form">
                    <div className="row">
                        <label htmlFor="producto">Nombre</label>
                        <ErrorMessage name="name">
                            {message => <div className="error">{message}</div>}
                        </ErrorMessage>
                        <Field name="name" className="input" />
                    </div>

                    <div className="row">
                        <label htmlFor="producto">description</label>
                        <ErrorMessage name="description">
                            {message => <div className="error">{message}</div>}
                        </ErrorMessage>
                        <Field as='textarea' name="description" className="input" />
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
        categories: state.categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addCategory: (category) => dispatch(addCategory(category)),
        updateCategory: (id, categorie) => dispatch(updateCategory(id, categorie))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);