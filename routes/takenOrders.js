const router = require('express').Router(),
      TakenOrder = require('../models/takenOrder')
      Order = require('../models/order'),
      gcm = require('node-gcm'),
      config = require('../config')

// GCM Push Notification

var sender = new gcm.Sender(config.gcmApiKey)
var message = new gcm.Message()
var regTokens = []
// Start GET

router.get('/', (req, res) => {
  res.send({message:'TakenOrder'})
})

router.get('/getAllTakenOrders', (req, res) => {
  TakenOrder.find({}, (err, doc) => {
    if (err) {
      res.json(err)
    } else {
      res.json(doc)
    }
  })
})

// End GET

// Start POST

router.post('/newTakenOrder', (req, res) => {
  let takenOrder = req.body
  let newTakenOrder = TakenOrder(takenOrder)

  newTakenOrder.save((err, doc) => {
    if (err) {
      res.json(err)
    } else {
      Order.update(
        { _id: takenOrder.orderId },
        { $set: {taken: true} },
        (err, numAffected) => {
          if (err) res.json(err)
          console.log(numAffected)
      })
      Order.find(
        { _id: takenOrder.orderId },
        (err, doc) => {
          if (err) {
            res.json(err)
          } else {
            regTokens.push(doc[0].clientDeviceToken)
            message.addNotification('title', `Your Order was taken. Driver time to arrive ${takenOrder.timeToArrive}`)
            sender.send(message, { registrationTokens: regTokens }, function (err, response) {
                if (err) res.json(err)
                else {
                  res.send(response)
                }
            })
            message = new gcm.Message()
            regTokens = []
          }
        }
      )
      res.send({message: 'TakenOrder created'})
    }
  })
})

router.post('/finish', (req, res) => {
  let finishTakenOrder = req.body
  TakenOrder.update(
    { _id: finishTakenOrder.takenOrderId },
    { $set: {finishedAt: Date.now()}},
    (err, numAffected) => {
      if (err) res.send(err)
    })
    res.send({message: `TakenOrder ${finishTakenOrder.takenOrderId} finished`})
})

router.post('/arrived', (req, res) => {
  let arrivedTakenOrder = req.body
  Order.find(
    { _id: arrivedTakenOrder.orderId },
    (err, doc) => {
      if (err) {
        res.json(err)
      } else {
        regTokens.push(doc[0].toObject().clientDeviceToken)
        message.addNotification('title', 'Driver arrived')
        sender.send(message, { registrationTokens: regTokens }, function (err, response) {
            if (err) res.json(err);
            else console.log(response);
        })
        message = new gcm.Message()
        regTokens = []
      }
    }
  )
})

// End POST

// Start DELETE

router.delete('/deleteAll', (req, res) => {
  TakenOrder.remove({}, (err, doc) => {
    console.log(doc);
  });
  res.json({success: true})
})

// End DELETE

module.exports = router
