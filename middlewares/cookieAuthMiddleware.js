const User = require("../controllers/usersControllers");
const db = require("../database/models");
function cookieAuthMiddleware(req, res, next) {
  let emailInCookie = req.cookies.userEmail;

  if (emailInCookie) {
    let userFromCookie = db.User.findOne({
      where: { email: emailInCookie },
    }).then((resultado) => {
      if (userFromCookie) {
        req.session.userLogged = resultado;
      }
    });
  }

  next();
}

module.exports = cookieAuthMiddleware;
