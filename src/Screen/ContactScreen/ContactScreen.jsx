import React, { useContext, useState, useEffect } from 'react'
import ContactSidebar from '../../Components/ContactSidebar/ContactSidebar'
import { useParams, useNavigate } from 'react-router'
import { ContactsContext } from '../../Context/ContactsContext'
import EmojiPicker from 'emoji-picker-react'
import './ContactScreen.css'

const AVATAR_COLORS = ['#F94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#4D908E', '#577590', '#277DA1']

const getInitials = (name = '') => {
  const parts = name.trim().split(' ').filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

const getColorFromName = (name = '') => {
  const normalized = name.trim().toLowerCase()
  let hash = 0
  for (let i = 0; i < normalized.length; i += 1) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length
  return AVATAR_COLORS[index]
}

export default function ContactScreen({ toggleTheme, theme, name, userPhoto, setUserPhoto }) {
  const {contacts, addMessageToContact, markMessagesAsRead} = useContext(ContactsContext)
  const [messageText, setMessageText] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  //Obtengo el id del contacto seleccionado a traves de los parametros de la url
  const {contact_id} = useParams()

  //Busco el contacto seleccionado en la lista de contactos
  const contact_selected = contacts.find(contact => Number(contact.id) === Number(contact_id))

  const getContactIdByName = (authorName) => {
    const contact = contacts.find(c => c.name === authorName)
    return contact ? contact.id : null
  }

  useEffect(() => {
    if (contact_selected) {
      markMessagesAsRead(Number(contact_id))
    }
  }, [contact_id, markMessagesAsRead])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate('/')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (messageText.trim() === '') return

    const newMessage = {
      id: Date.now(), // ID único simple
      text: messageText,
      send_by_me: true,
      created_at: new Date().toISOString(),
      is_read: true
    }

    addMessageToContact(Number(contact_id), newMessage)
    setMessageText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleEmojiClick = (emojiData) => {
    setMessageText(prev => prev + emojiData.emoji)
  }

  // Filtrar mensajes basados en el término de búsqueda
  const filteredMessages = contact_selected ? contact_selected.messages.filter(message =>
    message.text.toLowerCase().includes(searchTerm.toLowerCase())
  ) : []

  return (
    <div className="chatLayout">
      <ContactSidebar selectedContactId={contact_id} toggleTheme={toggleTheme} theme={theme} userName={name} userPhoto={userPhoto} setUserPhoto={setUserPhoto} />
      <div className="chatArea">
        {/* Si el contacto seleccionado no existe, muestro un mensaje si no, muestro el contacto */}
      {
        ! contact_selected 
        ? <div>
            <h1>El contacto seleccionado no existe</h1>
        </div>
        : <div className="chatContent">
          <div className="chatHeader">
            <div className="headerLeft">
              <button onClick={() => navigate('/')} className="backButton"><i className="bi bi-arrow-left"></i></button>
              {contact_selected.profile_picture
                ? (
                    <img src={contact_selected.profile_picture} alt={contact_selected.name} />
                  )
                : (
                    <div
                      className="avatarInitials"
                      style={{
                        backgroundColor: contact_selected.avatarColor || getColorFromName(contact_selected.name)
                      }}
                    >
                      {contact_selected.initials || getInitials(contact_selected.name)}
                    </div>
                  )
              }
              <h2>{contact_selected.name}</h2>
            </div>
            <div className="headerRight">
              <button
                className={`searchToggleButton ${showSearch ? 'active' : ''}`}
                onClick={() => {
                  setShowSearch(prev => !prev)
                  if (showSearch) setSearchTerm('')
                }}
                aria-label="Buscar mensajes"
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
          {showSearch && (
            <div className="searchContainer">
              <input 
                type="text" 
                placeholder="Buscar mensajes..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="searchInput" 
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="clearSearchButton">
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          )}
          <div className="messagesContainer">
            {
              filteredMessages.map(message => {
                return (
                  <div key={message.id} className={`message ${message.send_by_me ? 'sent' : 'received'}`}>
                    {message.authorName && (
                      <div
                        className="messageAuthor"
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          const targetId = getContactIdByName(message.authorName)
                          if (targetId) navigate(`/contact/${targetId}`)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            const targetId = getContactIdByName(message.authorName)
                            if (targetId) navigate(`/contact/${targetId}`)
                          }
                        }}
                      >
                        {(() => {
                          const contact = contacts.find(c => c.name === message.authorName)
                          const avatarSrc = message.authorAvatar || contact?.profile_picture
                          return avatarSrc ? (
                            <img src={avatarSrc} alt={message.authorName} className="authorAvatar" />
                          ) : (
                            <div
                              className="authorInitials"
                              style={{ backgroundColor: getColorFromName(message.authorName) }}
                            >
                              {getInitials(message.authorName)}
                            </div>
                          )
                        })()}
                        <span
                          className="authorName"
                          style={{ color: getColorFromName(message.authorName) }}
                        >
                          {message.authorName}
                        </span>
                      </div>
                    )}
                    <p>{message.text}</p>
                    <div className="messageFooter">
                      <span className="messageTime">{new Date(message.created_at).toLocaleTimeString()}</span>
                      {message.send_by_me && (
                        <span className="readStatus">
                          {message.is_read ? <i className="bi bi-check2-all"></i> : <i className="bi bi-check"></i>}
                        </span>
                      )}
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
      }
        <div className="messageForm">
          <form onSubmit={handleSubmit} className="inputContainer">
            {showEmojiPicker && (
              <div className="emojiPickerContainer">
                <EmojiPicker onEmojiClick={handleEmojiClick} previewConfig={{ showPreview: false }} />
              </div>
            )}
            <button type="button" className="emojiButton" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
            <textarea 
              placeholder='Escribe un mensaje...' 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="submit" className="sendButton"><i className="bi bi-send"></i></button>
          </form>
        </div>
      </div>
    </div>
  )
}