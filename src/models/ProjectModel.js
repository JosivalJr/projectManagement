const { Model, DataTypes } = require('sequelize');

class Project extends Model {
  static init(sequelize) {
    super.init({
        title: DataTypes.STRING,
        zip_code: DataTypes.INTEGER,
        deadline: DataTypes.DATE,
        cost: DataTypes.INTEGER,
        username: DataTypes.STRING,
        done: DataTypes.BOOLEAN,
    }, {
      sequelize
    })
  }
}

module.exports = Project;