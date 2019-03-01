const router = require("express").Router();

const passport = require("passport");


const authCheck = (req, res, next) => {
	if(!req.user){
		//i fuser not logged in
		res.redirect("/auth/login");
	} else {
		next();
	}
};

router.get("/",authCheck,function(req, res){
	//res.send(req);
	res.send("You Are a logged in " + req.user);
});



module.exports = router;