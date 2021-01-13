import React from 'react';
import './CheckoutSteps.css';

export default function CheckoutSteps(props) {
  return (
    <div className='checkout-steps'>
      <div className={props.step1 ? 'active' : ''}> Registro</div>
      <div className={props.step2 ? 'active' : ''}> Envio</div>
      <div className={props.step3 ? 'active' : ''}> Pago</div>
      <div className={props.step4 ? 'active' : ''}> Compra</div>
    </div>
  );
}
