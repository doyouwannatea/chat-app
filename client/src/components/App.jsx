import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  updateSystemMessages,
  updateContacts,
  addSystemMessage,
  updateIsMobile
} from '../actions'

import { socket } from '../utils'

import AuthPage from '../pages/AuthPage'
import ChatPage from '../pages/ChatPage'
import SystemMessage from './SystemMessage'

const App = (props) => {
  const {
    systemMessages,
    isAuth,
    updateIsMobile,
    addSystemMessage,
    updateContacts,
    updateSystemMessages
  } = props

  useEffect(() => {
    socket.on('systemMessage', message => addSystemMessage(message))
    socket.on('updateContacts', contacts => updateContacts(contacts))

    updateIsMobile(window.innerWidth < 576)
    window.addEventListener('resize', () => updateIsMobile(window.innerWidth < 576))
  }, [addSystemMessage, updateContacts, updateIsMobile])

  const messages = systemMessages.map(message =>
    <SystemMessage
      key={message.id}
      message={message.text}
      close={() => updateSystemMessages(message.id)}
    />
  )

  return (
    <>
      { isAuth ? <ChatPage /> : <AuthPage /> }
      <ul className="system-messages-list">
        {messages}
      </ul>
    </>
  )
}

const mapStateToProps = state => ({ systemMessages: state.systemMessages, isAuth: state.isAuth })
const mapDispatchToProps = {
  updateSystemMessages,
  updateContacts,
  addSystemMessage,
  updateIsMobile
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)