const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;