import React, { useContext, useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";
import { Menu } from "./Menu";
import axios from "axios";
import {cookie, Cookies} from 'react-cookie'
import moment from "moment";
import { AuthContext } from "./authContext";
const Single = () => {
  const { currentUser } = useContext(AuthContext);
  const cat = useParams();
  console.log(cat.id);
//   const token = JSON.parse(localStorage.getItem)

  const [post, setPost] = useState({});
//   console.log(cookie.get('_ga'))
const navigate = useNavigate()
console.log(currentUser)
  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/post/${cat.id}`)
      //   http://localhost:8800/api/post/1
      .then((res) => {
        console.log(res);
        setPost(res.data);
       
      })
      .catch((err) => {
        console.log(err);
     
      });
  }, [cat.id]);
  const handleDelete = () => {
    console.log(currentUser.token)
    axios
      .delete(`http://localhost:8800/api/post/${cat.id}`,{headers: { "Authorization":currentUser.token } })
      .then((res) => {
        console.log(res);
        navigate('/')

      })
      .catch((err) => {
        console.log(err);
        alert('Post is Not Deleted')
      });
  };
  const getText =(html)=>{
    const doc = new DOMParser().parseFromString(html,'text/html')
    return doc.body.textContent
}
  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post.img}`} alt="" />

        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}

          <div className="info">
            <span>{post.username}</span>
            <p>posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.data.username === post.username && (
            <div className="edit">
              <Link to="/write?edit=2" state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p style={{wordWrap:'break-word',width:'600px'}}>{getText(post.desc)}</p>
      </div>
      <Menu cat ={post.cat}/>
    </div>
  );
};

export default Single;
