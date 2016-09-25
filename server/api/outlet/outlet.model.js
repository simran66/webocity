'use strict';

import mongoose from 'mongoose';

var OutletSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Outlet', OutletSchema);
