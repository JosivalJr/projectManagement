const UserModel = require('./UserModel');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

class User {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    createUuid(){

        try {
            this.body.id = crypto.randomUUID();

        } catch (err) {
            this.errors.push('Fail to create an universally unique identifier.');
        }
    };

    async hashPassword(){

        try {
            const salt = await bcrypt.genSalt(12);
            this.body.password = await bcrypt.hash(this.body.password, salt);

        } catch (err) {
            this.errors.push('Fail to create an security hash password.');
        }
    };

    validate (){
        try {
            this.cleanUp();
            if(this.body.username.length < 2 || this.body.username.length >= 16) this.errors.push('Your username must be between 2 and 16 characters long.');
            if(this.body.password.length < 8 || this.body.password.length >= 20) this.errors.push('Your password must be between 8 and 20 characters long.');

            if(validateAlphanumeric(this.body.username)) this.errors.push('Your username must only contain alphanumeric characters. A-z 0-9');
            if(validateAlphanumeric(this.body.password)) this.errors.push('Your password must only contain alphanumeric characters. A-z 0-9.');

            function validateAlphanumeric(value){
                if( /[^a-zA-Z0-9]/.test(value) ) {
                    return true;
                } else {
                    return false; 
                }
            }

        } catch (err) {
            this.errors.push('Fail to validate password and username values.');
        }
    };

    cleanUp(){

        try {
            for(const key in this.body){
                if (typeof this.body[key] !== 'string'){
                    this.body[key] = ''
                }
            };
    
            this.body = {
                username: this.body.username.replace(/\s/g,''),
                password: this.body.password.replace(/\s/g,'')
            };

        } catch (err) {
            this.errors.push('Fail to try manipulated username and password values.');
        }
    };

    async validateNewUser (){
        
        try {
            const findUsername = await UserModel.findOne({
                where: {
                    username: this.body.username
                }
            });

            if(findUsername) this.errors.push('Username already exists.')

        } catch (err) {
            this.errors.push('Fail to access database our registers.');
        }
    };

    async register(){
        try {
            this.validate();
            this.validateNewUser();
    
            if(this.errors.length > 0) return;
    
            this.createUuid();
            await this.hashPassword();
            
            if(this.errors.length > 0) return;
    
            this.user = await UserModel.create(this.body);
        } catch (err){
            this.errors.push('Fail to try create a new user in our database.');
        }
    };

    async login(){
        
        this.cleanUp();
        if(this.errors.length > 0) return;

        this.user = await UserModel.findOne({
            where: {
                username: this.body.username
            }
        });

        if(!this.user) {
            this.errors.push('Username not registered.');
            return;
        }

        if(!bcrypt.compareSync(this.body.password, this.user.password)){
            this.errors.push('Invalid password.');
            this.user = null;
            return;
        }

    };
}

module.exports = User;