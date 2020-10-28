import React from 'react'

import ChatAppHeader from '../components/ChatAppHeader'
import ChatAppFooter from '../components/ChatAppFooter'
import ChatAppBody from '../components/ChatAppBody'

const ChatPage = ({ name }) => {
    return (
        <>
            <ChatAppHeader name={name} />
            <ChatAppBody name={name}/>
            <ChatAppFooter />
        </>
    )
}

export default ChatPage