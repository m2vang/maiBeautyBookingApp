const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//handles posting appt into calendar
router.post('/', (req, res) => {
    const appt = req.body;
    console.log('/api/unavailability', appt);
    const postQuery = `INSERT INTO "calendar" ("start", "end", "user_id","service_types_id")
                        VALUES ($1, $2, $3, $4);`;
    pool.query(postQuery, [appt.start, appt.end, req.user.id, appt.type])
        .then(result => res.sendStatus(201))
        .catch(error => console.log('error in POST', error));
}); //end of POST

//handles getting all of the different services
router.get('/services', (req, res) => {
    const serviceQuery = `SELECT * FROM "service_types" ORDER BY "id";`;
    pool.query(serviceQuery)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error in GET /services', error);
        });
}); //end of GET

//handles getting all appts
router.get('/', (req, res) => {
    let unavailableQuery = `SELECT "user_id", "start", "end", "service_types"."service_name", "user"."if_stylist", 
                            "service_types"."service_name" as title 
                            FROM "calendar" JOIN "service_types" 
                            ON "calendar"."service_types_id" = "service_types"."id" 
                            JOIN "user" ON "calendar"."user_id" = "user"."id" 
                            WHERE "cancel_status" = false;`;   
    pool.query(unavailableQuery)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error in GET', error);
        });
}); //end of GET

//
router.delete('/:id', (req, res) => {
    const deleteQuery = 'DELETE from "calendar" where id = $1;';
    pool.query(deleteQuery, [req.params.id])
        .then(result => res.sendStatus(200))
        .catch(error => {
            console.log('error handling DELETE in /api/availability: ', error);
            res.sendStatus(403);
        });
});

module.exports = router;