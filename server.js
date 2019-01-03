const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const auth = require('./routes/api/auth');
const posts = require('./routes/api/posts');
const threads = require('./routes/api/threads');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').DATABASE_KEY;
console.log('db: ', db);

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    return console.log('connected');
  })
  .catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/threads', threads);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on ${port}.`);
});