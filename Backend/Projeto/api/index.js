const app = require('./app')


app.listen(process.env.PORT || 4000, () => {
    console.log(`Server listen on http://localhost:${process.env.PORT || 4000}`)
} )