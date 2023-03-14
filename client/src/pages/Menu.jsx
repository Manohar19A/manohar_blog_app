import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const Menu = ({cat}) => {
    // const { currentUser } = useContext(AuthContext);
//   const cat = useParams();
//   console.log(cat.id);

  const [post, setPost] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8800/api/post/?cat=${cat}`)
      .then((res) => {
        console.log(res);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[cat]);
  return (
    <div className="menu">
        <h1>Other posts you may like</h1>
        {
            post.map((post)=>(
          //     <Link className='link' to={`/post/${post.id}`}>
          //     <h1>{post.title}</h1>
          //     <p>{getText(post.desc)}</p>
          //     <button>Read more</button>
          // </Link>
                <div className="post" key={post.id}>
                  <Link className='link' to={`/post/${post.id}`}>
                    <img src={`../upload/${post.img}`} alt=""/>
                    <h3>{post.title}</h3>
                    <button>Read More</button>
                    </Link>
                </div>
            ))
        }

    </div>
  )
}
