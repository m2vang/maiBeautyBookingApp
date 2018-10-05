# Mai Beauty Booking App (MBBA)
Mai Beauty Booking App (MBBA) is a full-stack web based application that is for single small beauty business owners that will help reduce the amount of time it takes to schedule appointments. For instance, most business owners still take appointments via the client having to call or walk in. This whole process can take a long time. MBBA allows the client to book thier appointments on a calendar based off of the business owners's availability schedule.

**This application uses React to control the login requests and redirection in coordination with client-side routing.

![alt text](https://github.com/m2vang/maiBeautyBookingApp/Calendar.png)

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
<!-- This table is use to store all of the different users, including the admin (business owner) -->
CREATE TABLE "user" (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(1020) NOT NULL,
	last_name VARCHAR(1020) NOT NULL,
	telephone NUMERIC(15,0) NOT NULL,
	email VARCHAR(3020) NOT NULL,
	password VARCHAR(200) NOT NULL,
	if_stylist BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE "category_types" (
	id SERIAL PRIMARY KEY,
	category VARCHAR(1020) NOT NULL
);

CREATE TABLE "service_types" (
	id SERIAL PRIMARY KEY,
	service_name VARCHAR(1020) NOT NULL,
	duration double precison NOT NULL,
	category_types_id INT REFERENCES "category_types"
);

CREATE TABLE "notes" (
	id SERIAL PRIMARY Key,
	date TIMESTAMP,
	notes VARCHAR(5000),
	user_id INT REFERENCES "user"
);

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

## Download (Don't Clone) This Repository

* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
* Unzip the project and start with the code in that folder.
* Create a new GitHub project and push this code to the new repository.

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run dev:client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Herkoku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy
# maiBeautyBookingApp

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
