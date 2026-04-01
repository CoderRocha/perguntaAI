import React, { useEffect, useState, useRef, useMemo } from 'react'
import './ChatBotApp.css'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

export default function ChatBotApp({ onGoBack, chats, setChats, activeChat, setActiveChat, onNewChat }) {
    const [inputValue, setInputValue] = useState('')
    const messages = useMemo(() => chats.find(chat => chat.id === activeChat)?.messages || [], [chats, activeChat])
    const [isTyping, setIsTyping] = useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [showSidebar, setShowSidebar] = useState(false)
    const chatEndRef = useRef(null)

    const handleEmojiSelect = (emoji) => {
        setInputValue((prevInput) => prevInput + emoji.native)
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const sendMessage = async () => {
        if (inputValue.trim() === '') {
            return
        }

        const newMessage = {
            type: 'prompt',
            text: inputValue,
            timestamp: new Date().toLocaleTimeString(),
        }

        if (!activeChat) {
            onNewChat(inputValue)
            setInputValue('')
        } else {
            const updatedMessages = [...messages, newMessage]
            localStorage.setItem(activeChat, JSON.stringify(updatedMessages))
            setInputValue('')

            const updatedChats = chats.map((chat) => {
                if (chat.id === activeChat) {
                    return { ...chat, messages: updatedMessages }
                }
                return chat
            })
            setChats(updatedChats)
            localStorage.setItem('chats', JSON.stringify(updatedChats))
            setIsTyping(true)

            const response = await fetch(`${import.meta.env.VITE_OPENAI_API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: inputValue }],
                    max_tokens: 500,
                })
            })

            const data = await response.json()
            const chatResponse = data.choices[0].message.content.trim()

            const newResponse = {
                type: 'response',
                text: chatResponse,
                timestamp: new Date().toLocaleTimeString(),
            
            }

            const updatedMessagesWithResponse = [...updatedMessages, newResponse]
            localStorage.setItem(activeChat, JSON.stringify(updatedMessagesWithResponse))
            setIsTyping(false)

            const updatedChatsWithResponse = chats.map((chat) => {
                if (chat.id === activeChat) {
                    return { ...chat, messages: updatedMessagesWithResponse }
                }
                return chat
            })
            setChats(updatedChatsWithResponse)
            localStorage.setItem('chats', JSON.stringify(updatedChatsWithResponse))
        }
    }

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault()
            sendMessage()
        }
    }

    const handleSelectChat = (id) => {
        setActiveChat(id)
        setShowSidebar(false)
    }

    const handleDeleteChat = (id) => {
        const updatedChats = chats.filter(chat => chat.id !== id)
        setChats(updatedChats)
        localStorage.setItem('chats', JSON.stringify(updatedChats))
        localStorage.removeItem(id)

        if (id === activeChat) {
            const newActiveChat = updatedChats.length > 0 ? updatedChats[0].id : null
            setActiveChat(newActiveChat)
        }
    }

    return (
        <div className='chat-app'>
            {showSidebar && (
                <div className='sidebar-backdrop' onClick={() => setShowSidebar(false)}></div>
            )}
            <div className={`chat-list ${showSidebar ? 'open' : ''}`}>
                <div className='chat-list-header'>
                    <h2>Chat List</h2>
                    <i className='bx bx-edit-alt new-chat' onClick={() => { onNewChat(); setShowSidebar(false) }}></i>
                </div>
                {chats.map((chat) => (
                    <div key={chat.id} className={`chat-list-item ${chat.id === activeChat ? 'active' : ''}`} onClick={() => handleSelectChat(chat.id)}>
                        <h4>{chat.displayId}</h4>
                        <i className='bx bx-x-circle circel' onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id) }}></i>
                    </div>
                ))}
            </div>
            <div className='chat-window'>
                <div className="chat-title">
                    <i className='bx bx-menu hamburger' onClick={() => setShowSidebar((prev) => !prev)}></i>
                    <h3>Chat with AI</h3>
                    <i className='bx bx-right-arrow-alt arrow' onClick={onGoBack}></i>
                </div>
                <div className="chat">
                    {(messages || []).map((msg, index) => (
                        <div key={index} className={msg.type}>
                            {msg.text} <span>{msg.timestamp}</span>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="typing">
                            Typing...
                        </div>
                    )}
                    <div ref={chatEndRef}></div>
                </div>
                <form className='msg-form' onSubmit={(e) => e.preventDefault()}>
                    <i className='fa-solid fa-face-smile emoji' onClick={() => setShowEmojiPicker((prev) => !prev)}></i>
                    {showEmojiPicker && (
                        <div className='picker'>
                            <Picker onEmojiSelect={handleEmojiSelect} data={data} />
                        </div>
                    )}
                    <input type="text" className='msg-input' placeholder="Type your message here..." value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} onFocus={() => setShowEmojiPicker(false)} />
                    <i className='fa-solid fa-paper-plane' onClick={sendMessage}></i>
                </form>
            </div>
        </div>
    )
}
