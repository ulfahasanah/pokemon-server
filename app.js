const express = require('express');
const cors = require('cors')
const port = 3000
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.get('/', (req, res) => {
    res.send(".....hello world.....")
});

app.listen(port, () => {
    console.log(`Server started on port ${port}` );
});