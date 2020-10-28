import React, { useEffect, useState } from 'react'
import socket from '../network/io'

import AuthPage from '../pages/AuthPage'
import ChatPage from '../pages/ChatPage'
import SystemMessage from './SystemMessage'

const App = () => {
  const [systemMessages, setSystemMessages] = useState([])
  const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    socket.on('systemMessage', message => setSystemMessages(prev => [...prev, message]))
    socket.on('successfulRegistration', () => setAuth(true))
  }, [])

  const deleteHandler = id => {
    setSystemMessages(prev => {
      const idx = prev.findIndex(item => item.id === id)
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)]
    })
  }

  const messages = systemMessages.map(message =>
    <SystemMessage
      key={message.id}
      message={message.text}
      close={() => deleteHandler(message.id)}
    />
  )

  return (
    <>
      { auth ? <ChatPage name={name} /> : <AuthPage name={name} setName={setName} />}
      <ul className="system-messages-list">
        {messages}
      </ul>
    </>
  )
}

export default App