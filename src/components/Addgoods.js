import React, { useState, useEffect } from "react";
import { Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import swal from "sweetalert";

function Addgoods() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate("/add");
    }

  }, [])

  const [g_name, setG_name] = useState("");
  
  const [g_category, setG_category] = useState("");
  const [g_price, setG_price] = useState("");
  
  const [g_rating, setG_rating] = useState("5");
  

  
  async function addGoods() {
    let item = { g_name, g_category, g_price, g_rating };
    

    let result = await fetch("http://127.0.0.1:8000/api/add",
      {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          "Content-Type": 'application/json',
          "Accept": 'application/json'
        }
      })

    result = await result.json();

    console.log(result);
    swal({
      title: "Good job!",
      text: "Product added successfully!",
      icon: "success",
    });
    navigate("/pending")

    /*
    localStorage.setItem("user-info", JSON.stringify(result));
    navigate("/add")*/

    



  }
  return (
    <div>
      <Header />

      <div className="col-sm-6 offset-sm-3">
        <h1>Add Product</h1>
        <Form>
          <input type="text" value={g_name} onChange={(e) => setG_name(e.target.value)} className="form-control" placeholder="Goods Name" /> <br />

          <input type="text" value={g_category} onChange={(e) => setG_category(e.target.value)} className="form-control" placeholder="Category" /> <br />
          <input type="number" value={g_price} onChange={(e) => setG_price(e.target.value)} className="form-control" placeholder="Goods Price" min="0" /> <br />
          


          <div value={g_rating} onChange={(e) => setG_rating(e.target.value)} className="form-control" placeholder="Rating">
            <Form.Label>Rating</Form.Label>
            <Form.Range min="0" max="10" step="0.1" />
          </div><br />
          <input type="text" value={g_rating} onChange={(e) => setG_rating(e.target.value)} className="form-control" placeholder="Please Rate this product" disabled /> <br />

          

        </Form>


        

        <button onClick={addGoods} className="btn btn-secondary">Add Product</button>

      </div>

    </div>
  );
}

export default Addgoods;




