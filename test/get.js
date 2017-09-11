process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaihttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaihttp);

describe('/GET Methods', () => {

    describe('/vehicles Get Method response', () => {
        it('It will send car information as get & return result', (done) => {
            chai.request(server)
                .get('/vehicles/2015/Audi/A3')
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


    describe('/vehicles Get Method response with Rating information', () => {
        it('Getting car information with crash Rating', (done) => {
            chai.request(server)
                .get('/vehicles/2015/Audi/A3')
                .query({ withRating: 'true' })
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

    describe('/vehicles Get Method response without Rating information', () => {
        it('Getting car information without crash Rating', (done) => {
            chai.request(server)
                .get('/vehicles/2015/Audi/A3')
                .query({ withRating: 'false' })
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

    describe('/vehicles Get Method response with rating as banana query information', () => {
        it('Getting car information without crash Rating for banana query', (done) => {
            chai.request(server)
                .get('/vehicles/2015/Audi/A3')
                .query({ withRating: 'banana' })
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