<p align="center">
    <a href="#application">Application</a> • 
    <a href="#technologies">Technologies</a> • 
    <a href="#pré-install">Install</a> • 
    <a href="#author">Author</a> •
</p>


## Application

<p>Simple .</p>

[Postman API Documentation] ...Building...


## Status

<h4 > 🚀 ...Currently working on refactor API strucure... </h4>

## Features

- [x] Login UI
- [x] Projects UI
- [x] Express Session
- [x] Database CRUD
- [x] API

## Technologies

- [Nodejs](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSql](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)

## Pré-Install

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)

## Install

1. Make a clone from this repository;
2. Access project root `/projectManagement` in terminal/cmd;
3. Fill enviroments:
  - <b>PORT</b> Port to access running application; <b>*Require</b>
  - <b>DB_PORT</b> Port to access Postgres; <b>*Require</b>
  - <b>DB_HOST</b> Host to access your postgres database; <b>*Require</b>
  - <b>DB_USER</b> Username to access your postgres account; <b>*Require</b>
  - <b>DB_PASSWORD</b> Password to access your postgres account; <b>*Require</b>
  - <b>SS_SECRET</b> Key to encrypt express session; <b>*Optional</b>
4. Run `yarn install` to install all dependencies;
5. Run `yarn sequelize db:create` to create postgres collection;
6. Run `yarn sequelize db:migrate` to create postgres migrations;
7. Run `yarn start` to run application;

## Author

Developed by Josival Oliveira.