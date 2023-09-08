const express=require("express");
const app=express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors=require("cors");
const errorMiddlware=require("./middlewares/error");

// // Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//     require("dotenv").config({ path: "backend/config/config.env" });
// }
  

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(async (req, res, next) => {
    // Set the allowed origin to your frontend's URL

    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    
    // Allow other required headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    // Allow specific HTTP methods
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    
    // Set this to true if you need to include cookies in the request
    res.header('Access-Control-Allow-Credentials', true);
    // Continue to the next middleware
    next();
  });

  const corsOptions = {
    origin: process.env.FRONTEND_URL,
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));

//Route Imports
const product=require('./routes/productRoute');
const user = require("./routes/userRoute");
const order=require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1",product);
app.use("/api/v1", user);
app.use("/api/v1",order);
app.use("/api/v1", payment);

//MIDDLEWARE FOR ERROR-
app.use(errorMiddlware);

module.exports=app;