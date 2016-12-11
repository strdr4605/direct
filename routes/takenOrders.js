const router = require('express').Router(),
      TakenOrder = require('../models/takenOrder')
      Order = require('../models/order')

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
      res.send(err)
    } else {
      Order.update(
        { _id: takenOrder.orderId },
        { $set: {taken: true} },
        (err, numAffected) => {
          if (err) throw err
          console.log(numAffected)
      })
      res.send({message: 'TakenOrder created'})
    }
  })

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
