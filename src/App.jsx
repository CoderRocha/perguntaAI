import React, { useState } from 'react'
import ChatBotStart from './Components/ChatBotStart'
import ChatBotApp from './Components/ChatBotApp'
import { v4 as uuidv4 } from 'uuid'

export default function App() {
  const [isChatting, setIsChatting] = useState(false)
  const [chats, setChats] = useState(() => JSON.parse(localStorage.getItem('chats')) || [])
  const [activeChat, setActiveChat] = useState(() => {
    const storedChats = JSON.parse(localStorage.getItem('chats')) || []
    return storedChats.length > 0 ? storedChats[0].id : null
  })

  const createNewChat = (initialMessage = "") => {
    const newChat = {
      id: uuidv4(),
      displayId: `Chat ${new Date().toLocaleDateString("en-US")} ${new Date().toLocaleTimeString()}`,
      messages: initialMessage ? [{ type: 'prompt', text: initialMessage, timestamp: new Date().toLocaleTimeString() }] : [],
    }
    const newChats = [newChat, ...chats]
    setChats(newChats)
    localStorage.setItem('chats', JSON.stringify(newChats))
    localStorage.setItem(newChat.id, JSON.stringify(newChat.messages))
    setActiveChat(newChat.id)
  }

  const handleStartChat = () => {
    setIsChatting(true)
    if (chats.length === 0) {
      createNewChat()
    }
  }

  const handleGoBack = () => {
    setIsChatting(false)
  }

  return (
    <div className='container'>
      {isChatting ? (
        <ChatBotApp onGoBack={handleGoBack} chats={chats} setChats={setChats} activeChat={activeChat} setActiveChat={setActiveChat} onNewChat={createNewChat} />
      ) : (
        <ChatBotStart onStartChat={handleStartChat} />
      )}
    </div>
  )
}
