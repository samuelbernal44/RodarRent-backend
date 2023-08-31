const { Router } = require('express');

const postPayValidate = require('../middlewares/pay/postPayValidate');
const createCustomer = require('../controllers/createCustomer');
const bulkCreateCustomers = require('../controllers/bulkCreateCustomers');
const createVehicles = require('../controllers/vehicles/createVehicles');
const postVehiclesValidate = require('../middlewares/postVehiclesValidate');
const getAllCustomers = require('../controllers/getAllCustomers');
const postBookingValidate = require('../middlewares/postBookingValidate');
const createBooking = require('../controllers/createBooking');
const getCustomerById = require('../controllers/getCustomerById');
const updateCustomer = require('../controllers/updateCustomer');
const deleteCustomerById = require('../controllers/deleteCustomerById');
const { createPay } = require('../controllers/pay/createPay');
const { getAllPayments } = require('../controllers/pay/getAllPayments');
const createCustomerValidation = require('../middlewares/createCustomerValidation');
const getCustomerByIdValidation = require('../middlewares/getCustomerByIdValidation');
const deleteCustomerByIdValidation = require('../middlewares/deleteCustomerByIdValidation');
const { getPaymentById } = require('../controllers/pay/getPaymentById');
const { getAllBookings } = require('../controllers/getAllBookings');
const getVehicleByDomain = require('../controllers/Vehicles/getVehicleByDomain');
const getAllVehicles = require('../controllers/vehicles/getAllVehicles');
const { getAllLocations } = require('../controllers/getAllLocations');
const { createLocation } = require('../controllers/createLocation');

const router = Router();

router.get('/hc', (req, res) => {
  // healthcheck
  res.status(200).send('Server up');
});

router.post('/vehicles', postVehiclesValidate, createVehicles);
router.get('/vehicles/:domain', getVehicleByDomain);
router.get('/vehicles', getAllVehicles);
router.post('/customers/bulk', bulkCreateCustomers);
router.post('/customers', createCustomerValidation, createCustomer);
router.get('/customers', getAllCustomers);
router.get('/customers/:id', getCustomerByIdValidation, getCustomerById);
router.put('/customers', createCustomerValidation, updateCustomer);
router.delete(
  '/customers/:id',
  deleteCustomerByIdValidation,
  deleteCustomerById,
);
router.post('/payments', postPayValidate, createPay);
router.get('/payments', getAllPayments);
router.get('/payments/:id', getPaymentById);
router.get('/bookings', getAllBookings);
router.post('/bookings', postBookingValidate, createBooking);
router.get('/locations', getAllLocations);
router.post('/locations', createLocation);

module.exports = router;
