const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    const appt = req.body;
    const postQuery = `INSERT INTO "calendar" ("user_id", "service_types_id", "start", "end")
                        VALUES ($1, $2, $3, $4);`;
    pool.query(postQuery, [appt.user_id, appt.service_types_id, appt.start, appt.end])
        .then(result => res.sendStatus(201))
        .catch(error => console.log('error in POST', error));
});

router.get('/', (req, res) => {
    const availableQuery = `SELECT "id", "start", "end"
                            FROM "availability";`;
    pool.query(availableQuery)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error in GET', error);
        });
});;

router.get('/services', (req, res) => {
    const serviceQuery = `SELECT * FROM "service_types" ORDER BY "category_types_id";`;
    pool.query(serviceQuery)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error in GET /services', error);
        });
});

router.get('/unavailable', (req, res) => {
    const unavailableQuery = `SELECT "start", "end"
                                FROM "availability;`;
    pool.query(unavailableQuery)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error in GET /unavailable', error);
        });
})

router.delete('/:id', (req, res) => {
    const deleteQuery = 'DELETE from "calendar" where id = $1;';
    pool.query(deleteQuery, [req.params.id])
        .then(result => res.sendStatus(200))
        .catch(error => {
            console.log('Error handling DELETE in /api/availability: ', error);
            res.sendStatus(403);
        });
});

module.exports = router;