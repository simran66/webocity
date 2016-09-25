/**
 * Accessories model events
 */

'use strict';

import {EventEmitter} from 'events';
import Accessories from './accessories.model';
var AccessoriesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AccessoriesEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Accessories.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AccessoriesEvents.emit(event + ':' + doc._id, doc);
    AccessoriesEvents.emit(event, doc);
  };
}

export default AccessoriesEvents;
