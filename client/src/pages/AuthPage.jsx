import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { login, changeName } from '../actions'
import { socket } from '../utils'

const AuthPage = ({ name, changeName, login }) => {

    useEffect(() => {
        socket.on('login', login)

        return () => socket.off('login', login)
    }, [login])

    const changeHandler = e => {
        const name = e.target.value.trim()

        if (name.length < 14) {
            changeName(name)
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


const mapStateToProps = state => ({ name: state.name })

export default connect(
    mapStateToProps,
    { login, changeName }
)(AuthPage)