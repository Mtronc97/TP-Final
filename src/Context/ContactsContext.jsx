import { createContext, useState, useCallback } from "react";
import { getContacts } from "../services/contactsService";

//Creamos el contexto y lo exportamos porque luego quien
//quiera consumirlo lo va a necesitar
export const ContactsContext = createContext(
    //Representa el valor inicial del contexto, es decir, lo que va devolver el contexto por defecto, nos sirve para saber que propiedades va a tener el contexto, aunque luego se van a modificar
    {
        contacts: [],
        addMessageToContact: () => {},
        markMessagesAsRead: () => {},
        addContact: () => {}
    }
)

/* 
la prop children es una prop reservada de react
Representa a todos los componentes hijos que se encuentran dentro del componente 
*/
const ContactsContextProvider = ({ children }) => {
    const contacts = getContacts()
    const [contactsState, setContactsState] = useState(contacts)

    const addMessageToContact = useCallback((contactId, message) => {
        setContactsState(prevContacts =>
            prevContacts.map(contact =>
                contact.id === contactId
                    ? { ...contact, messages: [...contact.messages, message] }
                    : contact
            )
        )
    }, [])

    const markMessagesAsRead = useCallback((contactId) => {
        setContactsState(prevContacts =>
            prevContacts.map(contact =>
                contact.id === contactId
                    ? {
                        ...contact,
                        messages: contact.messages.map(message =>
                            !message.send_by_me ? { ...message, is_read: true } : message
                        )
                    }
                    : contact
            )
        )
    }, [])

    const addContact = useCallback((newContact) => {
        setContactsState(prevContacts => [...prevContacts, { ...newContact, id: Date.now(), messages: [] }])
    }, [])

    const provider_values = {
        contacts: contactsState,
        addMessageToContact,
        markMessagesAsRead,
        addContact
    }

    return (
        /* 
        Creamos el proveedor de contexto y pasamos la prop value que es basicamente lo que se podra consumir del contexto
        */
        <ContactsContext.Provider 
            value={provider_values}
        >
            {children}
        </ContactsContext.Provider>
    )
}

export default ContactsContextProvider