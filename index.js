const express = require('express')
const app = express()
 
app.get('/', (req, res) => {
  res.send('Hello World')
})
 

app.get('/api/news', (req, res) => {
    res.send([1, 2, 3])
})

app.listen(4000, () => console.log("listening on port 4000"))