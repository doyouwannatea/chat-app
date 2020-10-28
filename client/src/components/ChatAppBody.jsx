import React, { useEffect, useState } from 'react'
import socket from '../network/io'

import Chat from './Chat'
import Contacts from './Contacts'
import User from './User'

const ChatAppBody = () => {
    const [currentChat, setCurrentChat] = useState('')
    const [contacts, setContacts] = useState({})

    useEffect(() => {
        socket.on('updateContacts', contacts => setContacts(contacts))
    }, [])

    useEffect(() => {
       if(!Object.keys(contacts).length) {
        setCurrentChat('')
       }
    }, [contacts])

    const contactsList = []

    for (const name in contacts) {
        contactsList.push(<User currentChat={currentChat} setCurrentChat={setCurrentChat} name={name} />)
    }

    return (
        <main className="main container">
            <div className="row">
                <div className="col-3">
                    <Contacts contactsList={contactsList} />
                </div>
                <div className="col">
                    <Chat currentChat={currentChat} messages={ contacts[currentChat] || [] } />
                </div>
            </div>
        </main>
    )
}

export default ChatAppBody