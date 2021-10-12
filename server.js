//dependencies
const path = require('path');
const express = require('express');
const session = require ('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
// potentially add more helper functions
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SquelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
//setup the port in such a way that allows the heroku functionality to work when deployed
const PORT = process.env.PORT || 3001;

//setting up handlebars.js engine w/ helpers
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SquelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// inform exrpess which template to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(routes);

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});


