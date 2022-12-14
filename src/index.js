import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";                  
import "primeicons/primeicons.css";
import cookie from 'react-cookies'

axios.interceptors.request.use(req=>{
  if(req.url.includes('/login')){
    return req
  }else{
    const auth = cookie.load('real_11_user_token')
    req.headers.token = JSON.stringify(auth?.token)
    return req
  }
})

axios.interceptors.response.use(res=> res , error => {
  if(error.response.status === 401){
    if(!(error.request.responseURL.includes('/logged_in_user'))){
      window.location.href = '/login'
    }
  }
  return error.response
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
