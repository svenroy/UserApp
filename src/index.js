import React from 'react';
import {render} from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import createReducer, { view as RootView } from "./app";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { host } from './config/apiConfig';
import httpRequest, * as httpVerbs from './middlewares/httpRequest';
import { getAuthHeaders } from './util/auth';

const apiEndPoint = `${host}/api`;

const store = createStore(
    createReducer(),
    applyMiddleware(
      thunkMiddleware.withExtraArgument({ httpVerbs, apiEndPoint }),
      httpRequest(getAuthHeaders),
      createLogger()
    )
  ); 
  
  render(
    <Provider store={store}>
      <BrowserRouter>
        <RootView />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );