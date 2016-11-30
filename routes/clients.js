const router = require('express').Router(),
      Client = require('../models/client')

// Start GET

router.get('/', (req, res) => {
  res.send({message:'Client'})
})

router.get('/getAllClients', (req, res) => {
  Client.find({}, (err, doc) => {
    if (err) {
      res.json(err)
    } else {
      res.json(doc)
    }
  })
})

// End GET

// Start POST

router.post('/newClient', (req, res) => {
  let client = req.body

  let newClient = Client(client)

  newClient.save((err) => {
    if (err) throw err
    console.log('Client created')
    res.send({message: 'Client created'})
  })

})

router.post('/login', (req, res) => {
  let clientLogin = req.body
  Client.findOne({phoneNumber: clientLogin.phoneNumber}, (err, doc) => {
      if (doc) {
        res.send(doc)
      }
      else res.send({value: false})
  })
})

router.post('/rate', (req, res) => {
  let newRating = req.body
  Client.findOne({phoneNumber: newRating.clientPhoneNumber}, (err, doc) => {
      if (doc) {
        Client.update(
          {phoneNumber: newRating.clientPhoneNumber},
          { $addToSet: { rating: { driverIDNP: newRating.driverIDNP, mark: newRating.mark} } },
          (err, numAffected) => {
            if (err) throw err
            console.log(numAffected)
            res.send({value: true})
          })
      }
      else res.send({value: false})
  })
})

// End POST

// Start DELETE

router.delete('/deleteAll', (req, res) => {
  Client.remove({}, (err, doc) => {
    console.log(doc);
  });
  res.json({success: true})
})

// End DELETE

module.exports = router
