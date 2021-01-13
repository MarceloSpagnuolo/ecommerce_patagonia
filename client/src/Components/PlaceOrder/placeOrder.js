import React from 'react';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../shipping/CheckoutSteps';
import './placeOrder.css';

export default function PlaceOrderScreen() {
  const order = useSelector((state) => state.order);

  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
  const { givenname, familyname, address } = shippingAddress;

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className='order top'>
        <div className='col-2'>
          <ul>
            <li>
              <div className='card card-body'>
                <h2>Envio</h2>
                <p>
                  <strong>
                    Nombre:{givenname} {familyname}
                  </strong>
                  <br />
                  <strong>Dirección:{address}</strong>
                </p>
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Pago</h2>
                <p>
                  <strong>Metodo:</strong>
                </p>
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Productos</h2>
                <ul>
                  {order.products && order.products.length > 0 ? (
                    order.products.map((prod) => (
                      <li key={prod.id}>
                        <div className='order'>
                          <div>
                            <img
                              className='Order-Imagen'
                              src={prod.thumbnail}
                              alt={prod.name}
                            ></img>
                          </div>
                        </div>
                        <div>
                          <h3>
                            {prod.name} {prod.volume}
                          </h3>
                        </div>
                      </li>
                    ))
                  ) : (
                    <h1>no nada</h1>
                  )}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className='col-1'>
          <div className='card card-body'>
            <ul>
              <li>
                <h2>Resumen Compra</h2>
              </li>
              <li>
                <div className='order'>
                  <div>
                    <strong> Total</strong>
                  </div>
                  <div className='order'>
                    <strong>$</strong>
                  </div>
                </div>
              </li>
              <li>
                <button className='Order-Confirmar' type='button'>
                  Confirmar Compra
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
