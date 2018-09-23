const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('req: ', req.body);
  
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const telephone = req.body.telephone;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO "user" ("first_name", "last_name", "telephone", "email", "password") VALUES ($1, $2, $3, $4, $5) RETURNING id';
  pool.query(queryText, [first_name, last_name, telephone, email, password])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
}); //end of POST

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
}); //end of GET

//Handles all updates made by user on their personal info
router.put('/register', (req, res) => {
  console.log('req:', req.body);
  if(req.isAuthenticated()) {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const telephone = req.body.telephone;

    const queryText = `UPDATE "user" SET "first_name" = $1, "last_name" = $2, "telephone" = $3
                      WHERE "id" = $4`;
    pool.query(queryText, [first_name, last_name, telephone, req.user.id])
      .then(() => res.sendStatus(200))
      .catch(error => {
        console.log('Error in PUT register route', error);
        res.sendStatus(500);
      }); //end of pool.query
  } else {
    res.sendStatus(403);
  }; //end of if-else auth
}); //end of PUT

//Handles getting user's past appts
router.get('/reminder', (req, res) => {
  if(req.isAuthenticated()) {
    const queryText =  `SELECT "category_types"."category", "service_types"."service_name", "service_types"."duration", "start", "end" 
                        FROM "calendar" 
                        JOIN "service_types" ON "calendar"."service_types_id" = "service_types"."id"  
                        JOIN "category_types" ON "service_types"."category_types_id" = "category_types"."id" 
                        WHERE "user_id" = $1 and "cancel_status" = false and ("end" <= CURRENT_DATE);`;
    pool.query(queryText, [req.user.id])
    .then((results) => res.send(results.rows))
    .catch(error => {
      console.log('Error in GET reminder route', error);
      res.sendStatus(500);
    }); //end of pool.query
  } else {
    res.sendStatus(403);
  }; //end of if-else auth.
}); //end of GET 

//Handles getting user's upcoming appts
router.get('/upcomingReminder', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `SELECT "category_types"."category", "service_types"."service_name", "service_types"."duration", "start", "end" 
                        FROM "calendar" 
                        JOIN "service_types" ON "calendar"."service_types_id" = "service_types"."id"  
                        JOIN "category_types" ON "service_types"."category_types_id" = "category_types"."id" 
                        WHERE "user_id" = $1 and "cancel_status" = false and ("end" >= CURRENT_DATE);`;
    pool.query(queryText, [req.user.id])
      .then((results) => res.send(results.rows))
      .catch(error => {
        console.log('Error in GET upcomingReminder route', error);
        res.sendStatus(500);
      }); //end of pool.query
  } else {
    res.sendStatus(403);
  }; //end of if-else auth.
}); //end of GET 

router.get('/clientName', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `SELECT "id", "first_name", "last_name", "telephone", "email" 
                        FROM "user" 
                        WHERE "if_stylist" = false 
                        ORDER BY "first_name";`;
    pool.query(queryText)
      .then((results) => res.send(results.rows))
      .catch(error => {
        console.log('Error in GET clientName route', error);
        res.sendStatus(500);
      }); //end of pool.query
  } else {
    res.sendStatus(403);
  }; //end of if-else auth.
}); //end of GET

router.get(`/clientAppt`, (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.query.user;
    console.log('user', user);
    const queryText = `SELECT "category_types"."category", 
                      "service_types"."service_name", "service_types"."duration", 
                      "start", "end" FROM "calendar" 
                      JOIN "user" ON "calendar"."user_id" = "user"."id" 
                      JOIN "service_types" ON "calendar"."service_types_id" = "service_types"."id"  
                      JOIN "category_types" ON "service_types"."category_types_id" = "category_types"."id" 
                      WHERE "user_id" = $1 and "cancel_status" = false and ("end" >= CURRENT_DATE);`;
    pool.query(queryText,[user])
      .then((results) => res.send(results.rows))
      .catch(error => {
        console.log('Error in GET clientAppt route', error);
        res.sendStatus(500);
      }); //end of pool.query
  } else {
    res.sendStatus(403);
  }; //end of if-else auth.
}); //end of GET

router.get(`/clientPastAppt`, (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.query.user;
    console.log('user', user);
    const queryText = `SELECT "category_types"."category", 
                      "service_types"."service_name", "service_types"."duration", 
                      "start", "end" FROM "calendar" 
                      JOIN "user" ON "calendar"."user_id" = "user"."id" 
                      JOIN "service_types" ON "calendar"."service_types_id" = "service_types"."id"  
                      JOIN "category_types" ON "service_types"."category_types_id" = "category_types"."id" 
                      WHERE "user_id" = $1 and "cancel_status" = false and ("end" <= CURRENT_DATE);`;
    pool.query(queryText, [user])
      .then((results) => res.send(results.rows))
      .catch(error => {
        console.log('Error in GET clientPastAppt route', error);
        res.sendStatus(500);
      }); //end of pool.query
  } else {
    res.sendStatus(403);
  }; //end of if-else auth.
}); //end of GET

module.exports = router;
