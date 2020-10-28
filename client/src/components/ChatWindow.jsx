import React, { useEffect } from 'react'

const ChatWindow = ({ messages }) => {

    useEffect(() => {
        const chat = document.getElementById('chat-window')
        chat.scrollTop = chat.scrollHeight
    })

    return (
        <div id="chat-window" className="chat__window">
            {
                messages.map(message =>
                    <div className={`message ${message.owner && 'message--right'}`}>
                        <span className="message__time text-muted">{message.time}</span>
                        {message.text}
                    </div>
                )
            }
        </div>
    )
}

export default ChatWindow