const Rascal = require('rascal')
const defaultConfig = require("../config.json")

defaultConfig.vhosts['/'].connection.url = process.env.AMQP_URL || defaultConfig.vhosts['/'].connection.url

const config = Rascal.withDefaultConfig(defaultConfig)
const publisher = Object.keys(defaultConfig.vhosts['/'].publications)[0]
const consumer = Object.keys(defaultConfig.vhosts['/'].subscriptions)[0]

module.exports = {
    pub: (req, res, next) => Rascal.Broker.create(Rascal.withDefaultConfig(config), function (err, broker) {
        if(err) next(err)

        req.publish = (type, keys, value) => new Promise((resolve, reject) => {
            const msg = {
                type,
                payload: value,
                keys
            }
            broker.publish(publisher, msg, function (err, publication) {
                if(err) reject(err)
                publication.on('error', reject)
                console.log('publish okk')
                resolve(value)
            })
        })
        next()
    }),
    sub: () => Promise.resolve(Rascal.withDefaultConfig(config))
    .then((conf) => new Promise((resolve, reject) => Rascal.Broker.create(conf, (err, broker) => {
        if(err) {
            if(err.code === 'ECONNREFUSED') {
                console.log(err)
                process.exit(1)
            } else {
                reject(err)
            }
        }
        resolve(broker)
    })))
    .then(broker => new Promise((resolve, reject) => broker.subscribe(consumer, (err, subscription) => {
        if(err) reject(err)
        resolve(subscription)
    })))
    .then(subscription => {
        subscription.on('error', err => { throw err })
        subscription.on('cancel', err => { throw err })
        return subscription
    })
}