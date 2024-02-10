import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validate from './Validation/LoginValidate';
import axios from "axios";
import './Validation/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error,setError] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(Validate(formData))
    if (
      error.email === "" &&
      error.password === ""
    ) {
      axios
        .post("http://localhost:8081/login", {
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          if(res.data === "Failure") {
            alert("No record existed")
          } else {
            console.log("Res data ",res.data);
            navigate(`/home/${res.data[0].email}`);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // Inside the return statement of your Login component

return (
  <div className="container">
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="Username or Email"
        value={formData.email}
        onChange={handleChange}
      />
      {error.email && <span className="error">{error.email}</span>}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      {error.password && <span className="error">{error.password}</span>}
      <button type="submit">Login</button>
    </form>
    <p>If you have not signed up yet <Link to="/signup">Sign UP</Link> </p>
  </div>
);

};

export default Login;
