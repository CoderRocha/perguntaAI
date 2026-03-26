import React, { useState } from 'react'
import './ChatBotApp.css'

export default function ChatBotApp({ onGoBack, chats, setChats }) {
    const [inputValue, setInputValue] = useState('')
    const [messages, setMessages] = useState(chats[0]?.messages || [])

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const sendMessage = () => {
        if(inputValue.trim() === '') {
            return
        }
    
    const newMessage = {
        type: 'prompt',
        text: inputValue,
        timestamp: new Date().toLocaleTimeString(),
    }

    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setInputValue('')

    const updatedChats = chats.map((chat, index) => {
        if (index === 0) {
            return {...chats, messages: updatedMessages}
        }
        return chat
    })
    setChats(updatedChats)
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault()
            sendMessage()
        }
    }

  return (
    <div className='chat-app'>
        <div className='chat-list'>
            <div className='chat-list-header'>
                <h2>Chat List</h2>
                <i className='bx bx-edit-alt new-chat'></i>
            </div>
            {chats.map((chat, index) => (
                <div key={index} className={`chat-list-item ${index === 0 ? 'active' : ""}`}>
                <h4>{chat.id}</h4>
                <i className='bx bx-x-circle circel'></i>
            </div>
            ))}
        </div>
        <div className='chat-window'>
            <div className="chat-title">
                <h3>Chat with AI</h3>
                <i className='bx bx-right-arrow-alt arrow' onClick={onGoBack}></i>
            </div>
            <div className="chat">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.type}>
                    {msg.text} <span>{msg.timestamp}</span>
                </div>
                ) )}
            </div>
            <div className="typing">
                Typing...
            </div>
            <form className='msg-form' onSubmit={(e) => e.preventDefault()}>
                <i className='fa-solid fa-face-smile emoji'></i>
                <input type="text" className='msg-input' placeholder="Type your message here..." value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} />
                <i className='fa-solid fa-paper-plane' onClick={sendMessage}></i>
            </form>
        </div>
    </div>
  )
}
