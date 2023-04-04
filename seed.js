//console.log("Made it inside seed.js");

const { Pool } = require('pg');
const dbConn = require('./dbConn');
const pool = dbConn.getPool();

function runSeeder(pool, callback){
    pool.connect((err, client, done) => {
        if (err) {
            console.log("Failed to connect to the database");
            console.log(err);
            return done();
        }

        //Run SEED SQL:
        pool.query(`INSERT INTO memes (toptext, bottomtext, url) VALUES 
            ('I turn now', 'good luck everyone else','https://i.imgflip.com/22bdq6.jpg'),
            ('Been waiting for joe Biden', 'to become a good president','https://i.imgflip.com/2fm6x.jpg'),
            ('Pablos life without cocaine', 'be like...','https://i.imgflip.com/1c1uej.jpg'),
            ('Us before learning React', 'Us after learning React','https://i.imgflip.com/wxica.jpg')`,
            (err) => {
                if (err){
                    console.log(err);
                    console.log("INSERT FAILED on memes")
                } else {
                    console.log("INSERT data into memes SUCCESSFUL")
                    done();
                    callback();
                }
            }
        )        
    })
}

runSeeder(pool, () => {
    //close connection:
    pool.end();
});  




