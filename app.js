const express = require ('express');

const app = express();

const path = require ('path')

const port = 3000
const methodOverride = require('method-override')
const session = require('express-session');
const cookie = require('cookie-parser');
////////////////////////-- MIDDLEWARES --/////////////////////////

const cookieAuthMiddleware = require('./middlewares/cookieAuthMiddleware');

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
app.use(cookieAuthMiddleware);
//////////////////////////////////////////////////////////////////

const mainRoutes = require('./routes/mainRoutes');

app.use('/', mainRoutes);


const productsRoutes = require('./routes/productsRoutes');

app.use(productsRoutes)

const usersRoutes = require('./routes/usersRoutes');

app.use(usersRoutes)

const apiUsersRoutes = require('./routes/apisRoutes/apiUsersRoutes');

app.use(apiUsersRoutes)

const apiProductsRoutes = require('./routes/apisRoutes/apiProductsRoutes');

app.use(apiProductsRoutes)

const errorRouter = require("./routes/errorRouter");

app.use("/404", errorRouter);



app.use((req, res, next) => next(createError(404)));

// ** error handler **
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});