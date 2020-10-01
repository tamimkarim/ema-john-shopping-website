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
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
   const [loggeddInuser, setLoggeddInuser] = useState({});
   
  return (
    <UserContext.Provider value={[loggeddInuser, setLoggeddInuser]}>
      <h3> Email : {loggeddInuser.email} </h3>
     
      <Router>
      <Header></Header>
        <Switch>
          <Route path ="/shop">
          <Shop></Shop>
          </Route>
          <Route path ="/review">
          <Review></Review>
          </Route>
          <PrivateRoute path ="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <Route path ="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path ="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
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
