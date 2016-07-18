/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function (req, res) {
		// res.locals.flash = _.clone(req.session.flash);
		res.view();
		// req.session.flash = {};
	},

	create: function (req, res, next) {
		User.create(req.params.all(), function userCreated (err, user){
			if(err) {
				console.log(err);
				req.session.flash = {
					err: err
				}
				return res.redirect('/user/new');
			}

			// res.json(user);
			// req.session.flash = {};
			res.redirect('/user/show/'+ user.id);
		});
	},

	show: function(req, res, next){
		User.findOne(req.param('id'), function findUser(err, user){
			if(err) return next(err);

			if(!user) return next();
			res.view({
				user: user
			});
		});
	},

	index: function(req, res, next){

		console.log(new Date());
		console.log(req.session.authenticated);

		User.find(function findAllUser(err, users){
			if(err) return next(err);

			res.view({
				users: users
			});
		});
	},

	edit: function(req, res, next){
		User.findOne(req.param('id'), function EditUser(err, user){
			if(err) return next(err);
			if(!user) return next();

			res.view({
				user: user
			});
		});
	},


	update: function(req, res, next){
		
		var ad = false;

		if(req.param('administrator') === 'true'){
			ad = true;
		}
		else {
			ad = false;
		}
		
	      var userObj = {
	        name: req.param('name'),
	        title: req.param('title'),
	        email: req.param('email'),
	        admin: ad
	      }
   		console.log(ad);

		User.update(req.param('id'), userObj, function updateUser(err){
			if(err){
				return next(err);
			}

			res.redirect('/user/show/'+ req.param('id'));
		});
	},

	destroy: function(req, res, next){
		User.findOne(req.param('id'), function findUser(err, user){
			if(err) return next(err);
			if(!user) return next('User dont exit');

			User.destroy(req.param('id'), function DestroyUser(err){
				if(err) return next(err);
			});
			res.redirect('/user');
		});
	}
};

