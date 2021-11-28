import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./Login";
import Index from "./index";
import AddArticle from './AddArticle'
import ArticleList from "./ArticleList";

function Main() {

  return (
    <div>
      <Routes>
        <Route path='/' exact element={<Login/>}/>
        <Route path='/Index/' exact element = {<Index/>}>
          <Route path='add' element={<AddArticle/>}/>
          <Route path='add/:id' element={<AddArticle/>}/>
          <Route path='list' element={<ArticleList/>}/>
        </Route>
      </Routes>
    </div>

  );

}



export default Main;