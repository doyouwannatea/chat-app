const users = {}

const deleteUser = (id, io) => {
    if (users[id]) {
        const name = users[id].name
        delete users[id]

        for (const user in users) {
            if (users[user].contacts[name]) {
                delete users[user].contacts[name]
                updateContacts(user, io)
            }
        }
    }
}

const addUser = (name, id) => {
    const newUser = {
        name,
        id,
        contacts: {}
    }

    users[id] = newUser
}

const updateContacts = (id, io) => {
    io.to(id).emit('updateContacts', findUserById(id).contacts)
}

const findUserByName = name => {
    for (const user in users) {
        if (users[user].name === name) {
            return users[user]
        }
    }
}

const findUserById = id => {
    return users[id]
}

const addContact = (currentUser, user) => {
    if (users[currentUser.id]) {
        users[currentUser.id].contacts[user.name] = []
    }
}

const addMessage = (from, to, text, owner, time) => {
    if (users[from.id]) {
        users[from.id].contacts[to.name].push({
            text,
            owner,
            time
        })
    }
}

const createMessage = (text) => {
    return {
        text,
        id: Math.random()
    }
}

module.exports = {
    deleteUser,
    findUserByName,
    findUserById,
    addUser,
    addContact,
    addMessage,
    updateContacts,
    createMessage
}