'use strict';

var app = require('../..');
import request from 'supertest';

var newAccessories;

describe('Accessories API:', function() {
  describe('GET /api/accessoriess', function() {
    var accessoriess;

    beforeEach(function(done) {
      request(app)
        .get('/api/accessoriess')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          accessoriess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(accessoriess).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/accessoriess', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/accessoriess')
        .send({
          name: 'New Accessories',
          info: 'This is the brand new accessories!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newAccessories = res.body;
          done();
        });
    });

    it('should respond with the newly created accessories', function() {
      expect(newAccessories.name).to.equal('New Accessories');
      expect(newAccessories.info).to.equal('This is the brand new accessories!!!');
    });
  });

  describe('GET /api/accessoriess/:id', function() {
    var accessories;

    beforeEach(function(done) {
      request(app)
        .get(`/api/accessoriess/${newAccessories._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          accessories = res.body;
          done();
        });
    });

    afterEach(function() {
      accessories = {};
    });

    it('should respond with the requested accessories', function() {
      expect(accessories.name).to.equal('New Accessories');
      expect(accessories.info).to.equal('This is the brand new accessories!!!');
    });
  });

  describe('PUT /api/accessoriess/:id', function() {
    var updatedAccessories;

    beforeEach(function(done) {
      request(app)
        .put(`/api/accessoriess/${newAccessories._id}`)
        .send({
          name: 'Updated Accessories',
          info: 'This is the updated accessories!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedAccessories = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedAccessories = {};
    });

    it('should respond with the original accessories', function() {
      expect(updatedAccessories.name).to.equal('New Accessories');
      expect(updatedAccessories.info).to.equal('This is the brand new accessories!!!');
    });

    it('should respond with the updated accessories on a subsequent GET', function(done) {
      request(app)
        .get(`/api/accessoriess/${newAccessories._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let accessories = res.body;

          expect(accessories.name).to.equal('Updated Accessories');
          expect(accessories.info).to.equal('This is the updated accessories!!!');

          done();
        });
    });
  });

  describe('PATCH /api/accessoriess/:id', function() {
    var patchedAccessories;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/accessoriess/${newAccessories._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Accessories' },
          { op: 'replace', path: '/info', value: 'This is the patched accessories!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedAccessories = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedAccessories = {};
    });

    it('should respond with the patched accessories', function() {
      expect(patchedAccessories.name).to.equal('Patched Accessories');
      expect(patchedAccessories.info).to.equal('This is the patched accessories!!!');
    });
  });

  describe('DELETE /api/accessoriess/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/accessoriess/${newAccessories._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when accessories does not exist', function(done) {
      request(app)
        .delete(`/api/accessoriess/${newAccessories._id}`)
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
