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
    database: 'reddit'
});

conn.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connection successful.');
    }
});

app.get("/posts", (req, res) => {
    conn.query(`Select * from posts`, (err, posts) => {
        if (err) {
            res.status(500)
        }
        else {
            res.status(200).json(posts)
        }
    })
});

app.get(`/posts/:id`, (req, res) => {
    const id = req.params.id
    conn.query(`Select * from posts where id = ?`, [id], (err, posts) => {
        if (err) {
            res.status(500)
        }
        else {
            res.status(200).json(posts)
        }
    })
});

app.post("/posts", (req, res) => {
    let title = req.query.title
    let url = req.query.url
    conn.query(`INSERT INTO posts (title, url, timestamp) VALUES (?,?, "314159265");`, [title, url], (err, posts) => {
        if (err) {
            res.status(500)
        }
        else {
            let newPostId = posts.insertId
            conn.query(`Select * from posts where id = ?`, [newPostId], (err, postback) => {
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

app.put(`/posts/:id/upvote`, (req, res) => {
    let id = req.params.id
    conn.query(`update posts set score = posts.score + 1 where id = ?;`, [id], (err, update) => {
        if (err) {
            res.status(500)
        }
        else {
            conn.query(`Select * from posts where id = ?`, [id], (err, postback) => {
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

app.put(`/posts/:id/downvote`, (req, res) => {
    let id = req.params.id
    conn.query(`update posts set score = posts.score - 1 where id = ?;`, [id], (err, update) => {
        if (err) {
            res.status(500)
        }
        else {
            conn.query(`Select * from posts where id = ?`, [id], (err, postback) => {
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