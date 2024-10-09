const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");
const Aluno = require("./Aluno");

const Pagamentos = connection.define(
  "Pagamentos",  // Use PascalCase para os nomes dos modelos
  {
    id_pagamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    data_pagamento: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Aluno, // Referência ao modelo Aluno
        key: "id_aluno",
      },
    },
  },
  {
    sequelize: connection,
    modelName: "Pagamentos",
    tableName: "pagamentos",
    timestamps: false,
  }
);

Pagamentos.belongsTo(Aluno, { foreignKey: 'id_aluno', as: 'Aluno' });

module.exports = Pagamentos;
