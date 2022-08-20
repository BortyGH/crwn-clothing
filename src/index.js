import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/contexts/user.context';
import { CategoriesProvider } from './components/contexts/categories.context';
import { CartProvider } from './components/contexts/cart.context';

import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>    {/*BROWSER ROUTER = we can access of different features that come into reactdom*/}
 
      <UserProvider>   {/*anything outside UserProvider will not be able to access context, v app ma pristup signIn form k context*/}

        <CategoriesProvider>  {/*products are able to reach up into user provider and its value, whereas user provider cant go into its children in order to fetch data*/}
                            {/* cize UserProvider nemoze ziskat udaje z potomkov */}
          <CartProvider>

            <App />
          
          </CartProvider>

        </CategoriesProvider>
        
      </UserProvider>

    </BrowserRouter>
    
  </React.StrictMode>
);                

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
