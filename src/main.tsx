import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import {BrowserRouter} from "react-router-dom";
import getStore from "./config/store.ts";
import {Provider} from "react-redux";
import setupAxiosInterceptors from "@/config/axios-interceptor.ts";
import {clearAuth, clearAuthentication} from "@/shared/reducers/authentication.ts";
import {bindActionCreators} from "@reduxjs/toolkit";

const store = getStore();

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('Unauthenticated'));

ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
          <Provider store={store}>
            <BrowserRouter>
               <App />
            </BrowserRouter>
          </Provider>
      </React.StrictMode>
)
