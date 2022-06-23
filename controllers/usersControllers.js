const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const userFilePath = path.join(__dirname,'../data/users.json')
const usersJson = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'))

const usersControllers = {
index: (req,res) => {
    res.render('users', {usersJson});
},
login: (req, res) => {
    res.render('login')
},

register: (req, res) => {
    res.render('register')
},
saveUser: (req, res) => {
    let image
    if(req.files[0] != undefined){
        image = req.files[0].filename
    } else {
        image = 'default-image.jpeg'
    }

    let newUser = {
        
        user_id: usersJson[usersJson.length-1].user_id+1,
        ...req.body,
        avatar: image,
        password: bcrypt.hashSync(req.body.password, 10)
    }

    let comparacion = bcrypt.compareSync('$2a$10$NWpGN4joq7wd23RqbtT7yeZXh825kQLmZ4jFC/PmaOOA1IB4DtVCu', 'holasoyhola');
    console.log(comparacion)
    
    usersJson.push(newUser) ;      
    fs.writeFileSync(userFilePath, JSON.stringify(usersJson));
    res.redirect('/users')
    },
};

module.exports = usersControllers;