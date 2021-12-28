import Header from "./Header";

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import swal from "sweetalert";

function Goodslist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getData();
  }, []);

  async function deleteOperation(id) {
    let result = await fetch("http://127.0.0.1:8000/api/delete/" + id, {
      method: 'DELETE'
    });
    result = await result.json();
    getData();
  }

  function swalAlart(id)
  {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Poof! product has been deleted!", {
            icon: "success",
          });
          deleteOperation(id);
        } else {
          swal("product is safe!");
        }
      });
  }

  async function getData() {
    let result = await fetch("http://127.0.0.1:8000/api/goodslist");
    result = await result.json();
    setLoading(false);
    setData(result)

  }

  return (
    <div>
      <Header />
      <h1>Goodslist</h1>
      <div className="col-sm-8 offset-sm-2">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              
              <th>Goods Name</th>
              <th>Goods Category</th>
             
              <th>Goods Price</th>
              <th>Goods Rating</th>
              
              {localStorage.getItem('user-info') ?
                <th>Operations</th>
                : null}
            </tr>
          </thead>
          <tbody>
            {
              (loading) ?
                <tr><td colSpan={6}><h2>Loading...</h2></td></tr>
                :
                data.map((item, i) =>
                  <tr key={i}>
                    <td>{item.id}</td>
                   
                    <td>{item.g_name}</td>
                    <td>{item.g_category}</td>
                   
                    <td>{item.g_price}</td>
                    <td>{item.g_rating}</td>
                    

                    {localStorage.getItem('user-info') ?
                      <td>
                        
                        <Link to={"/edit/" + item.id}>
                          <Button variant="outline-info">Edit</Button>
                        </Link>
                        
                      </td>
                      : null}
                  </tr>
                )
            }
          </tbody>
        </Table>
      </div>

    </div>
  );
}

export default Goodslist;