/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
// acá vinculo la instancia de sequelize con la BBDD
require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const { DB_URL, DB_SSL_ENABLED, DB_SSL_REJECT_UNAUTHORIZED } = process.env;

const sequelize = new Sequelize(DB_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions: {
    ssl: {
      require: DB_SSL_ENABLED === 'true', // Control SSL requirement based on environment variable
      rejectUnauthorized: DB_SSL_REJECT_UNAUTHORIZED === 'true', // Control SSL rejection based on environment variable
    },
  },
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

// ACÁ ABAJO IMPORTAR LOS MODELS
const { Customer, Booking, Location, Pay, Vehicle, Review } = sequelize.models;

// Aca vendrian las relaciones
Pay.hasOne(Booking);
Booking.belongsTo(Pay);
Customer.hasMany(Booking);
Booking.belongsTo(Customer);
Vehicle.hasOne(Location);
Location.hasMany(Vehicle);
Booking.belongsTo(Vehicle);
Vehicle.hasMany(Booking);
Customer.hasMany(Review);
Review.belongsTo(Customer);

Booking.belongsTo(Location, {
  as: 'pickUpLocation',
  foreignKey: 'pickUpLocationId',
});
Booking.belongsTo(Location, {
  as: 'returnLocation',
  foreignKey: 'returnLocationId',
});
Location.hasMany(Booking, { foreignKey: 'pickUpLocationId' });
Location.hasMany(Booking, { foreignKey: 'returnLocationId' });

//defino método para hashear password de Customer
Customer.prototype.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
