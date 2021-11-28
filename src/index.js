import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Pages/Main';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Main/>
  </BrowserRouter>,
  document.getElementById('root')
);
