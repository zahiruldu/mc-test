const fetch = require('node-fetch');

exports.getHome = (req, res) => {
    res.send('write year, manufacture and model number');
};

exports.getVehicle = (req, res) => {
    var modelYear = req.params.modelYear || req.body.modelYear;
    var manufacturer = req.params.manufacturer || req.body.manufacturer;
    var model = req.params.model || req.body.model;
    var isRatingQueried = req.query.withRating || true;
    let url = 'https://one.nhtsa.gov/webapi/api/SafetyRatings/modelyear/' + modelYear + '/make/' + manufacturer + '/model/' + model + '?format=json';

    //let url = 'https://one.nhtsa.gov/webapi/api/SafetyRatings/modelyear/2015/make/Audi/model/A3?format=json';
    //let RatingUrl = 'https://one.nhtsa.gov/webapi/api/SafetyRatings/VehicleId/<VehicleId>?format=json';
    let RatingUrl = VehicleId => 'https://one.nhtsa.gov/webapi/api/SafetyRatings/VehicleId/' + VehicleId + '?format=json';
    fetch(url)
        .then(function(result) {
            return result.json();
        }).then(function(body) {
            console.log(body);
            if (body.Results.length > 0) {

                let hello = body.Results.map((vehicle, indx) => {
                    return new Promise((resolve, reject) => {
                        //let url2 = 'https://one.nhtsa.gov/webapi/api/SafetyRatings/VehicleId/' + vehicle.VehicleId + '?format=json';
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
                Promise.all(hello).then(values => {
                    body.Results = values;
                    delete body.Message;
                    res.send(body);
                });



            } else {
                console.log('outside loop')
                res.send(body);
            }
        }).catch(function(error) {
            console.log(error);
            res.send(error);
        });
};


module.exports = exports;