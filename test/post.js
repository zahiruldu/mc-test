process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaihttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaihttp);

describe('Post Methods', () => {

    describe('/vehicles POST Method response', () => {
        it('It will send car information as post & return result', (done) => {
            let car = {
                modelYear: '2015',
                manufacturer: 'Audi',
                model: 'A3'
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
                    res.body.Count.should.eql(4);
                    done();
                });
        });
    });

    describe('/vehicles POST Method response Rating', () => {
        it('It will send car information as post & return result with rating', (done) => {
            let car = {
                modelYear: '2015',
                manufacturer: 'Audi',
                model: 'A3',
                withRating: 'true'
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
                    res.body.Results[0].should.have.property('CrashRating');
                    done();
                });
        });
    });

    describe('/vehicles POST Method response Rating', () => {
        it('It will send car information as post & return result without rating', (done) => {
            let car = {
                modelYear: '2015',
                manufacturer: 'Audi',
                model: 'A3',
                withRating: 'false'
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
                    res.body.Results[0].should.not.have.property('CrashRating');
                    done();
                });
        });
    });


    describe('/vehicles POST Method response Rating banana query', () => {
        it('It will send car information as post & return result without rating as banana', (done) => {
            let car = {
                modelYear: '2015',
                manufacturer: 'Audi',
                model: 'A3',
                withRating: 'banana'
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
                    res.body.Results[0].should.not.have.property('CrashRating');
                    done();
                });
        });
    });
});