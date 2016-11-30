var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10

var DriverSchema = new Schema({
    IDNP: {
      type: String,
      required: true,
      unique: true,
      dropDups: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      }
    },
    phoneNumber: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    carMake: {
      type: String,
      required: true,
    },
    carModel: {
      type: String,
      required: true,
    },
    carColor: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    position: {
      latitude: Number,
      longitude: Number
    },
    rating: {
      type: [{
        clientPhoneNumber: {
         type: String,
         unique: true
        },
        mark: Number
      }],
      default: []
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
}, {
  collection: 'drivers'
})

DriverSchema.pre('save', function(next) {
    let user = this

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err)

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)

            // override the cleartext password with the hashed one
            user.password = hash
            next()
        })
    })
})

let Driver = mongoose.model('Driver', DriverSchema)
module.exports = Driver
