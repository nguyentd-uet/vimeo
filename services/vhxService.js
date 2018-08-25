var vhx = require('vhx')('uaszBHLk343jAqN81nuw2teqAJ7pquqR');
var mailerService = require('./mailerService');

module.exports.createCustomer = function (listProducts, customerInfo) {
    if (listProducts && listProducts.length > 0) {
        listProducts.map(item => {
            vhx.customers.create({
                name: `${customerInfo.first_name} ${customerInfo.last_name}`,
                email: customerInfo.email,
                product: `https://api.vhx.tv/products/${item.productId}`,
                plan: 'standard'
            }, function(err, customer) {
                console.log(customer)
                let html;
                if (err) {
                    html = `Purchased failed ${JSON.stringify(err)}`
                } else {
                    html = `Purchase succeed ${JSON.stringify(customer)}`
                }

                sendMail(customerInfo.email, html);
            });
        })
        
    }
}