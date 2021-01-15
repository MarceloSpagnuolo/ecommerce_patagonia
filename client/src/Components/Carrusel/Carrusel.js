import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Carrusel.css";

const Carrusel = () => {
    const [counter, setCounter] = useState(1)
    useEffect(() => {
        const interval = setInterval(() => {
            if (counter <= 4) {

                document.getElementById('radio' + counter).checked = true;
                setCounter(counter + 1)
            }
            if (counter === 4) {
                setCounter(1)
                return () => clearInterval(interval);
            }
        }, 5000);
        return () => clearInterval(interval)
    }, [counter])
    return (
        <div className="body-shome">
            <div className="slider-home">
                <div className="slides-home">
                    {/* botones sliders */}
                    <input type="radio" name="radio-btn" id="radio1" />
                    <input type="radio" name="radio-btn" id="radio2" />
                    <input type="radio" name="radio-btn" id="radio3" />
                    <input type="radio" name="radio-btn" id="radio4" />
                    {/* imagenes slider */}
                    <Link to="product/8" className="slide-h first">
                        <img src={`${process.env.REACT_APP_API_URL}/images/patagonia_larguer.jpg`} alt="" />
                    </Link>
                    <div className="slide-h">
                        <img src={`${process.env.REACT_APP_API_URL}/images/weise.jpg`} alt="" />
                    </div>
                    <Link to="product/27" className="slide-h">
                        <img src={`${process.env.REACT_APP_API_URL}/images/sendero_sur.jpg`} alt="" />
                    </Link>
                    <Link to="products/?page=1" className="slide-h">
                        <img src={`${process.env.REACT_APP_API_URL}/images/Variedad_patagonia2.jpg`} alt="" />
                    </Link>
                    {/* navegacion automatica start */}
                    <div className="navigation-auto">
                        <div className="auto-btn1"></div>
                        <div className="auto-btn2"></div>
                        <div className="auto-btn3"></div>
                        <div className="auto-btn4"></div>
                    </div>
                    {/* manual navigation start */}
                    <div className="navigation-manual">
                        <label htmlFor="radio1" className="manual-btn"></label>
                        <label htmlFor="radio2" className="manual-btn"></label>
                        <label htmlFor="radio3" className="manual-btn"></label>
                        <label htmlFor="radio4" className="manual-btn"></label>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Carrusel;