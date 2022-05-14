const path = require('path');

const mainControllers = {

    index: (req, res) => {
        res.render('index')  
    },
    
    productCart: (req, res) => {
        res.render('productCart') 
    },
    
    productDetail: (req, res) => {
        res.render('productDetail')
    },
    
    login: (req, res) => {
        res.render('login')
    },
    
    register: (req, res) => {
        res.render('register')
    }
    


}

module.exports = mainControllers;