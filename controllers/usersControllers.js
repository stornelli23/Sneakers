const fs = require("fs");
const path = require("path");

const User = require("../database/models/User");

const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const userFilePath = path.join(__dirname, "../data/users.json");
const usersJson = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
const db = require('../database/models')

const usersControllers = {
  index: (req, res) => {
    let logueado = req.session.userLogged ;
    res.render("users", { usersJson, logueado });
  },
  login: (req, res) => {
    let logueado = req.session.userLogged ;

    res.render('login', {logueado});
  },

  register: (req, res) => {
    let logueado = req.session.userLogged ;
    res.render("register",{logueado});
  },
  processRegister: (req, res) => {
    let logueado = req.session.userLogged ;
    let resultValidation = validationResult(req);
    let file = req.file;
    
    if (resultValidation.errors.length > 0) {
      res.render("register", {logueado,  
        errors: resultValidation.mapped(), 
        oldData: req.body });
    }

    let userInDB = User.findByField('email', req.body.email)
      if(userInDB){

        return res.render('register', {logueado,
          errors: {
            email: {
              msg: 'El email ingresado ya esta registrado'
            },
            oldData: req.body
          }
        })
      }
      let image 
          if(file){
              image = file.filename
          } else {
              image = 'avatardefault.png'
          };
  
      let newUser = {
          user_id: User.generateId(),
          ...req.body,
          avatar: image,
          password: bcrypt.hashSync(req.body.password, 10)
      }
      usersJson.push(newUser);
      fs.writeFileSync(userFilePath, JSON.stringify(usersJson, null, ' '));
      return res.redirect("/users");
    
  },

  profile: (req, res) => {
    let logueado = req.session.userLogged ;
    res.render("userProfile",{logueado});
  },

  loginProcess: (req, res) => {
    let logueado = req.session.userLogged ;
    let userToLogin = User.findByField('email', req.body.email);
    if(userToLogin){
      
      let passwordOk = bcrypt.compareSync(req.body.password, userToLogin.password)
      if(passwordOk){
        
        req.session.userLogged = userToLogin;
        
        if (req.body.recordarUsuario != undefined){
          res.cookie('userEmail', userToLogin.email, {maxAge: (60000 * 60)})
        }

      }else {

        return res.render("login", {logueado,
          errors: {
            password: {
              msg: 'Contraseña incorrecta'
            }
          }
        });
        }
    }else {
      return res.render("login", {logueado,
        errors: {
          email: {
            msg: 'El email ingresado no está registrado'
          }
        }
      });

    }
    
    
    res.redirect('/')
  },

  logout: (req,res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    return res.redirect('/')
  }
};

module.exports = usersControllers;
