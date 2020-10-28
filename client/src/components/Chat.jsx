import React from 'react'
import ChatForm from './ChatForm'
import ChatWindow from './ChatWindow'

const Chat = ({ messages, currentChat }) => {
    return (
        <div className="chat d-flex flex-column justify-content-end">
            <ChatWindow messages={messages} />
            <ChatForm currentChat={currentChat} />
        </div>
    )
}

export default Chat