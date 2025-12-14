const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
        validate: {
          validator: function (value) {
            return /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com)$/.test(value);
          },
          message: 'Email must be gmail.com, outlook.com, or yahoo.com'
        }
    },
    password:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    roll: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                const str = value.toString();
    
                // 1. Check 6 digits
                if (!/^\d{6}$/.test(str)) return false;
    
                // 2. Check digits 3 & 4 are "06"
                if (str.substring(2, 4) !== "06") return false;
    
                // 3. Check last 2 digits between 01–42
                const lastTwo = parseInt(str.substring(4, 6));
                return lastTwo >= 1 && lastTwo <= 42;
            },
            message: 'Roll must follow XX06YY format and YY must be between 01 and 42.'
        }
    },
    
    role:{
        type:String,
        required:true,
        enum:['STUDENT','ADMIN'],
        default:'STUDENT'
    }

},{ timestamps:true});

const User = mongoose.model('User',userSchema);

module.exports = User;