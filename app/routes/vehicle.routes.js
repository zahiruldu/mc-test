const controller = require('../controllers/vehicle.controller');

module.exports = app => {
    app.prefix('/vehicles', (vehicle) => {
        vehicle.route('/').get(controller.getHome);
        vehicle.route('/:modelYear/:manufacturer/:model').get(controller.getVehicle);
        vehicle.route('/').post(controller.getVehicle);
    });
};