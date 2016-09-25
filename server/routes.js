/**
 * Main application routes
 */

'use strict';

//import errors from './components/errors';
import path from 'path';

export default function(app) {
  console.log("in routes file server")
    // Insert routes below
  app.use('/api/outlets', require('./api/outlet'));
  app.use('/api/bikes', require('./api/bike'));
  app.use('/api/accessoriess', require('./api/accessories'));




  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
     res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
