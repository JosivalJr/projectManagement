const path = require('path');
const axios = require('axios');
const Project = require('../models/Project');


exports.createProject = async function (req, res) {
    try{
        const project = new Project(req.body);

        await project.createProject();

        if(project.errors.length > 0){
            req.flash('errors', project.errors);
            req.session.save(() => res.redirect('/dashboard/projects/create'));
            return;
        };

        req.flash('success', 'Project created!');
        req.session.save(() => res.redirect('/dashboard/projects'));
        return;

    }
    catch (err){
        res.render(path.resolve(path.dirname(require.main.filename), 'src', 'views', '503'));
    }
};

exports.projectInfos = async function (req, res) {

    if(!req.params.id) return res.send({
        error: "",
        message: "Project id not filled in requisition params."
    });

    const project = new Project(req.params);

    const projectInfos = await project.getProject(req.params.id);

    if(!projectInfos) return res.status(404).json({
        error: "404 - Not Found",
        message: `Project '${req.params.id}' not found in our database.`
    });

    return res.status(200).json(projectInfos);
};

exports.listProjects = async function (req, res) {

    const projects = new Project(req.params);
    const projectsInfos = await projects.findUserProjects(req.params.username);

    return res.status(200).json(projectsInfos);
};

exports.renderEditProject = async function (req, res) {
    try{
        axios.get(`http://localhost:${process.env.PORT}/api/v1/project/${req.params.id}`)
        .then(function (response) {
            const infos = response.data;
            var deadline = new Date(infos.deadline)
            var getYear = deadline.toLocaleString("default", { year: "numeric" });
            var getMonth = deadline.toLocaleString("default", { month: "2-digit" });
            var getDay = deadline.toLocaleString("default", { day: "2-digit" });
            const dateFormat = getYear + "-" + getMonth + "-" + getDay;
            infos.deadline = dateFormat;

            return res.render('project', { project: infos });

        })
        .catch(function (error) {
            return res.render(path.resolve(path.dirname(require.main.filename), 'src', 'views', '503'));
        });
    
    } catch (err) {
        return res.render(path.resolve(path.dirname(require.main.filename), 'src', 'views', '503'));
    }
    
};

exports.editProject = async function (req, res) {
    try {
        const infos = req.body;
        const project = new Project(req.body);
        console.log(infos);
        await project.editProject();
 
        req.flash('success', 'Project updated!');
        req.session.save(() => res.redirect('/dashboard/projects'));

    } catch (err) {
        return res.render(path.resolve(path.dirname(require.main.filename), 'src', 'views', '503'));
    }
};

exports.deleteProject = async function (req, res) {
    try{
    const project = new Project(req.params);

    await project.deleteProject(req.params.id);

    req.flash('success', 'Project deleted!');
    req.session.save(() => res.redirect('/dashboard/projects'));

    } catch (err) {
        return res.render(path.resolve(path.dirname(require.main.filename), 'src', 'views', '503'));
    };
};