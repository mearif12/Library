const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createUser = async (userData) => {
    try{
       const email = userData.email;
       const password = userData.password;
       const firstName = userData.firstName;
       const lastName = userData.lastName;
       const roll = userData.roll;
       const existingUser = await User.findOne({email:email});
       if(existingUser){
         const err = new Error("Email already exists");
         err.statusCode = 406;
         throw err;
       }

       // allowed email domains
        const allowedDomains = ['gmail.com', 'outlook.com', 'yahoo.com'];

        const emailDomain = email.split('@')[1];

        if (!emailDomain || !allowedDomains.includes(emailDomain)) {
          const err = new Error(
            "Email must be from gmail.com, outlook.com, or yahoo.com"
          );
          err.statusCode = 406;
          throw err;
        }

    // Check roll duplicate
    const existingRoll = await User.findOne({ roll });
    if (existingRoll) {
      const err = new Error("Roll number already exists");
      err.statusCode = 406;
      throw err;
    }

        // convert to string to check patterns easily
        const rollStr = String(roll);

        // must be 6 digits
        if (!/^\d{6}$/.test(rollStr)) {
          const err = new Error("Roll must be a 6-digit number.");
          err.statusCode = 406;
          throw err;
        }

        // check middle two digits are 06
        if (rollStr.substring(2, 4) !== "06") {
          const err = new Error("Roll must follow pattern XX06XX");
          err.statusCode = 406;
          throw err;
        }

        // last two digits 01–42
        const lastTwo = Number(rollStr.substring(4, 6));
        if (lastTwo < 1 || lastTwo > 42) {
          const err = new Error("Last two digits must be between 01 and 42");
          err.statusCode = 406;
          throw err;
        }



       const hashedPassword = await bcrypt.hash(password,10);
       const user = new User({
          email:email,
          firstName:firstName,
          lastName:lastName,
          roll:roll,
          role:'STUDENT',
          password:hashedPassword

       });
       await user.save();
       return user;

    }catch(error){
        console.log(`Error creating user:${error}`);
        throw error;
    }
};

const loginUser = async (userData) => {
    try{
       const email = userData.email;
       const password = userData.password;
       const existingUser = await User.findOne({email:email});
       if(!existingUser){
        const err = new Error("Email not exist");
        err.statusCode = 403;
        throw err;
       }
       

       const isValidPassword = await bcrypt.compare(password,existingUser.password);
       if(!isValidPassword){
        const err = new Error("Invalid Password");
        err.statusCode = 403;
        throw err;
       }
       const token = jwt.sign({ id: existingUser._id, role:existingUser.role },
                     process.env.JWT_SECRET,
                     {expiresIn: "2d"}
        );
        return token;
    }catch(error){
        console.log(`Error creating user:${error}`);
        throw error;
    }
};


module.exports = { createUser,loginUser };