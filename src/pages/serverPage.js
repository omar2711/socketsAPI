import React, { useState, useEffect } from 'react';
import ServerComponent from '../components/servercomponent.js';

export function ServerPage() {
    const centeredDivStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',

    };

    const verticallyCenteredDivStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
    };

    
    const [serverData, setServerData] = useState([]);
    const [socketMessages, setSocketMessages] = useState([]);


    // Función para obtener los datos del servidor desde la API
    const fetchServerData = () => {
        fetch('http://127.0.0.1:8000/api/v1/regionserver')
            .then(response => response.json())
            .then(data => setServerData(data))
            .catch(error => console.error('Error fetching server data:', error));
    };

    const connectToWebSocket = () => {
        const socket = new WebSocket('ws://127.0.0.1:8000/ws/receive_message/');

        socket.onmessage = event => {
            const message = JSON.parse(event.data);
            setSocketMessages(prevMessages => [...prevMessages, message]);
        };

        return () => {
            socket.close();
        };
    };

    useEffect(() => {
        // Llamar a fetchServerData inmediatamente para obtener los datos por primera vez
        fetchServerData();

        // Establecer un intervalo para llamar a fetchServerData cada 5 segundos
        const serverDataInterval = setInterval(fetchServerData, 5000);

        // Establecer una conexión WebSocket para recibir mensajes
        const socketCleanup = connectToWebSocket();

        // Limpiar los intervalos y la conexión WebSocket al desmontar el componente
        return () => {
            clearInterval(serverDataInterval);
            socketCleanup();
        };
    }, []);

    useEffect(() => {
        // Llamar a fetchServerData inmediatamente para obtener los datos por primera vez
        fetchServerData();

        // Establecer un intervalo para llamar a fetchServerData cada 5 segundos
        const interval = setInterval(fetchServerData, 5000);

        // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria
        return () => clearInterval(interval);
    }, []);

    

    return (
        <div style={verticallyCenteredDivStyle}>
            <h1>Server Page</h1>
            <div style={centeredDivStyle}>
                {serverData.map(server => (
                    <ServerComponent
                        key={server.pid}  
                        total={server.totalSpace}
                        libre={server.freeSpace}
                        utilizado={server.usedSpace}
                        pid={server.pid}
                    />
                ))}
            </div> 

            <div>
                <h2>Socket Messages:</h2>
                <ul>
                    {socketMessages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ServerPage;