const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const furniture = require('./routes/furniture');

const user = require('./routes/user');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({ message: "Welcome" });
});

app.use('/user', user);
app.use('/furniture', furniture)

app.listen(PORT, () => {
    console.log("Server is running");
});