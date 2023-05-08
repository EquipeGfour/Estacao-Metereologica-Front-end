import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";


function Mapa(latitude:any, longitude:any) {

    const containerStyle = {
        width: "400px",
        height: "400px"
    };

    /* const latitude: number = parseFloat(estacao?.latitude);
    const longitude: number = parseFloat(estacao?.longitude); */

    const centro = {
        lat: latitude,
        lng: longitude
    };

    const posicao = {
        lat: latitude,
        lng: longitude
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyANXJAU1kT5aSuRzVnVri6x1KN7Z5KIlYI">
            <GoogleMap mapContainerStyle={containerStyle} center={centro} zoom={15}>
                <Marker position={posicao} />
            </GoogleMap>
        </LoadScript>
    );
}
export default Mapa;