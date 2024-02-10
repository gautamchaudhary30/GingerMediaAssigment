import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'

const Home = () => {
  const data = useParams();

  const [user, setUser] = useState({
    username:"",
    email:"",
    contact:"",
    age:""
  });


  useEffect(() => {
    const callDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/home/${data.email}/`);
        console.log("data",res.data);
        setUser(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    callDetails();
  }, []);

  return (
    <div>
      <h1>This is a home page</h1>
      <p>Hello {user.username}</p>
      <p>{user.email}</p>
      <p>{user.contact}</p>
      <p>{user.dob}</p>
      <p>{user.age}</p>
      <Link to={`/update/${user.email}`}>Update Details</Link>{"   |   "}
      <Link to={`/`}>Logout</Link>
    </div>
  )
}

export default Home
