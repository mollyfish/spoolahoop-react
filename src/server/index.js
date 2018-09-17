const express = require('express');
const os = require('os');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/spoolahoop_1');
process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';

const app = express();

app.use(express.static('dist'));
var usersRouter = require(__dirname + '/routes/users_routes');
app.use('/api', usersRouter);

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.listen(8080, () => console.log('Listening on port 8080!'));

// restart please


// REACT NOTES

// # Start development server
// npm run dev
// # Build for production
// npm run build
// # Start production server
// npm start



// MONGO DB NOTES

// IN THE TERMINAL, at the root of your project, make a directory called db
// this creates a fresh database for each app

// THEN run
// mongod --dbpath=./db --smallfiles

// IN MONGO
// > show dbs
// > use database_name
// switched to db database_name
// > db.workouts.find().pretty()
// returns all workout objects from the database