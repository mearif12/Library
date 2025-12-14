const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const createAnAdminAccount = async () => {
    try{
       const email = process.env.ADMIN_EMAIL;
       const password = process.env.ADMIN_PASSWORD;
       const firstName = process.env.ADMIN_FIRST_NAME;
       const lastName = process.env.ADMIN_LAST_NAME;
       const roll = process.env.ADMIN_ROLL;
       const existingAdmin = await User.findOne({email:email});
       if(existingAdmin){
          console.log("Admin account already exist");
          return;
       }

       const hashedPassword = await bcrypt.hash(password,10);
       const admin = new User({
          email:email,
          firstName:firstName,
          lastName:lastName,
          roll:roll,
          role:'ADMIN',
          password:hashedPassword

       });
       await admin.save();
       console.log("Admin is created successfully");

    }catch(error){
        console.log(`Error creating Admin account:${error}`);
    }
};

module.exports = { createAnAdminAccount };