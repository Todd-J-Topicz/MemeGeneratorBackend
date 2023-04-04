const { Pool } = require('pg');
const dbConn = require('./dbConn');
const pool = dbConn.getPool();

function runMigrations(pool, callback){
    //Connect to DB:
    pool.connect((err, client, done) => {
        if (err){
            console.log("Failed to connect to the database");
            console.log(err);
            return done();
        }
        //RUN migration SQL:
        pool.query('DROP TABLE IF EXISTS memes', (err) =>{
            if (err){
                console.log(err);
            }

            pool.query(`CREATE TABLE IF NOT EXISTS memes (
                id SERIAL PRIMARY KEY,
                toptext VARCHAR (255) NOT NULL,
                bottomtext VARCHAR (255) NOT NULL,
                url VARCHAR (255) NOT NULL)`, (err, data) => {
                    if (err) {
                        console.log("CREATE TABLE memes FAILED")
                    } else {
                        console.log("CREATE TABLE memes SUCCESSFUL")

                    done();
                    callback();                    
                    }
                }
            );
        });
    })

};

runMigrations(pool, () => {
    //migrations are complete, we can close the pool
    //close connection:
    pool.end();
})



