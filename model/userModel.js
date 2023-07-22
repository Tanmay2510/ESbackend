const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    // _id:Schema.Types.ObjectId,
    Name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userPlaylist:[{
        playName:String,
        playData:[]
    }
    ]
     
        
    


        
})
const User = new mongoose.model("User",userSchema);

module.exports={User,userSchema};
