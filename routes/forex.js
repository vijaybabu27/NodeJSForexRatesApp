var express = require('express');
var router = express.Router();

var forexapi = require('../getForex');

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  var input = req.body;
  setTimeout(function() {
    forexapi.getForexRates(input.baseSymbol, input.toSymbol, (errorMessage, results) => {
      if (errorMessage) {
          res.render('error.hbs', errorMessage);
      } else {
        res.render('results.hbs', {
          pageTitle: 'Forex Rates',
          baseCur: results.baseCur,
          rates: results.rates,
          toCur: results.toCur
        });
        console.log(`It's currently 1 ${results.baseCur} is equal to ${results.rates} ${results.toCur}`);
      }
    });
  }, 1000);
});

module.exports = router;
