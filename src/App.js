import React ,{useEffect}from 'react';
import './App.css';
import { renderRoutes } from "react-router-config";
import routes from './router'
import { HashRouter } from "react-router-dom";
import {connect} from "react-redux";


const App = (props) => {


  useEffect(()=>{



  },[props.menu])


  return(
    <HashRouter>
        {renderRoutes(routes)}
    </HashRouter>
    )

};


const mapStateToProps = (state, ownProps) => {
  return {
    menu: state.UserReducer.menu
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
