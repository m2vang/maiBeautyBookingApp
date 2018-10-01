const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const chartQuery = `SELECT "service_name", 
                        COUNT("service_name") 
                        FROM "service_types" 
                        JOIN "calendar" 
                        ON "service_types"."id" = "calendar"."service_types_id" 
                        GROUP BY "service_name";`;
    pool.query(chartQuery)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error in GET chart', error);
            res.sendStatus(403);
        });
});

module.exports = router;