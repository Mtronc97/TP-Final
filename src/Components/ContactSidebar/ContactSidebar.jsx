import React, { useContext, useState } from 'react'
import { ContactsContext } from '../../Context/ContactsContext'
import { Link } from 'react-router'
import './ContactSidebar.css'

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

const isValidUrl = (string) => {
    try {
        new URL(string)
        return true
    } catch (_) {
        return false
    }
}

export default function ContactSidebar({ selectedContactId, toggleTheme, theme, userName, userPhoto, setUserPhoto }) {
    const { contacts, addContact } = useContext(ContactsContext)
    const [searchTerm, setSearchTerm] = useState('')
    const [showSettings, setShowSettings] = useState(false)
    const [showAddContactModal, setShowAddContactModal] = useState(false)
    const [newContactName, setNewContactName] = useState('')
    const [newContactPicture, setNewContactPicture] = useState('')
    const [showChangePhotoModal, setShowChangePhotoModal] = useState(false)
    const [newUserPhoto, setNewUserPhoto] = useState('')
    const [modalError, setModalError] = useState('')

    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getLastMessage = (contact) => {
        return contact.messages?.slice(-1)[0]
    }

    const getUnreadCount = (contact) => {
        return contact.messages?.filter(msg => !msg.is_read && !msg.send_by_me).length || 0
    }

    const handleChangePhoto = () => {
        const photo = newUserPhoto.trim()
        if (!photo) {
            setModalError('La URL de la foto es obligatoria.')
            return
        }
        if (!isValidUrl(photo)) {
            setModalError('La URL de la foto no es válida.')
            return
        }
        setUserPhoto(photo)
        setNewUserPhoto('')
        setModalError('')
        setShowChangePhotoModal(false)
    }

    const handleAddContact = () => {
        const name = newContactName.trim()
        if (!name) {
            setModalError('El nombre del contacto es obligatorio.')
            return
        }
        if (name.length < 2) {
            setModalError('El nombre debe tener al menos 2 caracteres.')
            return
        }
        const hasPicture = newContactPicture.trim() !== ''
        if (hasPicture && !isValidUrl(newContactPicture.trim())) {
            setModalError('La URL de la foto no es válida.')
            return
        }

        const contactData = {
            name,
            profile_picture: hasPicture ? newContactPicture.trim() : '',
            last_time_connection: 'Nuevo',
            initials: getInitials(name),
            avatarColor: getColorFromName(name)
        }

        addContact(contactData)
        setNewContactName('')
        setNewContactPicture('')
        setModalError('')
        setShowAddContactModal(false)
    }

    return (
        <div className='sideContact'>
            <div className="sidebarHeader">
                <div className="userAvatar" onClick={() => setShowChangePhotoModal(true)} style={{ cursor: 'pointer' }}>
                    {userPhoto
                        ? (
                            <img
                                src={userPhoto}
                                alt={userName}
                                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                            />
                        )
                        : (
                            <div
                                className="avatarInitials"
                                style={{
                                    backgroundColor: getColorFromName(userName)
                                }}
                            >
                                {getInitials(userName)}
                            </div>
                        )
                    }
                </div>
            </div>
            <h2>{userName}</h2>
            <div className="headerActions">
            </div>
            {showSettings && (
                <div className="settingsPanel">
                    <button onClick={toggleTheme} className="themeButton">
                        Modo Oscuro/Claro {theme === 'light' ? <i className="bi bi-moon-stars"></i> : <i className="bi bi-brightness-high"></i>}
                    </button>
                </div>
            )}
            <div className="searchRow">
                <input 
                    type="text" 
                    placeholder="Buscar contacto..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="searchInput" 
                />
                <button
                    onClick={() => setShowAddContactModal(true)}
                    className="addContactBtn"
                    title="Agregar contacto"
                    aria-label="Agregar contacto"
                >
                    <i className="bi bi-person-add"></i>
                </button>
            </div>
            <div className="contactsList">
                {
                    filteredContacts.map(
                        (contact) => {
                            return (
                                <Link
                                    to={`/contact/${contact.id}`}
                                    key={contact.id}
                                    className={`contactItem ${contact.id === Number(selectedContactId) ? 'selected' : ''}`}
                                >
                                    {contact.profile_picture
                                        ? (
                                            <img
                                                src={contact.profile_picture}
                                                alt={contact.name}
                                            />
                                        )
                                        : (
                                            <div
                                                className="avatarInitials"
                                            style={{ backgroundColor: contact.avatarColor || getColorFromName(contact.name) }}
                                            >
                                                {contact.initials || getInitials(contact.name)}
                                            </div>
                                        )
                                    }
                                    <div className="contactInfo">
                                        <h3>{contact.name}</h3>
                                        {getLastMessage(contact) && (
                                            <p className="lastMessage">
                                                {getLastMessage(contact).text.length > 20 ? getLastMessage(contact).text.substring(0, 20) + '...' : getLastMessage(contact).text}
                                                {getUnreadCount(contact) > 0 && <span className="unreadBadge">{getUnreadCount(contact)}</span>}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            )
                        }
                    )
                }
            </div>
            <div className="sidebarFooter">
                <button onClick={() => setShowSettings(!showSettings)} className="settingsButton">
                    <i className="bi bi-gear"></i>
                </button>
            </div>
            {showChangePhotoModal && (
                <div className="modalOverlay" onClick={() => setShowChangePhotoModal(false)}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <h3>Cambiar Foto de Perfil</h3>
                        {modalError && <p className="errorMessage">{modalError}</p>}
                        <input 
                            type="url" 
                            placeholder="Nueva URL de la foto" 
                            value={newUserPhoto} 
                            onChange={(e) => { setNewUserPhoto(e.target.value); setModalError('') }} 
                            className="modalInput"
                        />
                        <div className="modalButtons">
                            <button onClick={handleChangePhoto} className="modalBtn">Cambiar</button>
                            <button onClick={() => { setShowChangePhotoModal(false); setModalError('') }} className="modalBtn cancel">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            {showAddContactModal && (
                <div className="modalOverlay" onClick={() => setShowAddContactModal(false)}>
                    <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                        <h3>Agregar Nuevo Contacto</h3>
                        {modalError && <p className="errorMessage">{modalError}</p>}
                        <input 
                            type="text" 
                            placeholder="Nombre del contacto" 
                            value={newContactName} 
                            onChange={(e) => { setNewContactName(e.target.value); setModalError('') }} 
                            className="modalInput"
                        />
                        <input 
                            type="text" 
                            placeholder="URL de la foto (opcional)" 
                            value={newContactPicture} 
                            onChange={(e) => { setNewContactPicture(e.target.value); setModalError('') }} 
                            className="modalInput"
                        />
                        <div className="modalButtons">
                            <button onClick={handleAddContact} className="modalBtn">Agregar</button>
                            <button onClick={() => { setShowAddContactModal(false); setModalError('') }} className="modalBtn cancel">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}