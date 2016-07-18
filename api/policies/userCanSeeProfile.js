module.exports = function(req, res, next){
	var sessionUserMatchesId = req.session.User.id === req.param('id');
	var isAdmin = req.session.User.admin;

	if(!(sessionUserMatchesId || isAdmin)){
		var mess = [{name: 'noRights', message: 'You must be an admin.'}]
		req.session.flash = {
			err: mess
		}
		res.redirect('/session/new');
		return;
	}
	next();
}