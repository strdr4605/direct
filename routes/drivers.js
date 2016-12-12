const router = require('express').Router(),
      Driver = require('../models/driver'),
      bcrypt = require('bcryptjs'),
      SALT_WORK_FACTOR = 10

// Start GET

router.get('/', (req, res) => {
  res.send({message:'Driver'})
})

router.get('/getAllDrivers', (req, res) => {
  Driver.find({}, (err, doc) => {
    if (err) {
      res.json(err)
    } else {
      res.json(doc)
    }
  })
})

router.get('/getByIDNP/:idnp', (req, res) => {
  let idnp = req.params.idnp
  Driver.find({ IDNP: idnp}, (err, doc) => {
    if (err) {
      res.json(err)
    } else {
      res.json(doc)
    }
  })
})


// End GET

// Start POST

router.post('/newDriver', (req, res) => {
  let driver = req.body
  let newDriver = Driver(driver)
  newDriver.save((err, doc) => {
    if (err) {
      res.send(err)
    } else {
      console.log('Driver created')
      res.send({message: 'Driver created'})
      }
  })
})

router.post('/login', (req, res) => {
  let driverLogin = req.body
  Driver.findOne({IDNP: driverLogin.IDNP}, (err, doc) => {
      if (doc) {
        bcrypt.compare(driverLogin.password, doc.password, (err, result) => {
          if(result) res.send(doc)
        })
      }
      else res.send({value: false})
  })
})

router.get('/getByIDNP', (req, res) => {
  let idnp = req.query.idnp
  Driver.find({ IDNP: idnp}, (err, doc) => {
    if (err) {
      res.json(err)
    } else {
      res.json(doc)
    }
  })
})

router.post('/rate', (req, res) => {
  let newRating = req.body
  Driver.findOne({IDNP: newRating.IDNP}, (err, doc) => {
      if (doc) {
        Driver.update(
          {IDNP: newRating.IDNP},
          { $addToSet: { rating: { clientPhoneNumber: newRating.clientPhoneNumber, mark: newRating.mark} } },
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
  Driver.remove({}, (err, doc) => {
    if (err) res.json(err)
    console.log(doc);
  });
  res.json({success: true})
})

// End DELETE

module.exports = router
