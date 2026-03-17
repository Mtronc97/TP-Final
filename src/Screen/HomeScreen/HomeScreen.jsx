import React from 'react'
import ContactSidebar from '../../Components/ContactSidebar/ContactSidebar'
import './HomeScreen.css'

export default function HomeScreen({ toggleTheme, theme, name, userPhoto, setUserPhoto }) {
  return (
    <div className="homeContainer">
        <ContactSidebar toggleTheme={toggleTheme} theme={theme} userName={name} userPhoto={userPhoto} setUserPhoto={setUserPhoto} />
        <div className="homeContent">
            <div className="welcomeBubble">
                <h1>Hola {name}, ¿con quién vamos a hablar hoy?</h1>
            </div>
        </div>
    </div>
  )
}