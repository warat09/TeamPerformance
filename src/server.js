const express = require('express')
const http = require('http')
const router = express();
const sql = require("./config/db");
var morgan = require('morgan')
var cors =  require('cors')
var config = require('./config/config')
var user = require('./routes/Users')
var department = require("./routes/Departments")



const startserver=()=>{
    router.use(morgan('dev'))
    router.use(express.json({ limit: "100mb" }));
    router.use(express.urlencoded({ extended: true, limit: "100mb" }));
    router.use(cors())
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With,Content-Type,Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
          res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
          return res.status(200).json({});
        }
        next();
      });
    router.use("/User", user);
    router.use("/Department",department)
    router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "Hello!!!!" })
    );
  http
  .createServer(router)
  .listen(9090, () =>
  //   Logging.info(`Server is runnig on port 9090 ? Number(9090) : 1337`)
    console.log('Application started on port 9090!')
  );
}
startserver()
