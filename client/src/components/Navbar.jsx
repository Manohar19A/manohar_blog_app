import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../images/star.png"
import { AuthContext } from '../pages/authContext'

const Navbar = () => {
  const navigation = useNavigate()
  const {currentUser,logout}=useContext(AuthContext)
  const gotoHome =()=>{
    navigation('/')
  }
  
  return (
    <div className="navbar">
        <div className="container">
            <div className="logo" onClick={gotoHome}><img src={Logo} alt="star"/></div>
            {currentUser.data && (<><p>You are Logged in as <strong>{currentUser.data.username}</strong></p></> )}
            <div className="links">
                <Link className='link' to = '/?cat=art'><h6>Art</h6></Link>
                <Link className='link' to = '/?cat=food'><h6>Food</h6></Link>
                <Link className='link' to = '/?cat=cinema'><h6>Cinema</h6></Link>
                <Link className='link' to = '/?cat=science'><h6>Science</h6></Link>
                <Link className='link' to = '/?cat=technology'><h6>Technology</h6></Link>
                <Link className='link' to="/?cat=design"><h6>Design</h6></Link>
                <span>{currentUser?.username}</span>
                {currentUser? <span onClick={logout}>Logout</span>:<Link className='link' to="/login" >Login</Link>}
                <span className='write'>   <Link to ='/write'>Write</Link></span>
             
            </div>
        </div>
    </div>
  )
}

export default Navbar