/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcryptjs = require('bcryptjs');


module.exports = {
	'new': function(req, res){
		// var oldDateObj = new Date();
		// var newDateObj = new Date(oldDateObj.getTime() + 60000);
		// req.session.cookie.expires = newDateObj;
		// req.session.authenticated = true;
		// console.log(req.session);
		res.view('session/new');
	},

	create: function(req, res, next){
		if(!req.param('email') || !req.param('password')){
			var err = [{name: 'usernamePasswordRequired', message:'You must enter both a username and password.'}];

			req.session.flash = {
				err: err
			}
			res.redirect('/session/new');
			return;
		}

		User.findOneByEmail(req.param('email'), function findUser(err, user){
			if(err) return next(err);

			if(!user){
				var noAccountError = [{name: 'noAccount', message: ' The email address'	+req.param('email') + 'not found.'}];
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/session/new');
				return;
			}

			bcryptjs.compare(req.param('password'), user.encryptedPassword, function(err, isMatch){
				if(err) throw err;

				if(!isMatch){
					var err = [{name: 'usernamePaswordMismatch', message: 'Invalid username and password combination.'}];
					req.session.flash = {
						err: err
					}
					res.redirect('/session/new');
					return;
				}

				req.session.authenticated = true;
				req.session.User =user;

				if(req.session.User.admin){
					res.redirect('/user');
					return;
				}

				res.redirect('/user/show/'+ user.id);
			});
		});

	}
};

