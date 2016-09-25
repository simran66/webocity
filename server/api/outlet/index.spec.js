'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var outletCtrlStub = {
  index: 'outletCtrl.index',
  show: 'outletCtrl.show',
  create: 'outletCtrl.create',
  upsert: 'outletCtrl.upsert',
  patch: 'outletCtrl.patch',
  destroy: 'outletCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var outletIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './outlet.controller': outletCtrlStub
});

describe('Outlet API Router:', function() {
  it('should return an express router instance', function() {
    expect(outletIndex).to.equal(routerStub);
  });

  describe('GET /api/outlets', function() {
    it('should route to outlet.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'outletCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/outlets/:id', function() {
    it('should route to outlet.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'outletCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/outlets', function() {
    it('should route to outlet.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'outletCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/outlets/:id', function() {
    it('should route to outlet.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'outletCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/outlets/:id', function() {
    it('should route to outlet.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'outletCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/outlets/:id', function() {
    it('should route to outlet.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'outletCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
