var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var routes = require("./controller/controller.js");
var expressValidator = require("express-validator");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local");

var db = require("./models");
// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));
app.use(session({
	secret: "DUUUUUUUUUDE",
	resave: false,
	saveUninitialized: true
}));

// app.use(session({
// 	secret: "DUUUUUUUUUDE",
// 	resave: false,
// 	saveUninitialized: true,
// 	cookie: {maxAge: 60000}
// }));

// -------------------------------------------------
var databaseUri = "mongodb://localhost/sampledatabse10";
if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
} else {
	mongoose.connect(databaseUri)
}
// MongoDB configuration (Change this URL to your own DB)
var database = mongoose.connection;


database.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

database.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.findOne({
    	where: {
    		email: username
    	}
    }).then(function(user){
    	if (!user) {
        	return done(null, false, { message: 'Incorrect username.' });
      	}
    	user.passwordVerify(password, user.password, function(err, match){
    		console.log('\n\n')
    		console.log("err was", err);
    		console.log('\n\n')
    		console.log("match was", match);

    		if (err) {
    			done(err);
    		}

    		if (match) {
    			return done(null, user);
    		} else {
    			return done(null, false, {message: 'Invalid Password'});
    		}
    	});
    }).catch(function(err){
    	console.log('failed on passport authentication', err);
    	done(err);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log("user in serializeUser", user);
  console.log("HEEEYYYYYYYY");
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // console.log("id in serializeUser", id);
  console.log("deserializeUserHIIIIIIIIIIII");
  //This was not working because I was not using sequelize syntax and just using the passport js document. I had to put
  //the function that I pasted from document, inside the 'then' promise that is part of sequelize syntax.
  // db.users.findById(id).then(function(user) {
  	console.log('deserializeUseruser', user)
    done(null, user);
  // }).catch(function(err){
  	// done(err);
  // });
});

app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);
// Starting our express server
db.sequelize.sync({ force: false }).then(function() {
	app.listen(PORT, function() {
	  console.log("App listening on PORT: " + PORT);
	});
});
