const router = require('express').Router(),
      Order = require('../models/order')
      Client = require('../models/client')

// Start GET

router.get('/', (req, res) => {
  res.send({message:'Order'})
})

router.get('/getAllOrders', (req, res) => {
  Order.find({}, (err, doc) => {
    if (err) {
      res.json(err)
    } else {
      res.json(doc)
    }
  })
})

// End GET

// Start POST

router.post('/newOrder', (req, res) => {
  let order = req.body

  let newOrder = Order(order)
  newOrder.save( function (err, doc) {
    if (err) throw err
    let orderId = doc._id
    let clientPhoneNumber = order.clientPhoneNumber
    Client.findOne({phoneNumber: clientPhoneNumber}, (err, doc) => {
      let newClient = Client({phoneNumber: clientPhoneNumber, orders: [orderId]})
      if (!doc) {
        newClient.save(function (err) {
          if (err) throw err
          console.log('Client created!')
        })
      }
      if (doc) {
        Client.update(
          {phoneNumber: clientPhoneNumber},
          { $addToSet: { orders: orderId } },
          (err, numAffected) => {
            if (err) throw err
            console.log(numAffected)
          })
      }
    })
    console.log('Order created!')
  })
  res.send({message: 'Order created'})
})

// End POST

// Start DELETE

router.delete('/deleteAll', (req, res) => {
  Order.remove({}, (err, doc) => {
    console.log(doc);
  });
  res.json({success: true})
})

// End DELETE

module.exports = router
