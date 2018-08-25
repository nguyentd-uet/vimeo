var express = require('express');
var router = express.Router();
var vhxService = require('../services/vhxService');
var vhx = require('vhx')('uaszBHLk343jAqN81nuw2teqAJ7pquqR');
var mailerService = require('../services/mailerService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express index' });
});

router.post('/order-paid', function(req, res, next) {
  // let Shopify know we received the order details ok
  res.send('OK');

  // the body of the data received
  const theData = req.body;
  console.log(theData);
  let listProducts = [];
  if (theData.line_items && theData.line_items.length > 0) {
    theData.line_items.map(item => {
      listProducts.push({title: item.title, productId: item.sku});
    });
  }
  console.log(listProducts);

  // vhxService.createCustomer(listProducts, customer);

  vhx.customers.create({
      name: `Nguyen Tran`,
      email: 'nguyennd9zzz@gmail.com',
      product: `https://api.vhx.tv/products/36007`,
      plan: 'standard'
  }, function(err, customer) {
      console.log(customer)
      let html;
      if (err) {
        html = `Purchased failed ${JSON.stringify(err)}`
      } else {
          html = `Purchase succeed ${JSON.stringify(customer)}`
      }

      mailerService.sendMail('nguyennd9zzz@gmail.com', html);
      return;
  });
});

module.exports = router;
