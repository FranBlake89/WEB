import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';

export default function Map({props}){
    //console.table('Map',props._id)
    //console.log('map>>> ',props)
    //console.log(props.bikeid)

        const start_lat = props['start station location'].coordinates[0]
        const start_lon = props['start station location'].coordinates[1]
        const end_lat = props['end station location'].coordinates[0]
        const end_long = props['end station location'].coordinates[1]
        const start_name = props['start station name']
        const end_name = props['end station name']

    return(
        <>
            <MapContainer style={{ "height": "500px" }} center={[start_lon, start_lat]} zoom={15}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[start_lon, start_lat]}>
                    <Tooltip permanent direction='right'>Start: {start_name}</Tooltip>
                </Marker>
                <Marker position={[end_long, end_lat]}>
                    <Tooltip permanent direction='right'>End: {end_name}</Tooltip>
                </Marker>
            </MapContainer>
        </>
    )

}