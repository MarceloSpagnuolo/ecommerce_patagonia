import { ErrorMessage, Formik, Field, Form } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../shipping/CheckoutSteps';

export default function Payment(props) {
  const initialValues = {
    fullname: '',
    numtarjeta: '',
    fecha: '',
    cvv: '',
  };

  const onSubmit = (values) => {
    // props.history.push('/placeorder');
    window.location.href = '/placeorder';
    console.log('form data', values);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.givenname) {
      errors.givenname = 'Debe ingresar un nombre';
    }
    if (!values.numtarjeta) {
      errors.numtarjeta = 'Debe ingresar un nombre';
    }
    if (!values.fecha) {
      errors.fecha = 'Debe ingresar un telefono';
    }
    if (!values.cvv) {
      errors.cvv = 'Debe ingresar una direccion';
    }
    return errors;
  };

  const dispatch = useDispatch();

  return (
    <div className='form-control'>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {(formik) => {
          console.log('Formik props', formik);
          return (
            <Form>
              <div className='form-control'>
                <label htmlFor='name'>Nombre Completo</label>
                <Field
                  type='text'
                  id='fullname'
                  name='fullname'
                  placeholder='Nombre como aparece en la tarjeta'
                />
                <ErrorMessage name='fullname'>
                  {(errorMsg) => <div className='error'>{errorMsg}</div>}
                </ErrorMessage>
              </div>
              <div className='form-control'>
                <label htmlFor='numtarjeta'>Numero de Tarjeta</label>
                <Field
                  type='text'
                  id='numtarjeta'
                  name='numtarjeta'
                  placeholder='Numero de Tarjeta'
                />
                <ErrorMessage name='numtarjeta'>
                  {(errorMsg) => <div className='error'>{errorMsg}</div>}
                </ErrorMessage>
              </div>
              <div className='form-control'>
                <label htmlFor='phone'>Fecha de expiracion</label>
                <Field
                  type='text'
                  id='date'
                  name='date'
                  placeholder='Fecha de vencimiento'
                />
                <ErrorMessage name='phone'>
                  {(errorMsg) => <div className='error'>{errorMsg}</div>}
                </ErrorMessage>
              </div>
              <div className='form-control'>
                <label htmlFor='cvv'>CVV</label>
                <Field type='text' id='cvv' name='cvv' placeholder='CVV' />
                <ErrorMessage name='address'>
                  {(errorMsg) => <div className='error'>{errorMsg}</div>}
                </ErrorMessage>
              </div>
              <Link to={'/placeorder'}>
                <button
                  type='submit'
                  // disabled={!formik.isValid || formik.isSubmitting}
                >
                  Continuar
                </button>
              </Link>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
