const router = require('express').Router(),
      Driver = require('../models/driver'),
      bcrypt = require('bcrypt'),
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

router.post('/checkPassword', (req, res) => {
  let driverLogin = req.body
  Driver.findOne({phoneNumber: driverLogin.phoneNumber}, (err, doc) => {
    console.log('hash = ' + doc.password)
    console.log('password to check = ' + driverLogin.password)
      bcrypt.compare(driverLogin.password, doc.password, (err, result) => {
      if(result) res.send({value: true})
      else res.send({value: false})
    })
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

// End POST

// Start DELETE

router.delete('/deleteAll', (req, res) => {
  Driver.remove({}, (err, doc) => {
    console.log(doc);
  });
  res.json({success: true})
})

// End DELETE

module.exports = router
