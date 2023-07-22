const session = require('express-session')

const oneDay = 1000 * 60 * 60 * 24;

module.exports =session({
    secret:'tanmaysecret',
    resave:false,
    name:'sessionId',
    saveUninitialized:false, 
     //if u make a req to server and youre not storing anything to session then we're not going to write it to the db
    
     //we are sending back a cookie these setting here ctrl how the CK is sent back
    cookie:{
        secure: false,        //sent CK back if incoming req is https
        httpOnly:true,        //if true prevents client side JS from reading the cookie
         maxAge: oneDay ,    //session maxage in ms
    }
})

