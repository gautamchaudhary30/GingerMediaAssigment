import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ValidateSignup from "./Validation/SignupValidate";
import axios from "axios";
import './Validation/Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
    age: "",
    password: ""
  });
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(ValidateSignup(formData));
    console.log("form data", formData);
    if (
      error.username === "" &&
      error.email === "" &&
      error.phone === "" &&
      error.dob === "" &&
      error.age === "" &&
      error.password === ""
    ) {
      axios
        .post("http://localhost:8081/signup", {
          username: formData.username,
          age: formData.age,
          contact: formData.phone,
          dob: formData.dob,
          email: formData.email,
          password: formData.password
        })
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        {error.username && <span className="error">{error.username}</span>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {error.email && <span className="error">{error.email}</span>}
        <input
          type="number"
          name="phone"
          placeholder="Contact Number"
          value={formData.phone}
          onChange={handleChange}
        />
        {error.phone && <span className="error">{error.phone}</span>}
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
        />
        {error.dob && <span className="error">{error.dob}</span>}
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        {error.age && <span className="error">{error.age}</span>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {error.password && <span className="error">{error.password}</span>}
        <button type="submit">Signup</button>
      </form>
      <p className="link">
        Already have an account? <Link to="/">Sign In</Link>
      </p>
    </div>
  );
};

export default Signup;
