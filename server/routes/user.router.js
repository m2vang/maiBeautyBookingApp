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
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/register', (req, res, next) => {
  console.log('req:', req.body);
  
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const telephone = req.body.telephone;

  const queryText = `UPDATE "user" SET "first_name" = $1, "last_name" = $2, "telephone" = $3
                      WHERE "id" = $4`;
  pool.query(queryText, [first_name, last_name, telephone, req.user.id])
    .then(result => res.sendStatus(200))
    .catch(error => {
      console.log('Error in PUT route', error);
      res.sendStatus(500);
    });
});

module.exports = router;
