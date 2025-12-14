const express = require('express');
const mongoose = require('mongoose');
const { createAnAdminAccount } = require('./utils/common');
const app = express();
require('dotenv').config();
const cors = require('cors');
const authRoute = require('./routes/auth/authRoute');
const adminBookRoute = require('./routes/admin/bookRoute');
const studentBookRoute = require('./routes/student/bookRoute');

const port = process.env.PORT;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;
const corsorigin = process.env.CORS_ORIGIN;

const corsOptions = {
    origin: corsorigin,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

mongoose.connect(mongoURI,{})
.then(()=>{
    console.log("Connected to mongodb");
    createAnAdminAccount();
}).catch((error)=>{
    console.log(`connection error : ${error}`);
})

app.listen(port,()=>{

    console.log(`The server is running at http://localhost:${port}`);

});

app.use('/api/auth',authRoute);

app.use('/api/admin/book',adminBookRoute);

app.use('/api/student/book',studentBookRoute);


