import db from "../db.js";
import jwt from 'jsonwebtoken'

export const createPost = (req, res) => {
    res.json("This is a post from controller")
}
export const getPosts = (req, res) => {
    const q = req.query.cat ? "Select * from posts where cat =?" : "Select * from posts";
    db.query(q, [req.query.cat], (err, data) => {
        if (err) return err;
        return res.status(200).json(data)
    })
}
export const getPost = (req, res) => {
    const q = "SELECT p.id ,`username`, `title`, `desc`, p.img, u.image AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(404).json({ err })
        return res.status(200).json(data[0])
    })
}
export const deletePost = (req, res) => {
    const token = req.headers.authorization
    if (!token) return res.status(403).json("Token is Invalid")
    jwt.verify(token,'jwtkey', (err, userInfo) => {
        if (err) return res.status(403).json(err)
        const postId = req.params.id
        const q = 'DELETE from posts where `id` = ? and `uid`= ?'
        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your posts");
            return res.json('Post deleted successfully')
        })
    })


}
export const addPost = (req, res) => {
    db.connect()
    const token = req.body.token
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q =
            "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
            req.body.date,
            userInfo.id,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been created.");
        });
    });
};
export const updatePost = (req, res) => {
    const token = req.body.token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id;
        const q =
            "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

        const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been updated.");
        });
    });
};