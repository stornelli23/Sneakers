const fs = require("fs");
const path = require("path");
const User = require("../database/models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../database/models");

const usersControllers = {
  index: async (req, res) => {
    let logueado = req.session.userLogged;
    let allUsers = await db.User.findAll();
    res.render("users", { allUsers, logueado });
  },
  login: (req, res) => {
    let logueado = req.session.userLogged;

    res.render("login", { logueado });
  },
  register: (req, res) => {
    let logueado = req.session.userLogged;
    res.render("register", { logueado });
  },
  processRegister: async (req, res) => {
    let logueado = req.session.userLogged;
    let resultValidation = validationResult(req);
    let allUsers = await db.User.findAll();
    let userInData = await db.User.findOne({
      where: { email: req.body.email },
    });

    console.log('REQBODY: ', req.body);

    if (resultValidation.errors.length > 0) {

console.log('resultV: ', resultValidation.errors)

      return res.render("register", {
        logueado,
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    } else if(userInData) {
      return res.render('register', {
        logueado, errors: {
          email: {
            msg: 'El email ingresado ya está resgistrado'
          },
          oldData: req.body
        }
      })
    }else {

      let image;
      if (req.file) {
        image = req.file.filename
      } else {
        image = "avatardefault.png";
      }
  
      await db.User.create(
        {
          id: allUsers.length + 1,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          avatar: image,
          date_of_birth: req.body.date_of_birth,
          gender: req.body.gender,
          permission_id: 2,
        }
      );
  
      return res.redirect("/");
    }

  },
  profile: (req, res) => {
    let logueado = req.session.userLogged;
    res.render("userProfile", { logueado });
  },

  loginProcess: async (req, res) => {
    let logueado = req.session.userLogged;
    let resultValidation = validationResult(req);
    let userToLogin = await db.User.findOne({
      where: { email: req.body.email },
    });
    if (userToLogin) {
      let passwordOk = bcrypt.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (passwordOk) {
        req.session.userLogged = userToLogin;

        if (req.body.recordarUsuario != undefined) {
          res.cookie("userEmail", userToLogin.email, { maxAge: 60000 * 60 });
        }
      } else {
        return res.render("login", {
          logueado,
          errors: {
            password: {
              msg: "Contraseña incorrecta",
            },
          },
        });
      }
    } else {
      return res.render("login", {
        logueado,
        errors: {
          email: {
            msg: "El email ingresado no está registrado",
          },
        },
      });
    }
    let usuariologueado = req.session.userLogged
    console.log(req.session.userLogged.id)
    res.redirect("/");
  },
 
 

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = usersControllers;
