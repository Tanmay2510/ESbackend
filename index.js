const express = require("express");
const cors = require("cors");
const router = require("../routes/router")
const session = require('../middleware/session');
const connectDB = require("../config/db");
const bp = require('body-parser')
require('dotenv/config');


const port = process.env.PORT || 3001;

// connecting to database
connectDB();
const app = express();

app.use(cors({
  origin:"https://esionn.netlify.app",
  credentials:true,
  header:"Access-Control-Allow-Origin: https://esionn.netlify.app",
  header:"Access-Control-Allow-Credentials: true",
  header:"Access-Control-Allow-Methods: GET, POST,PUT,PATCH,DELETE",
  header:"Access-Control-Allow-Headers: Content-Type, *",
  
}));
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());
app.use(session)
app.use("/",router)

app.get("/", (req, res) => {
    res.send("APIs working properly");
  });

app.listen(port, () => console.log(`APIs listening on port ${port}!`));
module.exports = app;