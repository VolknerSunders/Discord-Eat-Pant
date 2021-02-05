const mongodb = require('./mongo')

const changePrefix = (prefix) => {
    mongodb.insertOneDocument({ name: prefix }, 'prefix')
}

const readPrefix = () => mongodb.getLastDocument('prefix')

module.exports = {
    changePrefix,
    readPrefix
}
