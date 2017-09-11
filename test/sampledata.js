process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaihttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaihttp);

describe('Crash Testing', () => {

    describe('/Crash testing with missing data value', () => {
        it('It should return Count: 0 and Results: [] as ModelYear is not provided', (done) => {
            let car = {
                manufacturer: 'Honda',
                model: 'Accord'
            };

            chai.request(server)
                .post('/vehicles')
                .send(car)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Count');
                    res.body.should.have.property('Results');
                    res.body.should.not.have.property('Message');
                    res.body.Results.should.be.a('array');
                    res.body.Results.length.should.be.eql(0);
                    res.body.Count.should.eql(0);
                    done();
                });
        });
    });


    describe('/Crash testing with undefined value', () => {
        it('It should return Count: 0 and Results: [] because ModelYear is provided as undefined ', (done) => {
            chai.request(server)
                .get('/vehicles/undefined/Audi/A3')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Count');
                    res.body.should.have.property('Results');
                    res.body.should.not.have.property('Message');
                    res.body.Results.should.be.a('array');
                    res.body.Results.length.should.be.eql(0);
                    res.body.Count.should.eql(0);
                    done();
                });
        });
    });

});