import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from './reportWebVitals'
import Routers from "./Routers";
import "semantic-ui-css/semantic.min.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "./style.css";


const stateFilm = {
  activeItems : "beranda"
};

const reducerFilm = ( state = stateFilm , action) => {
  console.log("action =>",action)
  switch (action.type){
    case "ACTIVE_ITEM" :  
      var stateActiveItems = {...state, activeItems : action.ActiveItem}
      return stateActiveItems
      default : 
        return state
  }
};

const store = createStore(reducerFilm);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <Routers />
    </Provider>
);

reportWebVitals();
