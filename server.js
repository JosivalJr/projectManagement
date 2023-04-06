require('dotenv').config();

const path = require('path');
const postgres = require('pg');

const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const expressSession  = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession );

const flash = require('connect-flash');

const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');
const csrf = require('csurf');


require('./src/database');

const app = express();
const pgPool = new postgres.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASENAME
});

const expressOptions = expressSession ({
    store: new pgSession ({
        pool: pgPool,
        tableName: 'session'
    }),
    name: 'SID',
    resave: false,
    secret: process.env.SS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
});

app.use(expressOptions);
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.join('src', 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors( { methods: ["GET", "POST", "DELETE", "PUT", "PATCH"] } ));

app.use(csrf());

app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);


app.use(routes);

app.listen(process.env.PORT, function(){
    console.log('Server is Running.');
    console.log('http://localhost:3000/dashboard');
});