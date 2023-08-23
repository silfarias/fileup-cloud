const { DataTypes, sequelize } = require('../dbConfig');

const Archivo = sequelize.define('archivos', {
  id: { type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true },
  url: { type: DataTypes.STRING, allowNull: false },
  //nombre: { type: DataTypes.STRING, allowNull: false },
  //descripcion: { type: DataTypes.STRING }
},  { timestamps: true, tableName: 'archivos' });

module.exports = Archivo