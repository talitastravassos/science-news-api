const express = require("express");
const app = express();
const routes = require('./routes');

app.use('/api', routes); //register the routes
app.use(express.static('public'))

app.listen(4000, () => console.log("listening on port 4000"));
