const mongoose = require('mongoose'),
      Schema = mongoose.Schema

let ClientSchema = new Schema({
  phoneNumber: String,
  rating: {
    type: [{
      driverIDNP: {
       type: String,
       unique: true
      },
      mark: Number
    }],
    default: []
  },
  orders: {
  type: [{
    type: Schema.Types.ObjectId,
    unique: true,
    dropDups: true
  }],
  default: []
  }
}, {
  collection: 'clients'
})

let Client = mongoose.model('Client', ClientSchema)

module.exports = Client
