import React from 'react'
import { connect } from 'react-redux'

import Chat from './Chat'
import Contacts from './Contacts'
import User from './User'

import { toggleNavbarState } from '../actions'

const ChatAppBody = ({ currentChat, contacts, isMobile, isNavbarActive, toggleNavbarState }) => {
    const contactsList = []

    for (const name in contacts) {
        contactsList.push(<User name={name} />)
    }

    return (
        <main className="main container">
            <div className="row">
                <div className="col-sm-3">
                    <Contacts
                        isNavbarActive={isNavbarActive}
                        toggleNavbarState={toggleNavbarState}
                        contactsList={contactsList}
                        isMobile={isMobile}
                    />
                </div>
                <div className="col">
                    <Chat currentChat={currentChat} messages={contacts[currentChat] || []} />
                </div>
            </div>
        </main>
    )
}

const mapStateToProps = state => ({
    currentChat: state.currentChat,
    contacts: state.contacts,
    isMobile: state.isMobile,
    isNavbarActive: state.isNavbarActive
})

export default connect(
    mapStateToProps,
    { toggleNavbarState }
)(ChatAppBody)