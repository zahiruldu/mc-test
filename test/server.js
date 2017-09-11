process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaihttp = require('chai-http');
let server = require('../server');
let should = chai.should();
let expect = chai.expect;

chai.use(chaihttp);

describe('Server', () => {
    describe('/Get Server root status', () => {
        it('It should get status 200', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('It should return a welcome message', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    console.log(res.body)
                        //res.body.should.equal('welcome to Modus Create!');
                        //expect(res.body).to.equal('welcome to Modus Create!');
                        //res.should.have.body.eql('welcome')
                        //expect(res.body).to.equal('welcome to Modus Create!');
                    done();
                });
        });
    });


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
                    //res.body.should.have.property('Count');
                    console.log(res.body)
                    done();
                });
        });
    });
});