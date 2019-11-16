//const Users = require('../users/user-model')
//const { validateUser } = require('../users/users-helpers') // the sole existence of this helper file is to check whether the user is logged in or not. It is a middleware that can check the for pass and user lengths

function validateUser(user){
    let errors = []
        if( user.username && user.username.length <2){
        errors.push('Please include a username that is at least two characters long')
        }
        if(user.password && user.password.length < 2){
        errors.push('Please inlcude a password that is at least four characters long')
        }
        return {
            isSuccessful: errors.length>0?false: true, errors
        }
        
    }