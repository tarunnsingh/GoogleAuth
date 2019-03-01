const express = require ("express");
const authRoutes = require("./routes/auth-routes");
//const profileRoutes = require("./routes/profile-routes");
const app = express();
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require ("passport");



//setup view engine
app.set("view engine","ejs");


app.use(cookieSession({
	maxAge : 24*60*60*1000,
	keys: [keys.session.cookieKeys]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongo db

mongoose.connect('mongodb://ram:ram1234@ds135952.mlab.com:35952/oauth-testing-google',{useNewUrlParser: true},function(){
	console.log("Connected to Database")
});


mongoose.connection.on('error', function(error) {
  console.error('Database connection error:', error);
});

mongoose.connection.once('open', function() {
  console.log('Database connected');
});


app.use("/auth", authRoutes);
//app.use("/profile", profileRoutes);


// console.log("in profile routes"+req.user);
// var authCheck = (req, res, next) => {
// 	if(!req.user){
// 		//i fuser not logged in
// 		res.redirect("/auth/login");
// 	} else {
// 		next();
// 	}
// };


// app.get("/profile",function(req, res){
// 	//res.send(req);
// 	res.send("You Are a logged in " + req.session.passport.user);
// 	console.log(req);
// });




//home route
app.get("/",function(req, res){
	res.render("home");
});



app.listen("3000",function(){
	console.log("Started Server");
});