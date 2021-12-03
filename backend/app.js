const express = require("express");
const cors = require('cors')
const app = express();
const Router = require("./router");

app.use(express.json())
app.use(cors())

app.use("/", Router);

// app.get('/', (req, res) => {
//   res.send("SERVER IS UP AND RUNNING")
// })

// app.listen(5000, () => console.log("server listeing on port: "+ 5000))

module.exports = app;
