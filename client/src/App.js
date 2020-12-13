import React from "react";
import Catalogo from "../src/Components/Catalogo/Catalogo.js";
import Navegation from "../src/Components/Navegation/index";
import { Route } from "react-router-dom";
import ProductDetails from "../src/Components/ProductDetails/index.js";
import Home from "../src/Components/Home/home";

function App() {
  return (
    <React.Fragment>
      <Navegation />
      <Route
        exact
        path={[
          "/products",
          "/products/categoria/:nombreCat",
          `/products/search?query=product`,
        ]}
        component={Catalogo}
      />
      <Route exact path="/about" />
      <Route exact path="/categories" />
      <Route exact path={[`/products/:id`]} component={ProductDetails} />
      <Route exact path="/" component={Home} />
    </React.Fragment>
  );
}

export default App;
