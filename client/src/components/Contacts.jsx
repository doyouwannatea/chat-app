import React, { useState, useEffect } from 'react'
import { socket } from '../utils'

import AddContactForm from './AddContactForm'

const Contacts = ({ contactsList, isMobile, isNavbarActive, toggleNavbarState }) => {
    const [modal, setModal] = useState(false)

    useEffect(() => {
        socket.on('userFound', () => setModal(false))
    }, [])

    return (
        <>
            <aside className={`contacts ${isMobile ? 'mobile' : ''} ${isNavbarActive ? 'active' : ''}`}>
                <button onClick={toggleNavbarState} className="close-btn btn"></button>
                {contactsList}
                <button onClick={() => setModal(true)} className="btn btn-primary btn-sm add-contact"></button>
            </aside>
            { modal && <AddContactForm closeModal={() => setModal(false)} />}
        </>
    )
}

export default Contacts