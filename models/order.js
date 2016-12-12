const mongoose = require('mongoose'),
      Schema = mongoose.Schema

let OrderSchema = new Schema({
  clientPhoneNumber: {
   type: String,
   required: true,
  },
  start: {
    district: String,
    address: String,
    latitude: Number,
    longitude: Number
  },
  end: {
    district: String,
    address: String,
    latitude: Number,
    longitude: Number
  },
  taken: {
    type: Boolean,
    default: false
  },
  cost: Number,
  clientDeviceToken: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'orders'
})

let Order = mongoose.model('Order', OrderSchema)

module.exports = Order
