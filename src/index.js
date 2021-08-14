import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import PokemonInfo from "./Pages/PokemonInfo";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/pokemon/:id" component={PokemonInfo} exact={true} />
      </Switch>
    </BrowserRouter>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
