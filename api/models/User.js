/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  	schema: true,

  attributes: {
  	name: {
  		type: 'string',
  		required: true
  	},

  	title: {
  		type: 'string'
	},

	email: {
	  	type: 'string',
	  	email: true,
	  	required: true,
	  	unique: true
  },

  encryptedPassword: {
  		type: 'string'
  	},

  online: {
      type: 'boolean',
      defaultsTo: false
    },

  admin: {
      type: 'boolean',
      defaultsTo: false
    } 

  },

  // beforeValidation: function (values, next) {
  //   if (typeof session.user.admin !== 'undefined') {
  //     if (values.box === 'unchecked') {
  //       values.administrator = 'false';
  //     } else  if (values.box[1] === 'on') {
  //       values.administrator = 'true';
  //     }
  //   }
  //    next();
  // },

  beforeCreate: function(values, next){
  		if(!values.password || values.password != values.password_confirm){
  			return next({err: ['Password does \'t match password confirm.']});
  		}

  		require('bcryptjs').hash(values.password, 10, function passwordEncrypted(err, encryptPassword){
  			if(err) return next(err);

  			values.encryptedPassword = encryptPassword;
  			next();
  	});
  }
  
};

