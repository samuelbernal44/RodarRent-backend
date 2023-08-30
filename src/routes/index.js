const { Router } = require('express');

const createCustomer = require('../controllers/createCustomer');
const getAllCustomers = require('../controllers/getAllCustomers');
const { createPay } = require('../controllers/createPay');
const { getAllPayments } = require('../controllers/getAllPayments');

const router = Router();

router.get('/hc', (req, res) => {
  // healthcheck
  res.status(200).send('Server up');
});

router.post('/customers', createCustomer);
router.get('/customers', getAllCustomers);
router.post('/payments', createPay);
router.get('/payments', getAllPayments);

module.exports = router;
