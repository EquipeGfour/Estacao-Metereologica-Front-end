import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface Estacao {
    latitude: number;
    longitude: number;
}

function Mapa() {

const [position, setPosition] = useState(null);
const [estacao] = useState<Estacao>();

const containerStyle = {
    width: "400px",
    height: "400px"
};

const centro = {
    lat: estacao?.latitude,
    lng: estacao?.longitude
};

const posicao = {
    lat: estacao?.latitude,
    lng: estacao?.longitude
};

    return (
        <LoadScript googleMapsApiKey="AIzaSyBAw7vxa5CMiBHdqXF0FUqx6AStWF0bI6k">
            <GoogleMap mapContainerStyle={containerStyle} center={centro} zoom={15}>
                <Marker position={posicao} />
            </GoogleMap>
        </LoadScript>
    );
}
export default Mapa;