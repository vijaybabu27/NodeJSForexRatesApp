const request = require('request');

var getForexRates = (baseCur, toCur, callback) => {
    
    request({
        url: `https://api.exchangeratesapi.io/latest?base=${baseCur}&symbols=${toCur}`,
        json: true
    }, (error, response, body) => {
        console.log(response.statusCode);
        console.log(body.status);
        if (response.statusCode === 403) {
            callback(JSON.parse('{"error": "Unable to connect to exchange rates API server."}'), null);
        } else if (response.statusCode === 400) {
            callback('Unable to fetch forex rates.', null);
        } else if (response.statusCode === 200) {
            console.log('Inside 200 = ' + JSON.stringify(body));
            callback(undefined, {
                baseCur: baseCur,
                toCur: toCur,
                rates: body.rates[toCur]
            });
        }
    });

};

module.exports.getForexRates = getForexRates;