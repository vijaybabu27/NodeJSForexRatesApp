var createError = require('http-errors');
var express = require('express');
const hbs = require('hbs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const forexapi = require('./getForex');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index.hbs', {
      pageTitle: 'Forex Rates'
  })
});

app.get('/about.html', (req, res) => {
  res.render('about.hbs', {
      pageTitle: 'About'
  })
});

app.post('/getForex.html', (req, res) => {
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

app.listen(3000, () => {
  console.log('Server running at port # 3000.....');
})