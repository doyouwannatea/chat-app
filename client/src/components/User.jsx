import React from 'react'
import { connect } from 'react-redux';
import userDummyImage from '../assets/user.jpg';
import { changeChat, toggleNavbarState } from '../actions'

const User = ({ name, changeChat, currentChat, toggleNavbarState }) => {

    const userHandler = () => {
        changeChat(name)
        toggleNavbarState()
    }

    const isCurrent = currentChat === name ? 'active' : ''

    return (
        <button onClick={userHandler} className={`contacts-item ${isCurrent}`}>
            <img src={userDummyImage} alt="user 1" className="contacts-item__avatar" />
            <span className="text-secondary contacts-item__nickname ml-1">{name}</span>
        </button>
    )
}

const mapStateToProps = state => ({ currentChat: state.currentChat })

export default connect(
    mapStateToProps,
    { changeChat, toggleNavbarState }
)(User)