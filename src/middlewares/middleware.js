const path = require('path');

exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    res.locals.infos = {};
    next();
  };

  exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
      return res.render(path.resolve(path.dirname(require.main.filename), 'src', 'views', '404'));
    }
    next();
  };
  
  exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
  };
  
  exports.loginRequired = (req, res, next) => {
    if(!req.session.user) {
      req.flash('errors', 'Você precisa fazer login.');
      req.session.save(() => res.redirect('/dashboard'));
      return;
    }
    next();
  };
  