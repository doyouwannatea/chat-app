import React, { useState, useEffect } from 'react'
import socket from '../network/io'

import AddContactForm from './AddContactForm'


const Contacts = ({ contactsList }) => {
    const [modal, setModal] = useState(false)

    useEffect(() => {
        socket.on('userFound', () => setModal(false))
    }, [])

    return (
        <aside className="contacts">
            {contactsList}
            <button onClick={() => setModal(true)} className="btn btn-primary btn-sm add-contact"></button>
            { modal && <AddContactForm closeModal={() => { setModal(false) }} />}
        </aside>
    )
}

export default Contacts