import React from "react";
import Catalogo from "../src/Components/Catalogo/Catalogo.js";
import Navegation from "../src/Components/Navegation/index";
import { Route, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      {/* HOME */}
      <switch>
        <Route path='/' exact>
          <Navegation />

        </Route>

      </switch>

    </div>
  );
}

export default App;