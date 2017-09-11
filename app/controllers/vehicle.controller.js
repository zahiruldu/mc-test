const fetch = require('node-fetch');

exports.getHome = (req, res) => {
    res.send('write year, manufacture and model number');
};

exports.getVehicle = (req, res) => {
    var modelYear = req.params.modelYear || req.body.modelYear;
    var manufacturer = req.params.manufacturer || req.body.manufacturer;
    var model = req.params.model || req.body.model;
    var isRatingQueried = req.query.withRating || req.body.withRating;

    const firstUrl = (mY, mF, m) => 'https://one.nhtsa.gov/webapi/api/SafetyRatings/modelyear/' + mY + '/make/' + mF + '/model/' + m + '?format=json';
    const RatingUrl = vId => 'https://one.nhtsa.gov/webapi/api/SafetyRatings/VehicleId/' + vId + '?format=json';

    fetch(firstUrl(modelYear, manufacturer, model))
        .then(function(result) {
            return result.json();
        }).then(function(body) {
            if (body.Results.length > 0) {
                if (isRatingQueried == undefined || isRatingQueried === 'false') {
                    delete body.Message;
                    res.send(body);
                } else {
                    // Making rating map with promises
                    let ratingPromises = body.Results.map((vehicle, indx) => {
                        return new Promise((resolve, reject) => {
                            // Query for rating
                            fetch(RatingUrl(vehicle.VehicleId))
                                .then(function(result) {
                                    return result.json();
                                })
                                .then(function(body) {
                                    vehicle.CrashRating = body.Results[0].OverallRating;
                                    resolve(vehicle);
                                })
                                .catch(function(error) {
                                    reject(error);
                                });
                        });
                    });
                    // working with all promises;
                    Promise.all(ratingPromises).then(values => {
                        body.Results = values;
                        delete body.Message;
                        res.send(body);
                    });
                }

            } else {
                console.log('outside loop')
                delete body.Message;
                res.send(body);
            }
        }).catch(function(error) {
            console.log(error);
            res.send(error);
        });
};


module.exports = exports;