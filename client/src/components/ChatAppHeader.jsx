import React from 'react'
import { connect } from 'react-redux'

import { toggleNavbarState } from '../actions'

const ChatAppHeader = ({ name, isMobile, toggleNavbarState }) => {
    return (
        <header className={`header navbar navbar-light ${isMobile ? 'mobile' : ''}`}>
            <div className="container d-flex justify-content-space-between">
                <button onClick={toggleNavbarState} className="btn btn-primary mobile-btn">Contacts</button>
                <span className="navbar-brand">doyouwannatea's chat</span>
                <div className="header__user d-flex align-items-center">
                    <div className="username">{name}</div>
                    <a href="index.html" className="btn btn-link logout">logout</a>
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = state => ({ name: state.name, isMobile: state.isMobile })

export default connect(
    mapStateToProps,
    { toggleNavbarState }
)(ChatAppHeader)
