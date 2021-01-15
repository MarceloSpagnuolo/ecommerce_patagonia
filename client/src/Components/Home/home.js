import React from "react";
import Carrusel from "../Carrusel/Carrusel"
import "./home.css";
import Destacado from "../Destacados/Destacado"


function Home() {
  return (
    <div className="divHome">

      <Carrusel />
      <div className="divHomeImg">
        <img src={`${process.env.REACT_APP_API_URL}/images/trazo4.gif`} alt="" />
      </div>
      <div className="home-manifiesto">
        <div className="home-titulo">NUESTRO MANIFIESTO</div>
        <div className="home-texto">
          <p>
            En la patagonia necesitamos menos cosas.
          </p>
          <p>
            Acá <span>valoramos la naturaleza</span>, sus sonidos, sus silencios, los paisajes.
          </p>
          <p>
            Preferimos calentarnos las manos al fuego y sentarnos frente a una comida
            casera.
          </p>
          <p>
            Acá tomamos agua de los lagos.
          </p>
          <p>
            <span>Nos inspiramos cuando miramos  una montaña</span> y gracias a esa inspiración <span>empezamos búsquedas que nos
           llevan a descubrir aromas, texturas y sabores nuevos.</span>
          </p>
          <p>
            Hacer todo con nuestras manos es una sensación que algún día todos deberíamos
            sentir.
          </p>
          <p>
            <span>En el sur volvemos al principio, a valorar lo que tenemos y
            a darle gracias a la tierra que nos inspira.</span> Porque nos invita a
            explorar, a buscar nuevas experiencias y a proponernos <span>cosas tan
            desafiantes como hacer la mejor cerveza del mundo.</span>
          </p>
          {/* <p>
          <span>En el sur volvemos al principio, a valorar lo que tenemos y
            a darle gracias a la tierra que nos inspira.</span> Porque nos invita a
            explorar, a buscar nuevas experiencias y a proponernos <span>cosas tan
            desafiantes como hacer la mejor cerveza del mundo.</span>
          </p>
          <p>
          <span>En el sur volvemos al principio, a valorar lo que tenemos y
            a darle gracias a la tierra que nos inspira.</span> Porque nos invita a
            explorar, a buscar nuevas experiencias y a proponernos <span>cosas tan
            desafiantes como hacer la mejor cerveza del mundo.</span>
          </p>
          <p>
          <span>En el sur volvemos al principio, a valorar lo que tenemos y
            a darle gracias a la tierra que nos inspira.</span> Porque nos invita a
            explorar, a buscar nuevas experiencias y a proponernos <span>cosas tan
            desafiantes como hacer la mejor cerveza del mundo.</span>
          </p>
          <p>
          <span>En el sur volvemos al principio, a valorar lo que tenemos y
            a darle gracias a la tierra que nos inspira.</span> Porque nos invita a
            explorar, a buscar nuevas experiencias y a proponernos <span>cosas tan
            desafiantes como hacer la mejor cerveza del mundo.</span>
          </p>
          <p>
          <span>En el sur volvemos al principio, a valorar lo que tenemos y
            a darle gracias a la tierra que nos inspira.</span> Porque nos invita a
            explorar, a buscar nuevas experiencias y a proponernos <span>cosas tan
            desafiantes como hacer la mejor cerveza del mundo.</span>
          </p>
          <p>
          <span>En el sur volvemos al principio, a valorar lo que tenemos y
            a darle gracias a la tierra que nos inspira.</span> Porque nos invita a
            explorar, a buscar nuevas experiencias y a proponernos <span>cosas tan
            desafiantes como hacer la mejor cerveza del mundo.</span>
          </p>
          <p>
          <span>En el sur volvemos al principio, a valorar lo que tenemos y
            a darle gracias a la tierra que nos inspira.</span> Porque nos invita a
            explorar, a buscar nuevas experiencias y a proponernos <span>cosas tan
            desafiantes como hacer la mejor cerveza del mundo.</span>
          </p>
          */}
        </div>
      </div>
      <div className="destacadoHome">
        <Destacado />
      </div>
    </div>
  );
}

export default Home;
