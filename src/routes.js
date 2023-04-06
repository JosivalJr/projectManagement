const express = require('express');
const path = require('path');

const routes = express.Router();

const { loginRequired } = require('./middlewares/middleware')

const dashboardController = require('./controllers/DashboardController');
const sessionController = require('./controllers/SessionController');
const projectsController = require('./controllers/ProjectsController');

/* Dashboard Routes */

    routes.get('/dashboard', dashboardController.renderIndex);
    routes.get('/dashboard/login', dashboardController.renderLogin);
    routes.get('/dashboard/projects', loginRequired, dashboardController.renderProjects);
    routes.get('/dashboard/projects/project/create', loginRequired, dashboardController.renderCreateProjects);
    routes.get('/dashboard/projects/project/:id', loginRequired, projectsController.renderEditProject);

/* Backend Routes */

    /* Session */
        routes.get('/api/v1/session/logout', sessionController.logout);
        routes.post('/api/v1/session/login', sessionController.login);
        routes.post('/api/v1/session/register', sessionController.registerUser);
        
    /* Projects */
        routes.post('/api/v1/project', projectsController.createProject);

        routes.get('/api/v1/projects/:username', projectsController.listProjects);
        routes.get('/api/v1/project/:id', projectsController.projectInfos);
        routes.post('/api/v1/project/put', projectsController.editProject);
        routes.patch('/api/v1/project/patch', projectsController.editProject);
        routes.get('/api/v1/projects/delete/:id', projectsController.deleteProject);
        routes.delete('/api/v1/projects/:id',  projectsController.deleteProject);

module.exports = routes;