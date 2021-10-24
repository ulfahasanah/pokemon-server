const express = require('express');
const router = require("./router/index")
const cors = require('cors')
const port = 3000
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log(`Server started on port ${port}` );
});