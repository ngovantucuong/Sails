module.exports = function(req, res, next){
	if(req.session.User && req.session.User.admin){
		return next();
	}
	else {
		var message = [{name: 'requiredAdminError', message: 'You must be an admin signin.'}]
		req.session.flash = {
			err: message
		}
		res.redirect('/session/new');
		return;
	}
}