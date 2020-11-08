const { DateTime } = require('luxon')

class Users {
    users = {}

    deleteUser = (id, io) => {
        if (this.users[id]) {
            const name = this.users[id].name
            delete this.users[id]

            for (const user in this.users) {
                if (this.users[user].contacts[name]) {
                    delete this.users[user].contacts[name]
                    this.updateContacts(user, io)
                }
            }
        }
    }

    addUser = (name, id) => {
        const newUser = {
            name,
            id,
            contacts: {}
        }

        this.users[id] = newUser
    }

    updateContacts = (id, io) => {
        io.to(id).emit('updateContacts', this.findUserById(id).contacts)
    }

    findUserByName = name => {
        for (const user in this.users) {
            if (this.users[user].name === name) {
                return this.users[user]
            }
        }
    }

    findUserById = id => {
        return this.users[id]
    }

    addContact = (currentUser, user) => {
        if (this.users[currentUser.id]) {
            this.users[currentUser.id].contacts[user.name] = []
        }
    }

    addMessage = (from, to, text, owner) => {
        const { c } = DateTime.local()
        const m = c.minute < 10 ? `0${c.minute}` : c.minute
        const h = c.hour < 10 ? `0${c.hour}` : c.hour

        const time = `${h}:${m}`
        if (this.users[from.id]) {
            this.users[from.id].contacts[to.name].push({ text , owner, time })
        }
    }
}

module.exports = new Users()