import React from 'react'
import socket from '../network/io'

const AuthPage = ({ name, setName }) => {

    const changeHandler = e => {
        const name = e.target.value.trim()

        if (name.length < 14) {
            setName(name)
        }
    }

    const submitHandler = e => {
        e.preventDefault()
        socket.emit('registration', name)
    }

    return (
        <div className="popup-container">
            <form onSubmit={submitHandler} className="popup">
                <header className="popup__header">
                    <h3>Welcome to my chat app!</h3>
                </header>
                <main className="popup__body">
                    <div className="popup__actions">
                        <input value={name} onChange={changeHandler} required className="form-control mb-2" type="text" placeholder="Input Your nickname..." />
                        <button className="btn btn-primary">Enter the chat</button>
                    </div>
                </main>
            </form>
        </div>
    )
}

export default AuthPage