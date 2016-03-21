var config = require(__dirname+'/../../config/environment.js');

/**
* @requires Config
*
* Add a new currency code to the Gateway's ripple.txt file,
* broadcasting to the entire network your intention to accept
* and process the currency code specified.
*
* @param {string} currency The currency code to be supported by the Gateway.
* @returns [{Currencies}]
*/


function addCurrency(currency, amount, fn){
  var currencies = config.get('CURRENCIES') || {};
  var amount = amount || 0;
  if (!(currency in currencies)) {
//    currencies[currency] = amount; //fails silently!
    currencies.push(currency);
  }
  config.set('CURRENCIES', currencies);
  config.save(function(){
    fn(null, currencies);
  });
}

module.exports = addCurrency;

