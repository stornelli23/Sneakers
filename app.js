const express = require ('express');

const app = express();

const path = require ('path')

const port = 3000

//////////////////////////////////////////////////////////////////


app.listen(port, () => console.log("Servidor corriendo en el puerto 3000"))

app.use(express.static('public'))

//////////////////////////////////////////////////////////////////


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './views/index.html'))   
})

app.get('/productCart', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productCart.html')) 
})

app.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'))
})

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, './views/'))
})

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, './views/'))
})

app.get('', (req, res) => {
	res.sendFile(path.join(__dirname, './views/'))
})

app.get('', (req, res) => {
    res.sendFile(path.join(__dirname, './views/'))
})

app.get('*', (req, res) => {
    
    res.status(404).send("Not found 404")
    
})