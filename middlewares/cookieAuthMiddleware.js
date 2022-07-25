const User = require('../database/models/User')

function cookieAuthMiddleware (req,res,next){
    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', emailInCookie);

    if(userFromCookie){
        req.session.userLogged= userFromCookie
    }

    next();
}

module.exports= cookieAuthMiddleware;