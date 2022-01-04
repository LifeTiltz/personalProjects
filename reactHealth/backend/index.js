'use strict';

import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 4000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use('/', express.static('frontend'));


const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'react_tut'
});

conn.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connection successful.');
    }
});

app.get("/blogs", (req, res) => {
    conn.query(`Select * from blogs`, (err, posts) => {
        if (err) {
            res.status(500)
        }
        else {
            res.status(200).json(posts)
        }
    })
});

app.get(`/blogs/:id`, (req, res) => {
    const id = req.params.id
    conn.query(`Select * from blogs where id = ?`, [id], (err, blogs) => {
        if (err) {
            res.status(500)
        }
        else {
            res.status(200).json(blogs)
        }
    })
});

app.post("/blogs", (req, res) => {
    let title = req.body.title
    let body = req.body.body
    let author = req.body.author
    console.log(req.body);

    conn.query(`INSERT INTO blogs (title, body, author) VALUES (?,?, ?);`, [title, body, author], (err, blogs) => {
        if (err) {
            res.status(500)
        }
        else {
            let newPostId = blogs.insertId
            conn.query(`Select * from blogs where id = ?`, [newPostId], (err, postback) => {
                if (err) {
                    res.status(500)
                }
                else {
                    res.status(200).json(postback[0])
                }
            })
        }
    })
});

app.delete("/delete/:id", (req, res) => {
    let id = req.params.id
    console.log(req.params);
    conn.query('DELETE FROM blogs WHERE id = ?', [id], (err, del) => {
        if (err) {
            res.status(500)
        }
        else {
            res.status(200)
        }
    })
})

app.put(`/blogs/:id/upvote`, (req, res) => {
    let id = req.params.id
    conn.query(`update blogs set score = posts.score + 1 where id = ?;`, [id], (err, update) => {
        if (err) {
            res.status(500)
        }
        else {
            conn.query(`Select * from blogs where id = ?`, [id], (err, postback) => {
                if (err) {
                    res.status(500)
                }
                else {
                    res.status(200).json(postback[0])
                }
            })
        }
    })
});

app.put(`/blogs/:id/downvote`, (req, res) => {
    let id = req.params.id
    conn.query(`update blogs set score = posts.score - 1 where id = ?;`, [id], (err, update) => {
        if (err) {
            res.status(500)
        }
        else {
            conn.query(`Select * from blogs where id = ?`, [id], (err, postback) => {
                if (err) {
                    res.status(500)
                }
                else {
                    res.status(200).json(postback[0])
                }
            })
        }
    })
});

app.listen(PORT, () => console.log(`I am listening on port ${PORT}`));