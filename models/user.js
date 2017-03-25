var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {

	var users = sequelize.define("users", {
		name: DataTypes.STRING,
		username: DataTypes.STRING,
		skills: DataTypes.STRING,
		password: DataTypes.STRING,
		email: DataTypes.STRING
	}, {

		instanceMethods: {
			passwordVerify: function(userPW, hash, callback){
				//the parameter userPW and hash are both passwords passed in from the passport Localstrategy
				return bcrypt.compare(userPW, hash, function(err, res) { //res is the result after comparison. Boolean value
						    if (err) throw err;
						    callback(null, res);
						});
			}
		},

		hooks: {
			beforeCreate: function(user, options){
				return new Promise(function(resolve, reject){
					bcrypt.genSalt(10, function(err, salt) {
					    bcrypt.hash(user.password, salt, function(err, hash) {
					    	if (err) {reject(err)}
					        user.password = hash;
					    	console.log(user.password);
					    	resolve();
					    });
					});
				})
			}
		}


	});

	return users;
}
