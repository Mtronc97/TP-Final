import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import HomeScreen from './Screen/HomeScreen/HomeScreen'
import ContactScreen from './Screen/ContactScreen/ContactScreen'
import ErrorNotFoundScreen from './Screen/ErrorNotFoundScreen/ErrorNotFoundScreen'
import { getContacts } from './services/contactsService'
import ContactsContextProvider from './Context/ContactsContext'
import './styles/styles.css'
import './styles/login.css'


function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
    const [name, setName] = useState('')
    const [userPhoto, setUserPhoto] = useState('')

    useEffect(() => {
        console.log('Theme changed to:', theme)
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    const handleNameSubmit = (e) => {
        e.preventDefault()
        const inputName = e.target.name.value.trim()
        const inputPhoto = e.target.photo.value.trim()
        if (inputName) {
            setName(inputName)
            setUserPhoto(inputPhoto)
        }
    }

    if (!name) {
        return (
            <div className="loginContainer">
                <form onSubmit={handleNameSubmit} className="loginForm">
                    <h2>Ingresa tu nombre</h2>
                    <input type="text" name="name" placeholder="Tu nombre" required />
                    <input type="url" name="photo" placeholder="URL de tu foto (opcional)" />
                    <br />
                    <button type="submit">Continuar</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <ContactsContextProvider >
                <Routes>
                    <Route
                        path='/'
                        element={

                            <HomeScreen toggleTheme={toggleTheme} theme={theme} name={name} userPhoto={userPhoto} setUserPhoto={setUserPhoto} />

                        }
                    />
                    <Route
                        path='/contact/:contact_id'
                        element={
                            <ContactScreen toggleTheme={toggleTheme} theme={theme} name={name} userPhoto={userPhoto} setUserPhoto={setUserPhoto} />
                        }
                    />
                    <Route
                        path='*'
                        element={<ErrorNotFoundScreen />}
                    />
                </Routes>
            </ContactsContextProvider>
        </div>
    )
}

export default App