# Mai Beauty Booking App (MBBA)
Mai Beauty Booking App (MBBA) is a full-stack web based application that is for single small beauty business owners that will help reduce the amount of time it takes to schedule appointments. For instance, most business owners still take appointments via the client having to call or walk in. This whole process can take a long time. MBBA allows the client to book thier appointments on a calendar based off of the business owners's availability schedule.

**This application uses React to control the login requests and redirection in coordination with client-side routing.

![Calendar SnapShot](documentation/images/Calendar.png)

## Built With: <br>
Node <br>
Express <br>
ReactJS <br>
Redux <br>
Redux Saga <br>
PostgreSQL <br>
Postico <br>
Material UI <br>
CSS <br>
Passport <br>
Moment.js <br>
React Big Calendar <br>
Sweet Alerts <br>

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `beauty_salon` and create the following tables:

```SQL
<-- This table is use to store all of the different users, including the admin (business owner) -->
CREATE TABLE "user" (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(1020) NOT NULL,
	last_name VARCHAR(1020) NOT NULL,
	telephone NUMERIC(15,0) NOT NULL,
	email VARCHAR(3020) NOT NULL,
	password VARCHAR(200) NOT NULL,
	if_stylist BOOLEAN NOT NULL DEFAULT 'false'
);

<-- This table is use to store the different categories that each service falls into -->
CREATE TABLE "category_types" (
	id SERIAL PRIMARY KEY,
	category VARCHAR(1020) NOT NULL
);

<-- This table is use to store the different service types that are offered -->
CREATE TABLE "service_types" (
	id SERIAL PRIMARY KEY,
	service_name VARCHAR(1020) NOT NULL,
	duration double precison NOT NULL,
	category_types_id INT REFERENCES "category_types"
);

<-- This table is use to store all the notes for each specific user -->
CREATE TABLE "notes" (
	id SERIAL PRIMARY Key,
	date TIMESTAMP,
	notes VARCHAR(5000),
	user_id INT REFERENCES "user"
);

<-- This table is use to store all the data that will go into the calendar component -->
CREATE TABLE "calendar" (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES "user",
	service_types_id INT REFERENCES "service_types",
	"start" TIMESTAMP WITH TIME ZONE NULL,
	"end" TIMESTAMP WITH TIME ZONE NOT NULL,
	cancel_status BOOLEAN NOT NULL DEFAULT 'false',
	cancel_date TIMESTAMP WITHOUT TIMEZONE
);
```

If you would like to name your database something else, you will need to change `beauty_salon` to the name of your new database name in `server/modules/pool.js`

### Completed Features <br>
High level list of items completed: <br>
- [x] Created a dropdown/select for each service when a client books an appointment and having the duration display beneath<br>
- [x] Admin can add and delete client notes that will only be store for that specific client <br>
- [x] React-Big-Calendar<br>

### Next Steps: <br>
- [ ] Implementing a data visualization for types of services to see which service is the most popular to least popular <br>
- [ ] Ability to search for clients based on their name <br>
- [ ] Clients can upload an image of themselves <br>
- [ ] Calendar not only displays appointment type but also the name of the client who booked the appointment <br>
- [ ] Implement the full "Drag and Drop" calendar feature <br>
- [ ] Clients can only make an appointment if the selected time matches the service duration <br>
- [ ] Ability to edit a client's appointment from the admin's side<br>

## Authors: <br>
Mai Chee Vang <br>

## Acknowledgments: <br>
Prime Digital Academy
