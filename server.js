var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var routes = require("./controller/controller.js");
var expressValidator = require("express-validator");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var sockusers = [];
var sockusersAvatar = [];
var sockusersName = [];
// var connections = [];


var db = require("./models");
// Create a new express app
var app = express();

var server = require("http").createServer(app);
var io = require("socket.io")(server);

// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));
var session = require("express-session")({
	secret: "DUUUUUUUUUDE",
	resave: false,
	saveUninitialized: true
});

// app.use(session({
// 	secret: "DUUUUUUUUUDE",
// 	resave: false,
// 	saveUninitialized: true,
// 	cookie: {maxAge: 60000}
// }));

// SOCKET
// var sharedsession = require("express-socket.io-session");
app.use(session);
// io.use(sharedsession(session, {autoSave: false}));



//socketstart
// var chat = io.of('/chat');

io.on('connection', function(socket) {
   // console.log('connected from %s', window.location.hostname );

// console.log(socket.client.conn.id);
	console.log("connected.", socket.id);
	socket.on('disconnect', function() {
		console.log("%s disconnected", socket.id);
		console.log(Object.keys(io.sockets.sockets));
		// socket.emit('get clients', 'updating clients after disconect');
	});
	socket.on('chat opened', function(user) {
		console.log('Chat was entered by %s', user._id);
		socket.join('lobby');
		sockusers.push(user._id)
		if(user.avatar) {
			sockusersAvatar.push(user.avatar)

		} else if (user.avatar == null) {
			sockusersAvatar.push('http://www.liveanimalslist.com/birds/images/hen-white-and-black-color.jpg');
		}
		sockusersName.push(user.name)
		console.log('after joining. sockusers:%s', sockusers);

	});
	socket.on('chat closed', function(user) {
		socket.leave('lobby');
		console.log('Chat was closed by %s', user._id);
		sockusers.splice(sockusers.indexOf(user._id), 1);
		sockusersAvatar.splice(sockusersAvatar.indexOf(user.avatar), 1);
		sockusersName.splice(sockusersName.indexOf(user.name), 1);
		console.log('after leaving. sockusers:%s', sockusers);
		io.emit('sockusers', sockusers, sockusersAvatar, sockusersName);
	});

	socket.on('get sockusers', function(data) {
		console.log('getting sockusers');
		console.log('payload: %s', sockusers);
		io.emit('sockusers', sockusers, sockusersAvatar, sockusersName);
	})
	socket.on('new message lobby', function(data) {
			console.log('incoming new message: %s', data);
			socket.broadcast.to(data.room).emit('receive lobby message', data);
			console.log('broadcasting msg to room %s', data.room);
	});


});


// socket.on('joined lobby', function(response) {
// 	socket.join(response.room);
// 	socket.emit('sending id', 'user Socket ID:', socket.id);
// 	console.log(socket.id + ' joined room: '+response.room);
// 	var clients = Object.keys(io.sockets.sockets);
// 	console.log("\x1b[46m", 'clients:' + clients, '\x1b[0m');
// 	io.emit('user joined', response.user)
//
// })
//
// socket.on('joined room', function(response) {
// 	socket.join(response.room);
// 	console.log(socket.id + ' joined room: '+response.room);
//
// 	io.emit('user joined', response.user)
//
// })
//
//
// socket.on('exit lobby', function(response) {
// 	socket.leave(response.room);
// 	console.log('%s left the lobby', response.user);
// 	var clients = Object.keys(io.sockets.sockets);
// 	console.log("\x1b[46m", 'clients:' + clients, '\x1b[0m');
// 	io.emit('user left', response.user)
//
// })
//
// 	socket.on('new message lobby', function(data) {
// 		console.log('incoming new message: %s', data);
// 		socket.broadcast.to(data.room).emit('receive lobby message', data);
// 		console.log('broadcasting msg to room %s', data.room);
// 	});
// 	socket.on('new message private', function(data) {
// 		console.log('incoming new message: %s', data);
// 		socket.broadcast.to(data.room).emit('receive private message', data);
// 		console.log('broadcasting msg to room %s', data.room);
// 	});
//
//
//
// 	socket.on('get clients', function(data) {
// 		socket.emit('return clients', 'server msg:' + data, Object.keys(io.sockets.sockets))
// 	})
// });




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


// -------------------------------------------------
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
    console.log("USERNAME IS PASSPORT.USE", username)
    db.users.findOne({
    	where: {
    		email: username
    	}


      // if (!user.validPassword(password)) {
      //   return done(null, false, { message: 'Incorrect password.' });
      // }
      // return done(null, user);
    }).then(function(user){
    	// if(err) {return done(err);}
    	if (!user) {
        	return done(null, false, { message: 'Incorrect username.' });
      	}
      	//Instance methods can only be used when certain instances of sequelized are used such as create. Not
		//all instances of sequelize can use instance methods.
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

app.use(function(req, res, next){
	//res.locals has global scope.
	// res.locals.error_msg = req.flash('error_msg');
	// res.locals.error = req.flash('error');
	//This had to be req.user instead of req.session, since user is what gets returns from the passport
	//deserialize function.
	// res.locals.guy = req.user || null;

  if (req.user) {
    req.session.user = {
      id: req.user.id,
      name: req.user.name,
      username: req.user.username,
      email: req.user.email
    };
  }

 //  console.log('SUCCES MESSAGE', res.locals.succes_msg);
	// console.log('locals user', res.locals.user);
	console.log('session one', req.session);
	console.log('session user', req.session.user);
	console.log('req.user', req.user);
	next(); //Needed to call the next here to call the next app.use middleware. Before
	//I didnt have this, the app.use('/', routes) was never getting executed since the next() was not being
	//called.
});

// app.use(flash());

app.use('/', routes);
// Starting our express server
db.sequelize.sync({ force: false }).then(function() {
	server.listen(PORT, function() {
	  console.log("App listening on PORT: " + PORT);
	});
});
