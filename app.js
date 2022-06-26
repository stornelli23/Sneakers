const express = require ('express');

const app = express();

const path = require ('path')

const port = 3000
const methodOverride = require('method-override')
const session = require('express-session');
const cookie = require('cookie-parser');
//////////////////////////////////////////////////////////////////


app.listen(port, () => console.log("Servidor corriendo en el puerto 3000"))

app.use(express.static('public'))

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({secret: 'secret', resave: false, saveUninitialized: false}));
app.use(cookie());
//////////////////////////////////////////////////////////////////

const mainRoutes = require('./routes/mainRoutes');

app.use('/', mainRoutes);


const productsRoutes = require('./routes/productsRoutes');

app.use(productsRoutes)

const usersRoutes = require('./routes/usersRoutes');

app.use(usersRoutes)