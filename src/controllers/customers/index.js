const bulkCreateCustomers = require('./bulkCreateCustomers');
const createCustomer = require('./createCustomer');
const deleteCustomerById = require('./deleteCustomerById');
const getAllCustomers = require('./getAllCustomers');
const getCustomerById = require('./getCustomerById');
const getFilteredCustomers = require('./getFilteredCustomers');
const updateCustomer = require('./updateCustomer');

module.exports = {
  bulkCreateCustomers,
  createCustomer,
  deleteCustomerById,
  getAllCustomers,
  getCustomerById,
  getFilteredCustomers,
  updateCustomer
};
