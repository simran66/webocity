'use strict';

var app = require('../..');
import request from 'supertest';

var newOutlet;

describe('Outlet API:', function() {
  describe('GET /api/outlets', function() {
    var outlets;

    beforeEach(function(done) {
      request(app)
        .get('/api/outlets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          outlets = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(outlets).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/outlets', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/outlets')
        .send({
          name: 'New Outlet',
          info: 'This is the brand new outlet!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newOutlet = res.body;
          done();
        });
    });

    it('should respond with the newly created outlet', function() {
      expect(newOutlet.name).to.equal('New Outlet');
      expect(newOutlet.info).to.equal('This is the brand new outlet!!!');
    });
  });

  describe('GET /api/outlets/:id', function() {
    var outlet;

    beforeEach(function(done) {
      request(app)
        .get(`/api/outlets/${newOutlet._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          outlet = res.body;
          done();
        });
    });

    afterEach(function() {
      outlet = {};
    });

    it('should respond with the requested outlet', function() {
      expect(outlet.name).to.equal('New Outlet');
      expect(outlet.info).to.equal('This is the brand new outlet!!!');
    });
  });

  describe('PUT /api/outlets/:id', function() {
    var updatedOutlet;

    beforeEach(function(done) {
      request(app)
        .put(`/api/outlets/${newOutlet._id}`)
        .send({
          name: 'Updated Outlet',
          info: 'This is the updated outlet!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedOutlet = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOutlet = {};
    });

    it('should respond with the original outlet', function() {
      expect(updatedOutlet.name).to.equal('New Outlet');
      expect(updatedOutlet.info).to.equal('This is the brand new outlet!!!');
    });

    it('should respond with the updated outlet on a subsequent GET', function(done) {
      request(app)
        .get(`/api/outlets/${newOutlet._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let outlet = res.body;

          expect(outlet.name).to.equal('Updated Outlet');
          expect(outlet.info).to.equal('This is the updated outlet!!!');

          done();
        });
    });
  });

  describe('PATCH /api/outlets/:id', function() {
    var patchedOutlet;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/outlets/${newOutlet._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Outlet' },
          { op: 'replace', path: '/info', value: 'This is the patched outlet!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedOutlet = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedOutlet = {};
    });

    it('should respond with the patched outlet', function() {
      expect(patchedOutlet.name).to.equal('Patched Outlet');
      expect(patchedOutlet.info).to.equal('This is the patched outlet!!!');
    });
  });

  describe('DELETE /api/outlets/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/outlets/${newOutlet._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when outlet does not exist', function(done) {
      request(app)
        .delete(`/api/outlets/${newOutlet._id}`)
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
