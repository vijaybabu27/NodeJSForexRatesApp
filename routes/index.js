var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.hbs', {
    pageTitle: 'Forex Rates'
  })
});

router.get('/about', (req, res) => {
  res.render('about.hbs', {
      pageTitle: 'About'
  })
});

module.exports = router;
