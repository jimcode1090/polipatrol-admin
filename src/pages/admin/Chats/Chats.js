import React, { useState, useEffect } from 'react';
import { User, Chat, ChatMessage } from "../../../api";
import { useAuth } from "../../../hooks";
import { initSocket, socket } from "../../../utils";

const userController = new User();
const chatController = new Chat();
const chatMessageController = new ChatMessage();

export function Chats() {
    const [users, setUsers] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [chatId, setChatId] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]); // Estado para los mensajes
    const { accessToken, user } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                setUsers(null);

                const response = await userController.getUsers(
                    accessToken,
                    true
                );
                console.log('Usuarios obtenidos:', response);
                setUsers(response);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [accessToken]);

    const startChat = async (contact) => {
        setSelectedContact(contact); // Actualizamos el contacto seleccionado
        console.log("participant_one", user._id);
        console.log("participant_two", contact._id);
        try {
            const response = await chatController.create(accessToken, user._id, contact._id);
            console.log('Chat:', response);
            setChatId(response._id);
            // Aquí puedes cargar los mensajes históricos si están disponibles
            const responseMessages = await chatMessageController.getAll(accessToken, response._id);
            console.log("mensajes de este chat: ", messages)
            setMessages(responseMessages.messages || []); // Suponiendo que el chatController retorna mensajes
        } catch (error) {
            console.error("Ha ocurrido un error: ", error);
        }
    };

    const sendMessage = async ( message) => {
        try {
            const response = await chatMessageController.sendText(accessToken, chatId, message);
            console.log("Mensaje enviado: ", response);
            setMessage('')
        } catch (error) {
            console.error("Ha ocurrido un error: ", error);
        }
    };


    useEffect(() => {
        console.log("ChatId: ", chatId);
        initSocket();
        socket.emit('subscribe', chatId + "_notify");
        socket.on("message_notify", newMessage)
    }, [chatId]);

    const newMessage = (newMessage) => {
        console.log("Mensaje por socket", newMessage);
        if (newMessage.chat === chatId) {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
    }


    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '350px', padding: '20px' }}>
                <h3>Chat Policial</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {users && users.map(user => (
                        <li key={user._id} style={styles.contactItem}>
                            <button
                                style={styles.contactButton}
                                onClick={() => startChat(user)}
                            >
                                {user.rank} {user.first_name} {user.last_name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ flex: 1, padding: '20px' }}>
                {selectedContact ? (
                    <>
                        <h3>Conversación con {selectedContact.rank} {selectedContact.first_name} {selectedContact.last_name}</h3>
                        <div style={styles.messageBox}>
                            {messages && messages.length === 0 ? (
                                <p>No hay mensajes aún.</p>
                            ) : (
                                messages.map((message, index) => (
                                    <div key={index} style={styles.message}>
                                        <strong>{message.user.rank} {message.user.first_name} {message.user.last_name}: </strong>{message.message}
                                    </div>
                                ))
                            )}
                        </div>
                        <div style={styles.inputBox}>
                            <input
                                type="text"
                                placeholder="Escribe un mensaje..."
                                style={styles.inputField}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                onClick={() => sendMessage(message)}
                                style={styles.sendButton}>Enviar</button>
                        </div>
                    </>
                ) : (
                    <p>Selecciona un contacto para iniciar un chat.</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    contactItem: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    contactButton: {
        background: 'none',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        textAlign: 'left',
        width: '100%',
        padding: '10px',
    },
    messageBox: {
        height: '400px',
        overflowY: 'scroll',
        border: '1px solid #ddd',
        padding: '10px',
        marginBottom: '10px',
    },
    message: {
        marginBottom: '10px',
    },
    inputBox: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    inputField: {
        width: '80%',
        padding: '10px',
        border: '1px solid #ddd',
    },
    sendButton: {
        width: '15%',
        padding: '10px',
        border: '1px solid #ddd',
        backgroundColor: '#4CAF50',
        color: 'white',
        cursor: 'pointer',
    },
};
