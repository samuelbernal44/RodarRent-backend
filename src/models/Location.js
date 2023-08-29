const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Location', {

   id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
   }, 
   address: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   city: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   country: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
   }
  }, {
    timestamps: false
  }
);
}


