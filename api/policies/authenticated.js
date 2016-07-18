module.exports = function(req, res, ok){
	if(req.session.authenticated){
		return ok();
	}
	else {
		var message = [{name: 'requiredLogin', message: 'You must be signed in.'}]
		req.session.flash = {
			err: message
		}
		res.redirect('/session/new');
		return;
	}
}