// import axios from "axios";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../style.scss'
import { AuthContext } from "./authContext";

const Login = () => {
 const navigate = useNavigate()
 const [err,setErr]=useState('')
  const [inputs,setInputs]=useState({
    username:"",
    password:""
  })
  const{ setCurrentUser} =useContext(AuthContext)
  // console.log(currentUser)
  const handleChange = (e) => {
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))

  } 
  const handleSubmit=(e)=>{
    e.preventDefault();
    
      console.log(inputs)
     axios.post('http://localhost:8800/api/auth/login',inputs)
     .then((res)=>{
      console.log(res)
      setCurrentUser(res.data)
      navigate("/")
     })
    .catch((err)=>{
      console.log(err)
      setErr(err.response.data)
    })

  
  //   try{
     
  //     // navigate("/")
  //   }
  // catch(err){
  //     // setErr(err.response.data)
  //     console.log(err)
  // }

  }
  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
      <input required type="text" placeholder="username" name="username" onChange={handleChange} />
      <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
      <button onClick={handleSubmit}>Login</button>
      {err && <p>{err}</p>}
      <span>Don't you have any account? <Link to='/register'>Register</Link></span>
      </form>
      
    </div>
  );
};

export default Login;
