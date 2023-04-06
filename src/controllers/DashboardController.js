const axios = require('axios');
const path = require('path');

exports.renderIndex = (req, res) => {
    if(req.session.user){
        res.redirect('/dashboard/projects');
    } else {
        res.redirect('/dashboard/login');
    }
};

exports.renderLogin = (req, res) => {
    if(req.session.user){
        res.redirect('/dashboard/projects');
    };
    res.render('login');

};

exports.renderProjects = function (req, res) {

    axios.get(`http://localhost:${process.env.PORT}/api/v1/projects/${req.session.user.username}`)
    .then(async function (response) {
        var projects = response.data;
        
        for(var project of projects){

            project.done = project.done === true ? "Finished" : "In Progress";
            project.deadline = project.deadline.split('T')[0];

            const postalCode = await axios.get(`https://viacep.com.br/ws/${project.zip_code}/json/`)
            .then(function (response) {
                const data = response.data;
                const postalCode = `${data.localidade}/${data.uf}`;
                project.postal_code = postalCode;
            })
            .catch(function (err) {
                project.postal_code = 'PostalCode not finded';
            });
        }
        return projects;
        
    }).then((projects) => {
        res.render('projects', { projects });
    })
    .catch(function (err) {

        res.render(path.resolve(path.dirname(require.main.filename), 'src', 'views', '404'));
    });
};

exports.renderCreateProjects = (req, res) => {
    res.render('project', { project: {} });
};
