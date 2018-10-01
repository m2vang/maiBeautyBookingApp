const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
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
    } else {
        res.sendStatus(403);
    }; //end of if-else auth
}); //end of GET

router.get('/services', (req, res) => {
    if (req.isAuthenticated()) {
        const serviceQuery = `SELECT "service_types"."id", "service_name", "category_types"."category" 
                        FROM "service_types" 
                        JOIN "category_types" 
                        ON "service_types"."category_types_id" = "category_types"."id";`;
        pool.query(serviceQuery)
            .then(result => res.send(result.rows))
            .catch(error => {
                console.log('error in GET chart', error);
                res.sendStatus(403);
            });
    } else {
        res.sendStatus(403);
    }; //end of if-else auth
}); //end of GET

router.delete('/removeService/:id', (req, res) => {
    console.log('in DELETE /removeService Route', req.params.id);
    if (req.isAuthenticated()) {
        const idToDelete = req.params.id;
        const deleteServiceQuery = `DELETE FROM "service_types" WHERE "id" = $1;`;
        pool.query(deleteServiceQuery, [idToDelete])
            .then((result) => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log('error in DELETE /removeService Route', error);
                res.sendStatus(500)
            });
    } else {
        res.sendStatus(403);
    }; //end of if-else auth
}); //end of DELETE

router.post('/addService', (req, res) => {
    console.log('in POST /addService Route', req.body);
    if (req.isAuthenticated()) {
        const categoryToAdd = req.body.newCategory;
        const serviceToAdd = req.body.newService;
        const durationToAdd = req.body.newDuration;
        const addServiceQuery = `INSERT INTO "service_types" ("category_types_id", "service_name", "duration")
                                    VALUES ($1, $2, $3);`;
        pool.query(addServiceQuery, [categoryToAdd, serviceToAdd, durationToAdd])
            .then((result) => {
                res.send(result.rows);
            }).catch((error) => {
                console.log('Error in POST /addService', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }; //end of if-else
}); //end of POST

//handles getting all of the different categories
router.get('/category', (req, res) => {
    const catQuery = `SELECT * FROM "category_types" ORDER BY "id";`;
    pool.query(catQuery)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('error in GET /category', error);
        });
}); //end of GET
module.exports = router;