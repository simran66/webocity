'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bikeCtrlStub = {
  index: 'bikeCtrl.index',
  show: 'bikeCtrl.show',
  create: 'bikeCtrl.create',
  upsert: 'bikeCtrl.upsert',
  patch: 'bikeCtrl.patch',
  destroy: 'bikeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bikeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './bike.controller': bikeCtrlStub
});

describe('Bike API Router:', function() {
  it('should return an express router instance', function() {
    expect(bikeIndex).to.equal(routerStub);
  });

  describe('GET /api/bikes', function() {
    it('should route to bike.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'bikeCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/bikes/:id', function() {
    it('should route to bike.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'bikeCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/bikes', function() {
    it('should route to bike.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'bikeCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/bikes/:id', function() {
    it('should route to bike.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'bikeCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/bikes/:id', function() {
    it('should route to bike.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'bikeCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/bikes/:id', function() {
    it('should route to bike.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'bikeCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
