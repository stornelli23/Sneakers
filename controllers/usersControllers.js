const fs = require("fs");
const path = require("path");

const User = require("../models/User");

const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const userFilePath = path.join(__dirname, "../data/users.json");
const usersJson = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

const usersControllers = {
  index: (req, res) => {
    res.render("users", { usersJson });
  },
  login: (req, res) => {
    res.render("login");
  },

  register: (req, res) => {
    res.render("register");
  },
  processRegister: (req, res) => {
    let resultValidation = validationResult(req);
    let file = req.file;
    
    if (resultValidation.errors.length > 0) {
      res.render("register", { 
        errors: resultValidation.mapped(), 
        oldData: req.body });
    }else{
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
    }
  },

  profile: (req, res) => {
    res.render("userProfile");
  },

  loginProcess: (req, res) => {
   
  },
};

module.exports = usersControllers;
