import axios from "axios";
import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "./authContext";

const Write = () => {
const {currentUser}=useContext(AuthContext)
  const navigate = useNavigate();
  const state = useLocation().state;
  console.log(state)
  const [value, setValue] = useState("");
  const [title, setTitle] = useState(state?.title || "");
  const [cat, setCat] = useState(state?.cat || "");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const upload = () => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:8800/api/upload", formData)
      .then((res) => {
        console.log(res.data);
        return res.data;
        // setImageUrl(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:8800/api/upload", formData)
      .then((res) => {
        console.log(res.data);
        state
          ? axios.put(`http://localhost:8800/api/post/${state.id}`, {
              title,
              desc: value,
              cat,
              img: file ? res.data : "",
              token:currentUser.token
            })
          : axios
              .post(`http://localhost:8800/api/post/`, {
                title,
                desc: value,
                cat,
                img: file ? res.data : "",
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                token:currentUser.token
              })
              .then((response) => {
                console.log(response);
                navigate('/')
              })
              .catch((error) => {
                console.log(error);
              });
      })

      .catch((err) => {
        console.log(err);
      });
    // const imgUrl = await upload();
    // console.log(imgUrl)

    // try {
    //   state
    //     ? await axios.put(`http://localhost:8800/api/post/${state.id}`, {
    //         title,
    //         desc: value,
    //         cat,
    //         img: file ? imgUrl : "",
    //       })
    //     : await axios.post(`http://localhost:8800/api/post/`, {
    //         title,
    //         desc: value,
    //         cat,
    //         img: file ? imgUrl : "",
    //         date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    //       });
    //       navigate("/")
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b>Draft
          </span>
          <span>
            <b>Visibility:</b>Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" className="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as Draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="category"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="category"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="category"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="category"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="category"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="category"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
