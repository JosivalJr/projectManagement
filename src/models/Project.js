const { userInfo } = require('os');
const ProjectModel = require('./ProjectModel');
const UserModel = require('./UserModel');
const crypto = require('crypto');

class Project {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.project = null;
    };

    createUuid(){

        try {
            this.body.id = crypto.randomUUID();

        } catch (err) {
            this.errors.push('Fail to create an universally unique identifier.');
        }
    };

    validateFields (){
        try {

            if(this.body.title.length < 2 || this.body.title.length >= 24) this.errors.push('Project title must be between 2 and 24 characters long.');
            if(this.body.zip_code.length !== 8) this.errors.push('Invalid zipcode.');

        } catch (err) {
            this.errors.push('Fail to validate project infos.');
        }
    };

    cleanUp(){

        try {
            for(const key in this.body){
                if (typeof this.body[key] !== 'string'){
                    this.body[key] = ''
                }
            };
    
            this.body.title = this.body.title.replace(/\s/g,'');
            this.body.zip_code = this.body.zip_code.replace(/\D/g, '');
            this.body.done = this.body.done === "true" ? true : false;

        } catch (err) {
            this.errors.push('Fail to try manipulated username and password values.');
        }
    };

    async validateUser (){
        
        try {
            const findUsername = await UserModel.findOne({
                where: {
                    username: this.body.username
                }
            });

            if(!findUsername) this.errors.push('User not found in our database.')

        } catch (err) {
            this.errors.push('Fail to access database our registers.');
        }
    };

    async createProject(){
        try {
            this.cleanUp();
            this.validateFields();
            this.validateUser();

            if(this.errors.length > 0) return;

            this.createUuid();
            this.project = await ProjectModel.create(this.body);
        }
        catch (err) {
            this.errors.push('Fail to create a new project in our database.');
        }
    };

    async getProject(projectId){
        try {
            const project = await ProjectModel.findOne({
                where: {
                    "id": projectId
                }
            });

            return project.dataValues;

        } catch (err) {
            this.errors.push('Fail to access registers in our database.');
        }
    };

    async findUserProjects (username){
        try {
            const projects = await ProjectModel.findAll({
                where: {
                    "username": username
                }
            });
            
            return projects;

        } catch (err) {
            this.errors.push('Fail to access registers in our database.');
        }
    };


    async editProject (){
        try {
            const { title, zip_code, deadline, cost, done } = this.body;
            const updateFields = { title, zip_code, deadline, cost, done };

            this.validateFields();
            
            ProjectModel.update( updateFields, {
                where: {
                    id: this.body.id
                }
            });

            return;

        } catch (err) {
            this.errors.push('Fail to access registers in our database.');
        }
    };

    finishProject (){
        try {

        } catch (err) {
            this.errors.push('');
        }
    };


    async deleteProject (id){

        await ProjectModel.destroy({
            where: {
              "id": id
            }
          });
    
        try{
            if(typeof id !== 'string') return;
            const contato = await Project.findOneAndDelete({id: id});
            return contato;
    
        }
        catch (err){
           
        }
    };

}

module.exports = Project;