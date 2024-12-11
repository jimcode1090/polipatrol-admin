import React, {useState, useEffect, useRef} from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Button} from "semantic-ui-react";
import {SupportAlert} from "../../../../api";
import {useAuth} from "../../../../hooks";
import {initSocket, socket} from "../../../../utils";

const supportAlertController = new SupportAlert();

export function MapSupportAlert(props) {
    const {statusAlert, reload, onReload} = props;
    const [supportAlerts, setSupportAlerts] = useState([]);
    const {accessToken} = useAuth();
    const [zoom, setZoom] = useState(13);
    const [center, setCenter] = useState([-13.1581, -74.2238]);
    const [users, setUsers] = useState([]);
    const mapRef = useRef(null);

    useEffect(() => {
        initSocket();
        (async () => {
            try {
                setSupportAlerts([]);
                const response = await supportAlertController.getSupportAlerts(accessToken, statusAlert);
                setSupportAlerts(response);
            } catch (error) {
                console.error(error);
            }
        })();

        socket.on('receiveSupportAlert', (alertData) => {
            setSupportAlerts((prevAlerts) => [...prevAlerts, alertData]);
        });

        socket.on("receiveCoords", (coords, user) => {
            console.log("Recibiendo coords de usuarios: ", coords)
        })

        return () => {
            socket.disconnect();
        };
    }, [statusAlert, reload, accessToken]);

    useEffect(() => {
        console.log("Updating map view");
        if (mapRef.current) {
            mapRef.current.setView(center, zoom);
        }
    }, [center]);

    const handleMarkerClick = (alert) => {
        setCenter([alert.latitude, alert.longitude]);
    };

    const handleAttendAlert = async (alertId) => {
        try {
            const response = await supportAlertController.attendAlert(accessToken, alertId);
            console.log('Alerta atendida:', response);
            setSupportAlerts((prevAlerts) => prevAlerts.filter((alert) => alert._id !== alertId));
        } catch (error) {
            console.error('Error al atender alerta:', error);
        }
    };

    return (
        <div style={{height: '600px', width: '100%'}}>
            <h3>Mapa de alertas de apoyo del personal policial ({supportAlerts.length})</h3>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{height: '90%', width: '100%'}}
                scrollWheelZoom={true}
                whenCreated={(map) => mapRef.current = map}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {supportAlerts.map((alert, index) => (
                    <Marker
                        key={index}
                        position={[alert.latitude, alert.longitude]}
                        icon={L.divIcon({
                            className: 'custom-icon',
                            html: '<div style="width: 30px; height: 30px; background-color: red; border-radius: 50%; text-align: center; line-height: 30px; color: white;">!</div>',
                            iconSize: [30, 30],
                            iconAnchor: [15, 30],
                            popupAnchor: [0, -30],
                        })}
                        eventHandlers={{
                            click: () => handleMarkerClick(alert),
                        }}
                    >
                        <Popup>
                            <div>
                                <h4>Alerta enviada por: </h4>
                                <p>{alert.user.rank} {alert.user.first_name} {alert.user.last_name}</p>
                                <Button
                                    onClick={() => handleAttendAlert(alert._id)}
                                >
                                    Atender Alerta
                                </Button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
