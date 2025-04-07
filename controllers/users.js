const User=require("../Models/user");
module.exports.renderSignup=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try{
        let{username,password,email}=req.body;
        const newUser= new User({email,username});
         const registeredUser= await User.register(newUser,password);
         req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success"," Registered successfully, Welcome to WanderNest!");
            res.redirect("/listings");
         });
         
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
};

module.exports.renderLogin=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to WanderNest");
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);

};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    })
};