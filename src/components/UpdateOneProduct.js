import React, { useState, useEffect } from "react";
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Header from "./Header";

function UpdateOneProduct() {

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [g_name, setG_name] = useState("");

    const [g_category, setG_category] = useState("");
    const [g_price, setG_price] = useState("");

    const [g_rating, setG_rating] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        getdata();
    }, []);
    /*const navigate = useNavigate();
    useEffect(() => {
      if (localStorage.getItem('user-info')) {
        navigate("/add");
      }
  
    }, [])*/


    async function getdata() {
        let result = await fetch("http://127.0.0.1:8000/api/edit/" + id);
        result = await result.json();
        setData(result)
        setG_name(result.g_name)

        setG_category(result.g_category)

        setG_price(result.g_price)

        setG_rating(result.g_rating)


    }

    async function updateproduct(id) {
        let item = { g_name, g_category, g_price, g_rating };


        let result = await fetch("http://127.0.0.1:8000/api/update/" + id + "?_method=PUT",
            {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            })

        result = await result.json();



        swal({
            title: "Good job!",
            text: "Product pending successfully!",
            icon: "success",
        });
        navigate("/")

    }
    return (
        <div>
            <Header />

            <div className="col-sm-8 offset-sm-2">

                <h1>Update Product</h1>
                <Form>
                    <input type="text" defaultValue={data.id} className="form-control" placeholder="Product ID" disabled /> <br />
                    <input type="text" defaultValue={data.g_name} onChange={(e) => setG_name(e.target.value)} className="form-control" placeholder="Goods Name" /> <br />


                    <input type="text" defaultValue={data.g_category} onChange={(e) => setG_category(e.target.value)} className="form-control" placeholder="Category" /> <br />
                    <input type="number" defaultValue={data.g_price} onChange={(e) => setG_price(e.target.value)} className="form-control" placeholder="Goods Price" min="0" /> <br />



                    <div defaultValue={data.g_rating} onChange={(e) => setG_rating(e.target.value)} className="form-control" placeholder="Rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Range min="0" max="10" step="0.1" />
                    </div><br />
                    <input type="text" value={g_rating} className="form-control" placeholder="Please Rate this product" disabled /> <br />
                </Form>
                <button onClick={() => updateproduct(data.id)} className="btn btn-secondary">Update Product</button>

            </div>

        </div>
    );
}

export default UpdateOneProduct;




