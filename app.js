const express = require ('express');

const app = express();

const path = require ('path')

const port = 3000

//////////////////////////////////////////////////////////////////


app.listen(port, () => console.log("Servidor corriendo en el puerto 3000"))

app.use(express.static('public'))

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//////////////////////////////////////////////////////////////////

const mainRoutes = require('./routes/mainRoutes');

app.use('/', mainRoutes);


const productsRoutes = require('./routes/productsRoutes');

app.use('/', productsRoutes);


// app.get('*', (req, res) => {
    
//     res.status(404).send("Not found 404")
    
// })