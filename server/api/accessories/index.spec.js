'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var accessoriesCtrlStub = {
  index: 'accessoriesCtrl.index',
  show: 'accessoriesCtrl.show',
  create: 'accessoriesCtrl.create',
  upsert: 'accessoriesCtrl.upsert',
  patch: 'accessoriesCtrl.patch',
  destroy: 'accessoriesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var accessoriesIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './accessories.controller': accessoriesCtrlStub
});

describe('Accessories API Router:', function() {
  it('should return an express router instance', function() {
    expect(accessoriesIndex).to.equal(routerStub);
  });

  describe('GET /api/accessoriess', function() {
    it('should route to accessories.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'accessoriesCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/accessoriess/:id', function() {
    it('should route to accessories.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'accessoriesCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/accessoriess', function() {
    it('should route to accessories.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'accessoriesCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/accessoriess/:id', function() {
    it('should route to accessories.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'accessoriesCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/accessoriess/:id', function() {
    it('should route to accessories.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'accessoriesCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/accessoriess/:id', function() {
    it('should route to accessories.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'accessoriesCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
