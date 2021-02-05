const mb = require('./mongo')

mb.getLastDocument('prefix').then(res => {
    console.log(res.name)
})
