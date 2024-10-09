const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

const Curso = connection.define("curso", {
  id_curso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nome_curso: {
    type: DataTypes.STRING(100), 
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT, 
    allowNull: true,
  },
  carga_horaria: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
  },
}, {
  timestamps: false,
  tableName: "curso",
});

module.exports = Curso;
