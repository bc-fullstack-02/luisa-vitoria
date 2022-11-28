const app = require('./app')


app.listen(process.env.PORT || 4000, () => {
    console.log(`Server listen on http://localhost:${process.env.PORT || 4000}`)
} )

console.log(process.env.MONGO_HOSTNAME)
console.log(process.env.MONGO_PORT)
console.log(process.env.NODE_ENV)