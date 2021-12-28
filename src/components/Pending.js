import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Pending() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  let user = JSON.parse(localStorage.getItem('user-info'));
  let mid = { 'id': user.id };
  const [loading, setLoading] = useState(true);
  const [gg, setGG] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    setHasVoted(true);
  }; 


  useEffect(() => {
    getData();
  },[]);

  async function yesvote(id) {

    let result = await fetch("http://127.0.0.1:8000/api/yesvote/" + id + "?_method=PUT", {
      method: 'POST',
      body: JSON.stringify(mid),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    });
    result = await result.json();
    //setGG(true)
    //console.log(result)
    getData();
  }


  async function novote(id) {
    let result = await fetch("http://127.0.0.1:8000/api/novote/" + id + "?_method=PUT", {
      method: 'POST',
      body: JSON.stringify(mid),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    });
    result = await result.json();
    getData();
  }

  function swalAlartyes(id) {
    swal({
      title: "Are you sure?",
      text: "Once voted, you will not be able to undo vote!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("SIUUU! vote has been counted!", {
            icon: "success",
          });
          yesvote(id);
          setHasVoted(true);

        } else {
          swal("vote carefully!");
        }
      });
  }
  function swalAlartno(id) {
    swal({
      title: "Are you sure?",
      text: "Once voted, you will not be able to undo vote!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("SIUUU! vote has been counted!", {
            icon: "success",
          });
          novote(id);
          setHasVoted(true);
        } else {
          swal("vote carefully!");
        }
      });
  }

  async function getData() {
    let result = await fetch("http://127.0.0.1:8000/api/goods");
    result = await result.json();
    setLoading(false);
    setData(result)
    data.map((item) => {
      if (item.v_percent >= 50) {
        addconfirm(item.id)
      }
    }
    )
    console.log(result)
  }
  async function addconfirm(id) {
    try{
    let result = await fetch("http://127.0.0.1:8000/api/addconfirm/"+id,
      {
        method: 'POST'
      })
    result = await result.json();
    deleteOperation(id);
    } catch (e){
      console.log(e)
    }
    
  }
  async function deleteOperation(id) {
   try{
    let result = await fetch("http://127.0.0.1:8000/api/delete/" + id, {
      method: 'DELETE'
    });
    result = await result.json();
    let res = await fetch("http://127.0.0.1:8000/api/goods");
    res = await res.json();
    setLoading(false);
    setData(res);
    navigate('/')
   } catch(e) {
      console.log(e)
   }
  }


  return (
    <div>
      <Header />
      <h1>Pendings</h1>
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
                <th>Votes</th>
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

                      {!hasVoted && (
                        <td>
                        <Button onClick={() => swalAlartyes(item.id)} variant="outline-success">YES</Button>
                        <Button onClick={() => swalAlartno(item.id)} variant="outline-danger">NO</Button>
                      </td>
                      )} 
                  </tr>
                )
            }
          </tbody>
        </Table>
      </div>

    </div>
  );
}

export default Pending;