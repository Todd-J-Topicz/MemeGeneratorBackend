'use strict';

const dotenv = require('dotenv');
dotenv.config();
console.log(process.env);

//SETUP DEPENDECIES:
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());
const { listenerCount } = require('stream');

const dbConn = require('./dbConn');
const pool = dbConn.getPool();

//Query with "/studio" request:
app.get('/api/memes' , (request, response, next) => {
    //console.log("made it inside .get");
    pool.query('SELECT * FROM memes', (err,result) => {
        if (err){
            return next({})
        } else {
            const allMemes = result.rows;
            response.status(200).send(allMemes);
        }
    })
})

app.get('/api/memes/:id', (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    
    pool.query('SELECT * FROM memes WHERE id=$1', [id], (err, result, next) =>{
        if (err){
            return next({})
        } else {
            const meme = result.rows[0];
            res.status(200).send(meme);
        }
    })
})

//CHECKS FOR ANYTHING OTHER THAN "MEMES" AND SENDS ERROR:
app.get("/api/:word/", function (req, res){
    const word = req.params.word;
    res.status(404).send(`NOT FOUND!! - 505 error - api/${word}/ does not exist`);
});


app.post('/api/memes', (req, res, next) =>{
    const topText = req.body.toptext;
    const bottomText = req.body.bottomtext;
    const url = req.body.url;

    if (!topText || !bottomText || !url){
        return res.status(400).send("Error in post data, or insufficient data provided for post");
    } 

    pool.query('INSERT INTO memes (toptext, bottomtext, url) VALUES ($1, $2, $3) RETURNING *;', [topText, bottomText, url], (err,result) => {
        if (err){
            return next({})
        }

        let memeInfo = result.rows[0];
        res.send(memeInfo);
    })
})

app.patch('/api/memes/:id', (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    const toptext = req.body.toptext;
    const bottomtext = req.body.bottomtext;
    const url = req.body.url;

    pool.query('SELECT * FROM memes WHERE id=$1', [id], (err, result, next) =>{
        if (err){
            return next({});
        }
        
        let meme = result.rows[0];

        if (!meme){
            res.send("No meme detected")
        }

        const updatedTopText = toptext || meme.toptext;
        const updatedBottomText = bottomtext || meme.bottomtext;
        const updatedUrl = url || meme.url;
        console.log(updatedTopText, updatedBottomText, updatedUrl);

        pool.query('UPDATE memes SET toptext=$1, bottomtext=$2, url=$3 WHERE id=$4 RETURNING *', [updatedTopText, updatedBottomText, updatedUrl, id], (err, result) =>{
            if (err){
                res.send("There was an error updating the table")
            } else {
                res.status(200).send(`ID:${id} has been UPDATED `)
            }  
        })
    })
})

app.delete('/api/memes/:id', (req, res, next) => {
    const id = Number.parseInt(req.params.id);

    pool.query('DELETE FROM memes WHERE id=$1 RETURNING*', [id], (err,data) => {
        if (err){
            res.status(404).send("There was an error with your SQL query for DELETION.")
        }

        const deleted = data.rows[0];

        if (deleted){
            res.send(deleted);
        } else {
            res.send(`This meme id:${id} does not exist => has not been deleted.`)
        }
        
    })    
});


app.use(function(err, req, res, next){
    console.log("Inside middleware error function");
    res.status(404).send("ERROR 404 - PROBLEM");
});


app.listen(port, function(){
    console.log(`Service is running, listening on ${port}`);
});