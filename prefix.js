const fs = require('fs')

const changePrefix = (prefix) => {
    fs.writeFile('./config', prefix, 'utf8')
}

const readPrefix = async () => {
    fs.readFile('./config', 'utf8', function(err, contents) {
        return contents
    })
}

export {
    changePrefix,
    readPrefix
}
