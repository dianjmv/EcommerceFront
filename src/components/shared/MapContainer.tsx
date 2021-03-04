import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps';
import React, {useState} from "react";

// @ts-ignore
import GoogleMapReact from 'google-map-react';
import {IoLocationSharp} from "react-icons/io5";


const InfoWindow = (props: any) => {
    const infoWindowStyle = {
        position: 'relative',
        bottom: 150,
        left: '-45px',
        width: 220,
        backgroundColor: 'white',
        boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
        padding: 10,
        fontSize: 14,
        zIndex: 100,
    };



    return (
        // @ts-ignore
        <div style={infoWindowStyle}>
            <div style={{fontSize: 16}}>
                SouthImport
            </div>
            <div style={{fontSize: 14}}>

            </div>
            <div style={{fontSize: 14, color: 'grey'}}>
                Las mejores Ofertas
            </div>
            <div style={{fontSize: 14, color: 'grey'}}>
                Los mejores PRecios
            </div>
            <div style={{fontSize: 14, color: 'green'}}>
                Horario de atención
            </div>
        </div>
    );
};
// Marker component
const Marker = (props:any) => {
    const markerStyle = {
        border: '1px solid white',
        borderRadius: '50%',
        height: 10,
        width: 10,
        backgroundColor: props.show ? 'red' : 'blue',
        cursor: 'pointer',
        zIndex: 10,
    };

    return (
        <>

            <div>
                <span className={'text-red-600 text-4xl'}><IoLocationSharp/></span>
                {props.show && <InfoWindow/>}
            </div>
        </>
    );
};


function MapContainer(props: any) {
    const [showInfo, setShowInfo ] =useState(false)
    const handleSetShowInfo = ()=>{
        setShowInfo(!showInfo)
    }


    return (
        <GoogleMapReact
            bootstrapURLKeys={{key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY}}
            defaultCenter={[34.0522, -118.2437]}
            defaultZoom={11}
            onChildClick={()=>handleSetShowInfo()}
        >
            <Marker
                lat={34.0522}
                lng={-118.2437}
                show={showInfo}
            />
        </GoogleMapReact>
    );
}


export default MapContainer;
