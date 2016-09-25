/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/outlets              ->  index
 * POST    /api/outlets              ->  create
 * GET     /api/outlets/:id          ->  show
 * PUT     /api/outlets/:id          ->  upsert
 * PATCH   /api/outlets/:id          ->  patch
 * DELETE  /api/outlets/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Outlet from './outlet.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Outlets
export function index(req, res) {
  return Outlet.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Outlet from the DB
export function show(req, res) {
  return Outlet.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Outlet in the DB
export function create(req, res) {
  return Outlet.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Outlet in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Outlet.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Outlet in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Outlet.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Outlet from the DB
export function destroy(req, res) {
  return Outlet.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
