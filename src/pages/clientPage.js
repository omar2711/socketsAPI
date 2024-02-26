import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export function ClientPage() {
    const [isHovered, setIsHovered] = useState(false);

        const buttonStyle = {
            backgroundColor: isHovered ? '#45a049' : '#4CAF50',
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            margin: '4px 2px',
            cursor: 'pointer',
            borderRadius: '8px',
            transitionDuration: '0.4s',
            boxShadow: isHovered ? '0 4px 8px 0 rgba(0,0,0,0.2)' : 'none' 
          
        };

        const textBoxStyle = {
            width: '200px',
            height: '30px',
            padding: '5px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            margin: '10px',
        };
        
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
          
        const [ip, setip] = useState('');

        const handleIpChange = (event) => {
            setip(event.target.value);
        }
        const [port, setPort] = useState('');

        const [diskInfo, setDiskInfo] = useState(null); // Estado para almacenar la información del disco


        const handlePortChange = (event) => {
            setPort(event.target.value);
        }

        const handleClicked = () => {
            alert(ip + port);

        }

        const handleSpaceCalculation = () => {
            
            fetch('http://127.0.0.1:8000/api/v1/diskSpace/')
            .then(response => response.json())
            .then(data => {
                // Almacenar la información del disco en el estado
                setDiskInfo(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al obtener la información del disco');
            });
        }

        const handleSendMessage = () => {
           
        //ip servidor:
            fetch(`http://127.0.0.1:8000/api/v1/sendMessage/?ip=192.168.0.232&puerto=69&libre=${diskInfo.libre}&usado=${diskInfo.utilizado}&total=${diskInfo.total}&pid=${diskInfo.pid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar el mensaje a través de socket');
                }
                alert('Mensaje enviado con éxito');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al enviar el mensaje a través de socket');
            });
        }
        

        const handleSendInfoToDatabase = () => {
            const requestBody = {
                pid: diskInfo.pid,
                ip: '127.0.0.1',  // Cambia la dirección IP según tu configuración
                port: 69,  // Cambia el puerto si es diferente
                libre: diskInfo.libre,
                utilizado: diskInfo.utilizado,
                total: diskInfo.total
            };
        
            fetch('http://127.0.0.1:8000/api/v1/sendInfoToDatabase/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar la información a la base de datos');
                }
                alert('Información enviada con éxito a la base de datos');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al enviar la información a la base de datos');
            });
        }
        


        
          

    return (
        <div style={centeredDivStyle}>
            <div style={verticallyCenteredDivStyle}>
            <h1>Client Page</h1>
                {diskInfo && (
                    <div>
                        <label>Espacio Libre: {diskInfo.libre} GB</label><br />
                        <label>Espacio Utilizado: {diskInfo.utilizado} GB</label><br />
                        <label>Espacio Total: {diskInfo.total} GB</label><br/>
                        <label>Process ID: {diskInfo.pid}</label>
                    </div>
                )}
                
                <button
                style={buttonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleSpaceCalculation}
                >
                    Calcular Espacio
                </button>
                

                <button
                style={buttonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleSendInfoToDatabase}
                >
                    Enviar
                </button>
                
            </div>
        </div>
    );
}

export default ClientPage;
