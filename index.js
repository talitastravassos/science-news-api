const express = require("express");
const app = express();
const cors = require('cors')
const routes = require('./routes');

app.use('/api', routes); //register the routes
app.use(express.static('public'))
app.use(cors())

const port = process.env.PORT || 4000 

app.listen(port, () => console.log(`listening on port ${port}`));
