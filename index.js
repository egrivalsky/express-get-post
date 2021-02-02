const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');

//Middleware
//This will help us use our layout file
app.use(expressLayouts);

//for views use ejs files:
app.set('view engine', 'ejs');

//ROUTES
app.get('/', (req, res) => {
    res.send(`Everything's peachy on port 8000.`)
})

//'Index View' to get all dinosaurs
app.get('/dinosaurs', (req, res) => {
    let dinos = fs.readFileSync('dinosaurs.json');

    //take our object and put it in a more readable format:
    dinos = JSON.parse(dinos);
    console.log(dinos);
//This is where we pass 'dinos' object to dinosaurs/index
    res.render('dinosaurs/index', { dinos: dinos })

})
//POST route, doesn't have a view
app.post('/dinosaurs', (req, res) => {
    //this is coming from our form submit. we use req.body

    console.log(req.body);
});

//SHOW View
app.get('/dinosaurs/:index', (req, res) => {
    let dinos = fs.readFileSync('dinosaurs.json')

    dinos = JSON.parse(dinos);

    dinos = dinos[req.params.index]
    res.render('dinosaurs/show', { dino })
})




const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}.`)
});