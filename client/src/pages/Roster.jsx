import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Roster.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:8000/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) => {
    if(window.confirm("Are you sure you want to delete this player?")) {
        axios.delete(`http://localhost:8000/api/remove/${id}`)
        toast.success("Player deleted successfully")
        setTimeout(() => loadData(),500)
    }
  }

  return (
    <div style={{ marginTop: "5rem" }}>
        <h2 className="page-heading"> Red Sox Roster</h2>
        
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>First Name</th>
            <th style={{ textAlign: "center" }}>Last Name</th>
            <th style={{ textAlign: "center" }}>Age</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Position</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>
                <td>{item.position}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button className="btn btn-delete" onClick={()=> deleteContact(item.id)}> Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/add">
            <button style={{ marginTop: "12px" }} className="btn btn-contact">Add Player</button>
        </Link>
    </div>
  );
};

export default Home;
