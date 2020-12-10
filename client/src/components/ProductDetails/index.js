import React, { Component, component, Fragment } from 'react';
import { useState } from 'react';

import './style.css'

//import findCurrentItem from 


const Product = ({ titulo, descripcion, referencia, precio, cantidad }) => {
    
    const [count, setCount] = useState(0);


 
    //const { id } = match.params;
    const image = 'https://www.thegourmetjournal.com/wp-content/uploads/2020/08/Cerveza.jpg';
    return (
        <Fragment >

            <div className="contenido">



                <div>
                    <h3>{`${titulo}` || `Product Name Here`}</h3>


                    <div
                        className="item-image"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                    />
                    {/* <img src="linkdel.com" className="item-image"></img> */}

                    <p>{`${descripcion}` || `description Here`}</p>

                    <h5 id="Prueba">{`${precio}`}</h5>

                    <div className="SubContainer">
                        <button className="button">Agregar al carrito</button>
                        <div>
                            <button className="button" onClick={() => {
                                setCount(count - 1)
                            }}>-</button>
                            {count}
                           
                            <button className="button" onClick={() => {
                                setCount(count + 1)
                            }}>+</button>

                        </div>
                        <button className="button"

                            type="button"
                            color="primary"
                            onClick={() => alert("click")}
                        >

                            Back
                </button></div>

                </div>




            </div>
        </Fragment>

    );
};


export default Product;