const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// set up connection w/ if statement so when I deploy to heroku, no refactoring is needed
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            prot: 3306
        }
    );
}

module.exporst = sequelize;