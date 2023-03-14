import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [err,setErr]=useState('')
    const [inputs,setInputs]=useState({
        username:'',
        email:"",
        password:''
    })
    const handleChange =e=>{
        // setInputs(prev=>{...prev,[e.target.name]:e.target.value})
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleSubmit=e=>{
        e.preventDefault();
        console.log(inputs)
        axios.post('http://localhost:8800/api/auth/register',inputs).then((res)=>{
            console.log(res)
            navigate("/login")
        })
        .catch((err)=>{
            setErr(err.response.data)
        })
    }
    // console.log(inputs)
  return (
    <div className="auth">
    <h1>Register</h1>
    <form>
    <input required type="text" placeholder="username" name='username' onChange={handleChange} />
    <input required type="email" placeholder="email" name='email' onChange={handleChange} />
    <input required type="password" placeholder="password" name='password' onChange={handleChange} />
    <button onClick={handleSubmit}>Register</button>
    {err && <p>{err}</p>}
    <span>Do you have any account <Link to='/login'>Login</Link></span>
    </form>
    
  </div>
  )
}

export default Register