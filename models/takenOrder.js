const mongoose = require('mongoose'),
      Schema = mongoose.Schema

let takenOrderSchema = new Schema({
  orderId: {
   type: Schema.Types.ObjectId,
   required: true,
  },
  driveId: {
   type: Schema.Types.ObjectId,
   required: true,
  },
  timeToArrive: Number,
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
