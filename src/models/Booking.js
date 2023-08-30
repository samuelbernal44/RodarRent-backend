const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'Booking',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      finishDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      pickUpLocationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      returnLocationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
};
//
// Booking.belongsTo(Location, { as: 'pickUpLocation', foreignKey: 'pickUpLocationId' });
// Booking.belongsTo(Location, { as: 'returnLocation', foreignKey: 'returnLocationId' });
