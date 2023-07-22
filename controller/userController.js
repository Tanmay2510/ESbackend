require('dotenv/config');
const saltRounds =  9;
const {User} = require("../model/userModel")
const bcrypt = require("bcrypt")

const handleRegister = (req,res) =>{
    const {email,password,name} = req.body;
    bcrypt.hash(password,saltRounds,function(err,hash){
        User.findOne({email:email},(err,foundUser)=>{
            if(foundUser){
                res.json({
                    login:false,
                    message:"User already registered"
                })
            }else{
                const user = new User({
                    Name:name,
                    email:email,
                    password:hash,
                    // userPlaylist:[
                    //     {
                    //         playName:"",
                    //         playData:[]
                    //     }
                    // ]
                  
                })
      
                user.save(err=>{
                    if(err){
                        res.json({
                            login:false,
                            message:"Error"
                        })
                    }else{
                        req.session.name = user.Name;
                        req.session.email = email;
                        res.setHeader('Set-Cookie',`userId=${user._id}; Max-Age=${60*60*24}`)
                        res.json({
                            id:user._id,
                            login:true,
                            message:"User registered",
                            Name:name,
                        })
                    }
                })
            }
        })
    })
}
const handleLogin = (req,res) =>{
        const {email,password} = req.body;
        User.findOne({email:email},(err,user)=>{
            if(user){
                bcrypt.compare(password,user.password,function(err,result){
                    if(result===true){
                        req.session.name = user.Name;
                        req.session.email = email;
                        // res.setHeader('Set-Cookie',`userId=${user._id}; Max-Age=60*60*24`)
                        res.setHeader('Set-Cookie',`userId=${user._id}; Max-Age=${1000*60*60*24}`)
                        res.json({
                            login:true,
                            id:user._id,
                            message:"User Found!!",
                            Name:user.Name
                    })
                    }else{
                        res.json({
                                login:false,
                                message:"Password didn't match"
                        })
                }
                })
            }else{
                res.json({
                        login:false,
                        message:"User not registered"
                })
        }
        })
}
const handleLogout = (req,res)=>{
    res.clearCookie('sessionId')
    res.clearCookie('userId')
    req.session.destroy();
    res.send({
            login:false,
            message:"User logged out"
    })
}
const handlePlaylist = (req,res)=>{
    const id = req.params.gid
    const obj = {
        playName:req.body.name,
        playData:req.body.data
    }
    User.findByIdAndUpdate({
        '_id':id},
        {$push :{
            'userPlaylist':obj
            // {'playName':nam,'playData':dat},
            }},(err,result)=>{
                if(err){
                    console.log(err)
                }else{
                    res.json({  
                        thid:id,
                        saved:true,
                    })
                }
        })

}
const handlePlaylistData = (req,res)=>{
    const id = req.params.gid

    User.findById({'_id':id},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json({
                theData:result.userPlaylist,
                got:true
            })
        }
    })
}

const handleDeletePlaylist = (req,res)=>{
    const id = req.params.gid;
    const playDelData = req.body;
    User.findByIdAndUpdate({'_id':id},{"$pull": {'userPlaylist':{
        'playName':{$in: playDelData}}}},(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({
                    delete:true
                })
            }
    })
}
const handleCheck = (req,res)=>{
    const id = Object.values(req.body);
    const gid = id.toString()
    User.countDocuments({_id: gid}, function (err, count){ 
        if(count>0){
            res.json({
                UserExists:true
            })
        }else{
            res.json({
                UserExists:false
            })
        }
    }); 

}

module.exports={handleRegister,handleLogin,handleLogout,handlePlaylist,handlePlaylistData,handleDeletePlaylist,handleCheck};