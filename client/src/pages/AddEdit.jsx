import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, email, contact } = state;

  const navigate = useNavigate();

  const {id} = useParams()

  useEffect(()=> {
    axios.get(`http://localhost:8000/api/get/${id}`).then((resp) => setState({...resp.data[0]}))
  },[id])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("A value(s) is missing");
    } else {
        if(!id) {
      axios.post("http://localhost:8000/api/post", {
        name,
        email,
        contact,
      })
      .then(() => {
        setState({name:"", email:"", contact:""})
      }).catch((err) => toast.error(err.response.data));
      toast.success("Contact added successfully")
     } else {
        axios
        .put(`http://localhost:8000/api/update/${id}`, {
        name,
        email,
        contact,
      }).then(() => {
        setState({name:"", email:"", contact:""})
      }).catch((err) => toast.error(err.response.data));
      toast.success("Contact updated successfully")
     }
     setTimeout(() => navigate("/"),500)
    }  
};
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name ..."
          value={name || ""}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email ..."
          value={email || ""}
          onChange={handleChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Your Contact Number ..."
          value={contact || ""}
          onChange={handleChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
