const express = require('express'),
      app = express(),
      config = require('./config'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      orderRoutes = require('./routes/orders'),
      clientRoutes = require('./routes/clients'),
      driverRoutes = require('./routes/drivers'),
      takenOrderRoutes = require('./routes/takenOrders')

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

mongoose.connect(config.database, (err) => {
  if (err) throw err
  console.log('Successfuly connected to ' + config.database)
})
mongoose.Promise = global.Promise

app.use('/api/v1/order', orderRoutes)
app.use('/api/v1/client', clientRoutes)
app.use('/api/v1/driver', driverRoutes)
app.use('/api/v1/takenorder', takenOrderRoutes)

app.listen(config.port, () => {
  console.log('Application is running on port ' + config.port)
})
