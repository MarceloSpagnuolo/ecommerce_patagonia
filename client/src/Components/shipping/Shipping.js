import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shippingAddress } from '../../store/actions';
import './Shipping.css';

import CheckoutSteps from './CheckoutSteps';

export default function Shipping(props) {
  const user = useSelector((state) => state.user);

  const initialValues = {
    givenname: user.givenname,
    familyname: user.familyname,
    phone: user.phone,
    address: user.address,
    city: user.city,
    postal: user.postal,
  };

  const onSubmit = (values) => {
    dispatch(shippingAddress(values));
    props.history.push('/payment');
  };

  const validate = (values) => {
    let errors = {};
    if (!values.givenname) {
      errors.givenname = 'Debe ingresar un nombre';
    }
    if (!values.familyname) {
      errors.familyname = 'Debe ingresar un nombre';
    }
    if (!values.phone) {
      errors.phone = 'Debe ingresar un telefono';
    }
    if (!values.address) {
      errors.address = 'Debe ingresar una direccion';
    }
    if (!values.city) {
      errors.city = 'Debe ingresar una ciudad';
    }
    if (!values.postal) {
      errors.postal = 'Debe ingresar un codigo postal';
    }
    return errors;
  };

  const dispatch = useDispatch();
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>

      <h1 className='shipping__title'>DIRECCION DE ENVIO</h1>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form className='shipping__form'>
              <div>
                <label htmlFor='name'>Nombre</label>
                <Field
                  className='shipping__form__input'
                  type='text'
                  id='givenname'
                  name='givenname'
                  placeholder='Nombre'
                />
                <ErrorMessage name='givenname'>
                  {(errorMsg) => (
                    <div className='Registro-Form-Error'>{errorMsg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div>
                <label htmlFor='familyname'>Apellido</label>
                <Field
                  className='shipping__form__input'
                  type='text'
                  id='familyname'
                  name='familyname'
                  placeholder='Apellido'
                />
                <ErrorMessage name='familyname'>
                  {(errorMsg) => (
                    <div className='Registro-Form-Error'>{errorMsg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div>
                <label htmlFor='phone'>Telefono</label>
                <Field
                  className='shipping__form__input'
                  type='text'
                  id='phone'
                  name='phone'
                  placeholder='Telefono'
                />
                <ErrorMessage name='phone'>
                  {(errorMsg) => (
                    <div className='Registro-Form-Error'>{errorMsg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div>
                <label htmlFor='address'>Dirección</label>
                <Field
                  className='shipping__form__input'
                  type='address'
                  id='address'
                  name='address'
                  placeholder='Direccion'
                />
                <ErrorMessage name='address'>
                  {(errorMsg) => (
                    <div className='Registro-Form-Error'>{errorMsg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div>
                <label htmlFor='city'>Ciudad</label>
                <Field
                  className='shipping__form__input'
                  type='text'
                  id='city'
                  name='city'
                  placeholder='Ciudad'
                />
                <ErrorMessage name='city'>
                  {(errorMsg) => (
                    <div className='Registro-Form-Error'>{errorMsg}</div>
                  )}
                </ErrorMessage>
              </div>
              <div>
                <label htmlFor='postal'>Codigo Postal</label>
                <Field
                  className='shipping__form__input'
                  type='text'
                  id='postal'
                  name='postal'
                  placeholder='Codigo Postal'
                />
                <ErrorMessage name='postal'>
                  {(errorMsg) => (
                    <div className='Registro-Form-Error'>{errorMsg}</div>
                  )}
                </ErrorMessage>
              </div>

              <button
                type='submit'
                className={`submit ${
                  formik.isSubmitting || !formik.isValid ? 'disabled' : ''
                }`}
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Continuar
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
