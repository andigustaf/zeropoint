import { Map, Marker, ZoomControl } from "pigeon-maps"

const PigeonMap = ({center, zoom = 17}) => {
    return (
        <Map
            dprs={[1, 2]}
            defaultCenter={[-6.9106699, 112.4620105]}
            defaultZoom={zoom}
            center={center}
            zoom={zoom}
        >
            <ZoomControl />
            <Marker width={50} anchor={center} />
        </Map>
      )
}

export default PigeonMap 
