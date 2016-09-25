'use strict';

var app = require('../..');
import request from 'supertest';

var newBike;

describe('Bike API:', function() {
  describe('GET /api/bikes', function() {
    var bikes;

    beforeEach(function(done) {
      request(app)
        .get('/api/bikes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          bikes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(bikes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/bikes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bikes')
        .send({
          name: 'New Bike',
          info: 'This is the brand new bike!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newBike = res.body;
          done();
        });
    });

    it('should respond with the newly created bike', function() {
      expect(newBike.name).to.equal('New Bike');
      expect(newBike.info).to.equal('This is the brand new bike!!!');
    });
  });

  describe('GET /api/bikes/:id', function() {
    var bike;

    beforeEach(function(done) {
      request(app)
        .get(`/api/bikes/${newBike._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          bike = res.body;
          done();
        });
    });

    afterEach(function() {
      bike = {};
    });

    it('should respond with the requested bike', function() {
      expect(bike.name).to.equal('New Bike');
      expect(bike.info).to.equal('This is the brand new bike!!!');
    });
  });

  describe('PUT /api/bikes/:id', function() {
    var updatedBike;

    beforeEach(function(done) {
      request(app)
        .put(`/api/bikes/${newBike._id}`)
        .send({
          name: 'Updated Bike',
          info: 'This is the updated bike!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedBike = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBike = {};
    });

    it('should respond with the original bike', function() {
      expect(updatedBike.name).to.equal('New Bike');
      expect(updatedBike.info).to.equal('This is the brand new bike!!!');
    });

    it('should respond with the updated bike on a subsequent GET', function(done) {
      request(app)
        .get(`/api/bikes/${newBike._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let bike = res.body;

          expect(bike.name).to.equal('Updated Bike');
          expect(bike.info).to.equal('This is the updated bike!!!');

          done();
        });
    });
  });

  describe('PATCH /api/bikes/:id', function() {
    var patchedBike;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/bikes/${newBike._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Bike' },
          { op: 'replace', path: '/info', value: 'This is the patched bike!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedBike = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedBike = {};
    });

    it('should respond with the patched bike', function() {
      expect(patchedBike.name).to.equal('Patched Bike');
      expect(patchedBike.info).to.equal('This is the patched bike!!!');
    });
  });

  describe('DELETE /api/bikes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/bikes/${newBike._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bike does not exist', function(done) {
      request(app)
        .delete(`/api/bikes/${newBike._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
