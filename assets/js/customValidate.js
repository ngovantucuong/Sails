$(document).ready(function(){

	$('#contact-form').validate({
		rules: {
			name: {
				required: true
			},
			email: {
				required: true,
				email: true
			}, 
			password: {
				minlength: 6,
				required: true
			},
			password_confirm: {
				minlength: 6,
				equalTo: "#password"
			}
		},
		success: function(label){
			label
			.text('OK!').addClass('valid')
		}
	});
});