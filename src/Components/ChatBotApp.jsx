import React from 'react'
import './ChatBotApp.css'

export default function ChatBotApp({ onGoBack }) {
  return (
    <div className='chat-app'>
        <div className='chat-list'>
            <div className='chat-list-header'>
                <h2>Chat List</h2>
                <i className='bx bx-edit-alt new-chat'></i>
            </div>
            <div className='chat-list-item'>
                <h4>Chat 25/03/2025 12:00:10 PM</h4>
                <i className='bx bx-x-circle circel'></i>
            </div>
            <div className='chat-list-item'>
                <h4>Chat 25/03/2025 12:00:10 PM</h4>
                <i className='bx bx-x-circle circel'></i>
            </div>
            <div className='chat-list-item'>
                <h4>Chat 25/03/2025 12:00:10 PM</h4>
                <i className='bx bx-x-circle circel'></i>
            </div>
        </div>
        <div className='chat-window'>
            <div className="chat-title">
                <h3>Chat with AI</h3>
                <i className='bx bx-right-arrow-alt arrow' onClick={onGoBack}></i>
            </div>
            <div className="chat">
                <div className="prompt">
                    Hi, how are you?
                    <span>12:59:51 PM</span>
                </div>
                <div className="response">
                    Hello, I'm just a computer, so I don't have feeling, but I'm here to help you.
                    <span>12:59:54 PM</span>
                </div>
            </div>
            <div className="typing">
                Typing...
            </div>
            <form className='msg-form'>
                <i className='fa-solid fa-face-smile emoji'></i>
                <input type="text" className='msg-input' placeholder="Type your message here..." />
                <i className='fa-solid fa-paper-plane'></i>
            </form>
        </div>
    </div>
  )
}
