import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./AddPlayer.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  first_name: "",
  last_name: "",
  age: "",
  email: "",
  position: "",
};

const AddPlayer = () => {
  const [state, setState] = useState(initialState);

  const { first_name, last_name, age, email, position } = state;

  const navigate = useNavigate();

  const {id} = useParams()

  useEffect(()=> {
    axios.get(`http://localhost:8000/api/get/${id}`).then((resp) => setState({...resp.data[0]}))
  },[id])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !age || !email ||  !position) {
      toast.error("A value(s) is missing");
    } else {
        if(!id) {
      axios.post("http://localhost:8000/api/post", {
        first_name,
        last_name,
        age,
        email,
        position
      })
      .then(() => {
        setState({first_name:"", last_name:"", age:"", email:"", position:""})
      }).catch((err) => toast.error(err.response.data));
      toast.success("Player added successfully")
     } else {
        axios
        .put(`http://localhost:8000/api/update/${id}`, {
        first_name,
        last_name,
        age,
        email,
        position,
      }).then(() => {
        setState({first_name:"",last_name:"", age:"", email:"", position:""})
      }).catch((err) => toast.error(err.response.data));
      toast.success("Player updated successfully")
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
        <h2 >Add Player </h2>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="First Name ..."
          value={first_name || ""}
          onChange={handleChange}
        />

        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Last Name ..."
          value={last_name || ""}
          onChange={handleChange}
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          placeholder="Age ..."
          value={age || ""}
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

        <label htmlFor="position">Position</label>
        <input
          type="text"
          id="position"
          name="position"
          placeholder="Position ..."
          value={position || ""}
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

export default AddPlayer;
