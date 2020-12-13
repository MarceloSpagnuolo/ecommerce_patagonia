import React from "react";
import "./home.css";

function Home() {
  return (
    <div>
      <img className="home-imagen" src="http://www.limbos.org/wp-content/uploads/2019/08/7-datos-curiosos-sobre-la-patagonia-monta%C3%B1a.jpg" />
      <div className="home-manifiesto">
        <div className="home-titulo">NUESTRO MANIFIESTO</div>
        <div className="home-texto">
          <p>
            En la patagonia necesitamos menos cosas. 
          </p>
          <p>
            Acá valoramos la naturaleza, sus sonidos, sus silencios, los paisajes.
          </p>
          <p>
            Preferimos calentarnos las manos al fuego y sentarnos frente a una comida
            casera.
          </p>
          <p>
            Acá tomamos agua de los lagos.
          </p>
          <p>
           Nos inspiramos cuando miramos  una montaña y gracias a esa inspiración empezamos búsquedas que nos
           llevan a descubrir aromas, texturas y sabores nuevos.
          </p>
          <p>
           Hacer todo con nuestras manos es una sensación que algún día todos deberíamos
            sentir.
          </p>
          <p>
           En el sur volvemos al principio, a valorar lo que tenemos y
            a darle gracias a la tierra que nos inspira. Porque nos invita a
            explorar, a buscar nuevas experiencias y a proponernos cosas tan
            desafiantes como hacer la mejor cerveza del mundo.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
