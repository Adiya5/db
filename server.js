const express = require('express');
const bodyParser = require('body-parser');
const ejs=require('ejs')
const methodOverride = require('method-override')
const app = express();
//const port = 3000
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(methodOverride('_method'))

const UserRoute = require('./routes/User')
app.use('/user',UserRoute)

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const {router} = require("express/lib/application");
const path = require("path");
const UserController = require("./controllers/User");

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


app.get("/", (req, res) => res.render(path.resolve("./views/create.ejs")))
//app.post("/", UserController.create);
app.get("/find", (req, res) => res.render(path.resolve("./views/find.ejs")))
//app.get('/:email', UserController.findOne);
app.get("/update", (req, res) => res.render(path.resolve("./views/update.ejs")))
//app.post('/:email', UserController.update);
app.get("/all", (req, res) => res.render(path.resolve("./views/all.ejs")));
//app.get('/all', UserController.findAll);
app.get("/delete", (req, res) => res.render(path.resolve("./views/delete.ejs")))
//app.delete('/:email', UserController.delete);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});