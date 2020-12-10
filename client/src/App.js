import React from "react";
import Catalogo from "../src/Components/Catalogo/Catalogo.js";
import Navegation from "../src/Components/Navegation/index";
import {Route} from 'react-router-dom';
import Product from "../src/Components/ProductDetails/index.js"

function App() {
  return (
    <React.Fragment>
    <Navegation />
    <Route exact path="/products" component={Catalogo} />
    <Route exact path="/about" />
    <Route exact path="/categories"/>
    </React.Fragment>
  );
}

export default App;