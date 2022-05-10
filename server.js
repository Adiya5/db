const express = require("express");
const app = express();
//const port = 3000;
const rest = require("restler");
const ejs = require("ejs");
const bodyparser=require('body-parser')
const dbConfig = require('./config/database.config.js');
app.use(bodyparser.urlencoded({ extended: true }))
const mongoose = require('mongoose');
app.use(bodyparser.json())
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});
app.set('view engine', 'ejs');
app.use("/", require("./routes/create"));
app.use("/find", require("./routes/find"));
app.use("/delete", require("./routes/delete"));
app.use("/update", require("./routes/update"));
app.use("/all", require("./routes/all"));
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);