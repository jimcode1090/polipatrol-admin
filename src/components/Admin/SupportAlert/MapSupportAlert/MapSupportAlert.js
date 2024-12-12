import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from "semantic-ui-react";
import { SupportAlert } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { initSocket, socket } from "../../../../utils";
import { image } from "../../../../assets";

const supportAlertController = new SupportAlert();

export function MapSupportAlert(props) {
    const { statusAlert, reload, onReload } = props;
    const [supportAlerts, setSupportAlerts] = useState([]);
    const [users, setUsers] = useState([]);
    const { accessToken } = useAuth();
    const [zoom, setZoom] = useState(13);
    const [center, setCenter] = useState([-11.1296875, -77.6259794]);
    const mapRef = useRef(null);

    const alertIcon = L.icon({
        iconUrl: image.marker_alert,
        iconSize: [30, 48],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
    });

    const userIcon = L.icon({
        iconUrl: image.marker_user,
        iconSize: [30, 38],
        iconAnchor: [15, 30],
        popupAnchor: [0, -10],
    });

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

        socket.on("receiveCoords", (coords) => {
            console.log("recibiendo usuarios", coords);
            setUsers((prevUsers) => {
                const existingUserIndex = prevUsers.findIndex((user) => user.id === coords.id);

                if (existingUserIndex !== -1) {
                    // Update user coordinates
                    const updatedUsers = [...prevUsers];
                    updatedUsers[existingUserIndex] = {
                        ...prevUsers[existingUserIndex],
                        location: coords.location,
                    };
                    return updatedUsers;
                }

                // Add new user
                return [...prevUsers, coords];
            });
        });

        return () => {
            socket.disconnect();
        };
    }, [statusAlert, reload, accessToken]);

    useEffect(() => {
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
            setSupportAlerts((prevAlerts) => prevAlerts.filter((alert) => alert._id !== alertId));
        } catch (error) {
            console.error('Error al atender alerta:', error);
        }
    };

    return (
        <div style={{ height: '600px', width: '100%' }}>
            <h3>Mapa de alertas de apoyo del personal policial ({supportAlerts.length})</h3>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '90%', width: '100%' }}
                scrollWheelZoom={true}
                whenCreated={(map) => mapRef.current = map}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {supportAlerts.map((alert) => (
                    <Marker
                        key={alert._id}
                        position={[alert.latitude, alert.longitude]}
                        icon={alertIcon}
                        eventHandlers={{
                            click: () => handleMarkerClick(alert),
                        }}
                    >
                        <Popup>
                            <div>
                                <h4>Alerta enviada por:</h4>
                                <p>{alert.user.rank} {alert.user.first_name} {alert.user.last_name}</p>
                                <Button onClick={() => handleAttendAlert(alert._id)}>Atender Alerta</Button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
                {users.map((user) => (
                    <Marker
                        key={user.id}
                        position={[user.location.latitude, user.location.longitude]}
                        icon={userIcon}
                    >
                        <Popup>
                            <div>
                                <h4>Usuario:</h4>
                                <p>{user.rank} {user.first_name} {user.last_name}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
