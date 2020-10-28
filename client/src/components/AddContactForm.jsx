import React, { useEffect, useState } from 'react'
import socket from '../network/io'

const AddContactForm = ({ closeModal }) => {
    const [name, setName] = useState('')

    useEffect(() => {
        document.addEventListener('keydown', e => e.code === 'Escape' && closeModal())
        return () => {
            document.removeEventListener('keydown', e => e.code === 'Escape' && closeModal())
        }
    }, [closeModal])

    const closeHandler = e => {
        if (e.target.classList.contains('popup-container')) {
            closeModal()
        }
    }

    const submitHandler = e => {
        e.preventDefault()
        socket.emit('addContact', name)
    }

    return (
        <div onMouseDown={closeHandler} className="popup-container">
            <form onSubmit={submitHandler} className="popup">
                <header className="popup__header">
                    <h3>Add new contact</h3>
                </header>
                <main className="popup__body">
                    <div className="popup__actions">
                        <input onChange={e => setName(e.target.value)} value={name} required className="form-control mb-2" type="text" placeholder="Type user nickname..." />
                        <button className="btn btn-primary">Add</button>
                        <button onClick={closeModal} type="button" className="btn btn-secondary ml-2" data-dismiss="modal">Close</button>
                    </div>
                </main>
            </form>
        </div>
    )
}

export default AddContactForm