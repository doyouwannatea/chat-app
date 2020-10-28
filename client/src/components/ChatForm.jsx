import React, { useState } from 'react'
import socket from '../network/io'

const ChatForm = ({ currentChat }) => {
    const [message, setMessage] = useState('')

    const submitHandler = e => {
        e.preventDefault()
        const text = message.trim()

        if (currentChat && text) {
            if (Math.max(...text.split(' ').map(item => item.length)) < 30) {
                socket.emit('message', { name: currentChat, text })
            } else {
                socket.emit('systemMessage', 'Чтобы чат не сломался, отправка сообщения с последовательностью > 30 символов предотвращена')
            }
        }
        setMessage('')
    }

    const isCurrentChat = !Boolean(currentChat)

    return (
        <form onSubmit={submitHandler} className="chat__form">
            <div className="input-group">
                <input required disabled={isCurrentChat} onChange={e => setMessage(e.target.value)} value={message} type="text" className="form-control" placeholder="Write message..." aria-label="Write message" />
                <div className="input-group-append">
                    <button disabled={isCurrentChat} className="btn btn-primary">Send message</button>
                </div>
            </div>
        </form>
    )
}

export default ChatForm