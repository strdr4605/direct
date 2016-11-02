const router = require('express').Router(),
      TakenOrder = require('../models/takenOrder')

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
