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

let rad = function(x) {
  return x * Math.PI / 180;
};

let getDistance = function(lat1, long1, lat2, long2) {
  let R = 6378137; // Earth’s mean radius in meter
  let dLat = rad(lat2 - lat1);
  let dLong = rad(long2 - long1);
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d; // returns the distance in meter
};

router.get('/getNearOrders', (req, res) => {
  let lat = req.query.lat
  let long = req.query.long
  let distance = req.query.distance

  let inRange = function(order) {
    return getDistance(lat, long, order.start.latitude, order.start.longitude) <= distance
  }

  Order.find({}, (err, doc) => {
    if (err) {
      res.json(err)
    } else {
      orders = doc
      filteredOrders = orders.filter(inRange)
      res.json(filteredOrders)
    }
  })
})

// End GET

// Start POST

router.post('/newOrder', (req, res) => {
  let order = req.body

  let newOrder = Order(order)
  newOrder.save( function (err, doc) {
    if (err) res.json(err)
    let orderId = doc._id
    let clientPhoneNumber = order.clientPhoneNumber
    Client.findOne({phoneNumber: clientPhoneNumber}, (err, doc) => {
      let newClient = Client({phoneNumber: clientPhoneNumber, orders: [orderId]})
      if (!doc) {
        newClient.save(function (err) {
          if (err) res.json(err)
          console.log('Client created!')
        })
      }
      if (doc) {
        Client.update(
          {phoneNumber: clientPhoneNumber},
          { $addToSet: { orders: orderId } },
          (err, numAffected) => {
            if (err) res.json(err)
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
