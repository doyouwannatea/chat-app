import React from 'react'

const ChatAppHeader = ({ name }) => {
    return (
        <header className="header navbar navbar-light">
            <div className="container d-flex justify-content-space-between">
                <span className="navbar-brand">doyouwannatea's chat</span>
                <div className="header__user d-flex align-items-center">
                    <div className="username">{name}</div>
                    <a href="index.html" className="btn btn-link logout">logout</a>
                </div>
            </div>
        </header>
    )
}

export default ChatAppHeader
