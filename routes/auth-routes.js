const router = require("express").Router();
const passport = require("passport");

router.get("/login",function(req, res){
	res.render("login");
});


//auth with google

router.get("/google", passport.authenticate('google',{
	scope:['profile']
}));

router.get("/logout", function(req, res){
	//handle with passport

	res.send("logging Out");
});

//callback route for google to redirect to

router.get("/google/redirect",passport.authenticate('google'),function(req, res){

	if(!req.user){
		//if user not logged in
	 	return res.redirect("/auth/login");
	} else {
		res.send("Logged in as :" + req.user.username);
	}
});
	

module.exports = router;