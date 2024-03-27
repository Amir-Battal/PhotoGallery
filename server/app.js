require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const allowedOrigins = [
    "https://photo-gallery-client.vercel.app",
]

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credential: true,
    optionSuccessStatus: 200
}


const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const photoRouter = require('./routes/photo');

const createError = require("http-errors");

var app = express();

app.use(cors(corsOptions));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('uploads', express.static('uploads'))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/photo', photoRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    if(err.name === 'MongoError' || err.name === 'validationError' || err.name === 'CastError') {
        err.status = 422;
    }
    res.status(err.statusCode || 500).json({message: err.message || "Some error is happen."});
});


mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB'); 
    })
    .catch((error) => {
        console.log('Error connecting to MongoDb:', error);
    });


module.exports = app;
