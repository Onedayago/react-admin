import React from 'react';
import './App.css';
import { renderRoutes } from "react-router-config";
import routes from './router'
import { HashRouter } from "react-router-dom";


const App = () => {
  return(
    <HashRouter>
        {renderRoutes(routes)}
    </HashRouter>
    )

};

export default App;
