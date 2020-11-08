const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const { Users, createMessage } = require('./utils')
const { 
    addContact,
    addMessage,
    addUser,
    deleteUser,
    findUserById,
    findUserByName,
    updateContacts 
} = Users

app.use(express.static(path.join(__dirname, 'client/build')))

io.on('connect', socket => {

    socket.on('registration', name => {
        if (!findUserByName(name)) {
            addUser(name, socket.id)
            socket.emit('login', true) 
        } else {
            socket.emit('systemMessage', createMessage('Выберите другое имя пользователя') ) 
        }
    })

    socket.on('addContact', name => {
        const user = findUserByName(name)
        const currentUser = findUserById(socket.id)

        if (user) {
            if (currentUser.name !== name) {
                if (!currentUser.contacts[name]) {
                    socket.emit('userFound', true)

                    addContact(user, currentUser)
                    addContact(currentUser, user)

                    updateContacts(socket.id, io)
                    updateContacts(user.id, io)
                } else {
                    socket.emit('systemMessage', createMessage('Пользователь уже в контактах'))
                }
            } else {
                socket.emit('systemMessage', createMessage('Вы не можете добавить себя в контакты'))
            }
        } else {
            socket.emit('systemMessage', createMessage('Пользователь не найден'))
        }
    })

    socket.on('message', ({ name, text }) => {
        const user = findUserByName(name)

        if (user) {
            const currentUser = findUserById(socket.id)
            addMessage(user, currentUser, text, false)
            addMessage(currentUser, user, text, true)

            updateContacts(socket.id, io)
            updateContacts(user.id, io)
        } else {
            socket.emit('systemMessage', createMessage('Пользователь не в сети'))
        }
    })

    socket.on('systemMessage', message => {
        socket.emit('systemMessage', createMessage(message))
    })

    socket.on('disconnect', () => {
        deleteUser(socket.id, io)
    })
})

const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`))