const Rascal = require('rascal')
const defaultConfig = require('./config')

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
    })
}