const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "2tk43xh8x8pm3gks",
  publicKey: "djtp6gszbx894hkz",
  privateKey: "24ac159091307e08ba16d9ef24225b99"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err){
            res.json(500).send(err)
        }else{
            res.send(response)
        }
      });
}

exports.processPayment = (req, res) => {
    const nonceFromTheClient = req.body.paymentMethodNonce;
    const amountFromTheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        if(err){
            res.status(500).json(err)
        }else{
            res.json(result)
        }
      });
}