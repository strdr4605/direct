const mongoose = require('mongoose'),
      Schema = mongoose.Schema

let takenOrderSchema = new Schema({
  orderId: {
   type: Schema.Types.ObjectId,
   required: true,
   unique: true
  },
  driverId: {
   type: Schema.Types.ObjectId,
   required: true,
  },
  timeToArrive:{
    type: Number,
    required: true
  },
  finishedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'takenOrders'
})

let takenOrder = mongoose.model('takenOrder', takenOrderSchema)

module.exports = takenOrder
