/**
 * Express configuration
 */

'use strict';

import express from 'express';
import config from './environment';
import path from 'path';


export default function(app) {
  app.set('appPath', path.join(config.root, 'client'));
  //app.use(express.static(app.get('appPath')));
}


