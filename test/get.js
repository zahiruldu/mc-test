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
                    console.log(res.body)
                    done();
                });
        });

    });


    describe('/vehicles Get Method response with Rating information', () => {
        it('Getting car information with crash Rating', (done) => {
            chai.request(server)
                .get('/vehicles/2015/Audi/A3?withRating=true')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Count');
                    res.body.should.have.property('Results');
                    res.body.should.not.have.property('Message');
                    // res.body.should.have.property('CrashRating');
                    res.body.Results.should.be.a('array');
                    //res.body.Count.should.eql(4);
                    console.log(res.body)
                    done();
                });
        });
    });

    describe('/vehicles Get Method response without Rating information', () => {
        it('Getting car information without crash Rating', (done) => {
            chai.request(server)
                .get('/vehicles/2015/Audi/A3?withRating=false')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Count');
                    res.body.should.have.property('Results');
                    res.body.should.not.have.property('Message');
                    //res.body.should.not.have.property('CrashRating');
                    res.body.Results.should.be.a('array');
                    //res.body.Count.should.eql(4);
                    console.log(res.body)
                    done();
                });
        });
    });
});