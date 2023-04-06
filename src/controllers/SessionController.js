const path = require('path');
const User = require('../models/User');

exports.registerUser = async function (req, res) {

    if(req.session.user){
        res.redirect('/dashboard/projects');
    };

    try{
        const { username, password } = req.body;
        const user = new User({username, password});

        await user.register();
  
        if(user.errors.length > 0){
            req.flash('errors', user.errors);
            req.session.save(() => res.redirect('/dashboard/login'));
            return;
        };

        req.flash('success', 'User successfully registered!');
        req.session.save(() => res.redirect('/dashboard'));
        return;

    }
    catch (err){
        res.render(path.resolve(path.dirname(require.main.filename), 'src', 'views', 'errors', '503'));
    }
};

exports.login = async function (req, res) {

    try{
        const { username, password } = req.body;
        const user = new User({username, password});
        await user.login();

        if(user.errors.length > 0){
            req.flash('errors', user.errors);
            req.session.save(() => res.redirect('/dashboard/login'));
            return;
        };

        req.flash('success', 'User successfully logged!');
        req.session.user = user.user;
        req.session.save(() => res.redirect('/dashboard/projects'));
        return;

    }
    catch (err){
        res.render(path.resolve(path.dirname(require.main.filename), 'src', 'views', 'errors', '503'));
    }
};

exports.logout = async function (req, res) {
    req.session.destroy();
    res.redirect('/dashboard/login');
    return;
};