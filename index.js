const express = require("express");
const app = express();
const cors = require('cors')
const routes = require('./routes');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', routes); //register the routes
app.use(cors())

app.get('/', (req, res) => {
    res.redirect('/api')
})

const port = process.env.PORT || 4000 

app.listen(port, () => console.log(`listening on port ${port}`));
