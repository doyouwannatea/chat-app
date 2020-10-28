import React from 'react'
import userDummyImage from '../assets/user.jpg';

const User = ({ name, setCurrentChat, currentChat }) => {

    const userHandler = () => {
        setCurrentChat(name)
    }

    const isCurrent = currentChat === name ? 'active' : ''

    return (
        <button onClick={userHandler} className={`contacts-item ${isCurrent}`}>
            <img src={userDummyImage} alt="user 1" className="contacts-item__avatar" />
            <span className="text-secondary contacts-item__nickname ml-1">{name}</span>
        </button>
    )
}

export default User