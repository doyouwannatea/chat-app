import React, { useRef, useState } from 'react'
import { socket } from '../utils'

const ChatForm = ({ currentChat }) => {
    const [message, setMessage] = useState('')
    const messageForm = useRef(null)

    const submitHandler = e => {
        e.preventDefault()
        const text = message.trim()

        if (text) {
            if (Math.max(...text.split(' ').map(item => item.length)) < 31) {
                socket.emit('message', { name: currentChat, text })
            } else {
                socket.emit('systemMessage', 'Последовательность > 30 символов запрещена')
            }
            setMessage('')
            messageForm.current.focus()
        }
    }

    const isCurrentChat = !Boolean(currentChat)

    return (
        <form onSubmit={submitHandler} className="chat__form">
            <div className="input-group">
                <input
                    autoComplete="off"
                    required
                    disabled={isCurrentChat}
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                    type="text"
                    ref={messageForm}
                    className="form-control"
                    placeholder="Write message..."
                    aria-label="Write message"
                />
                <div className="input-group-append">
                    <button disabled={isCurrentChat} className="btn btn-primary">Send message</button>
                </div>
            </div>
        </form>
    )
}

export default ChatForm