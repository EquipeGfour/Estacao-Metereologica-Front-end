import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function Mapa({latitude, longitude}:any) {

    const containerStyle = {
        width: "800px",
        height: "400px"
    };

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