import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link ,useLocation} from 'react-router-dom'

// https://fakestoreapi.com/products
const Home = () => {
    const cat = useLocation().search
    console.log(cat)

    const [data,setData]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:8800/api/post/${cat}`)
        .then((res)=>{
            console.log(res)
            setData(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[cat])
    const getText =(html)=>{
        const doc = new DOMParser().parseFromString(html,'text/html')
        // const string.substring(0, 50)
        return doc.body.textContent.substring(0,300)
    }
  return (
    <div className="home">
        <div className="posts">
            {data.map((post)=>(
                <div className="post">
                    <div className="img">
                        <img src={`../upload/${post.img}`}/>
                    </div>
                    <div className="content">
                        <Link className='link' to={`/post/${post.id}`}>
                            <h1>{post.title}</h1>
                            <p style={{wordWrap:'break-word',width:'400px'}}>{getText(post.desc)}</p>
                            <button>Read more</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Home