const Users = require('./users')

const createMessage = text => {
    return {
        text,
        id: Math.random()
    }
}

module.exports = {
    Users,
    createMessage
}