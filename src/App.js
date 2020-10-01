import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react';

export const UserContext = createContext();

function App() {
   const [loggeddInuser, setLoggeddInuser] = useState({});
   
  return (
    <UserContext.Provider value={[loggeddInuser, setLoggeddInuser]}>
      <h3> Email : {loggeddInuser.email} </h3>
      <Header></Header>
      <Router>
        <Switch>
          <Route path ="/shop">
          <Shop></Shop>
          </Route>
          <Route path ="/review">
          <Review></Review>
          </Route>
          <Route path ="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route path ="/login">
            <Login></Login>
          </Route>
          <Route path ="/shipment">
            <Shipment></Shipment>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>


        </Switch>

      </Router>
     
    </UserContext.Provider>
  );
}

export default App;
