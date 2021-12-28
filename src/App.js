import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Protected from './components/Protected';
import Pending from './components/Pending';
import Goodslist from './components/Goodslist';
import Addgoods from './components/Addgoods';

import Login from './components/Login';
import Signup from './components/Signup';
import PageNotFound from './components/PageNotFound';

import UpdateOneProduct from './components/UpdateOneProduct';




import './App.css';
//import Testing from './components/Testing';



function App() {
  return (
    <>
      <div className="App">


        <BrowserRouter>


          <Routes>
            <Route path="/" element={<Goodslist />} />
            

            <Route path="/add" element={<Protected cmp={Addgoods} />} />
            <Route path="/pending" element={<Protected cmp={Pending} />} />
           


            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            


            <Route path="edit" element={<Protected cmp={UpdateOneProduct} />}>
              <Route path=":id" element={<Protected cmp={UpdateOneProduct} />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />


          </Routes>



        </BrowserRouter>

        

      </div>
    </>
  );
}

export default App;
