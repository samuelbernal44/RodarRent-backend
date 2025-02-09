const getReviewsByOrderHandler = require('../../handlers/review/getReviewsByOrderHandler');

async function getReviewsByOrder(req, res) {
  const { order } = req.query;
  try {
    const result = await getReviewsByOrderHandler(order);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error al obtener las reviews' });
  }
}

module.exports = getReviewsByOrder;
