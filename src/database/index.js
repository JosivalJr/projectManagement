const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/UserModel');
const Project = require('../models/ProjectModel');

const connection = new Sequelize(dbConfig);

User.init(connection);
Project.init(connection);

module.exports = connection;