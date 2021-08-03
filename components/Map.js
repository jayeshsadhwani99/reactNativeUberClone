import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useDispatch, useSelector} from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from '../slices/navSlice';
import {GOOGLE_MAPS_APIKEY} from '@env';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!origin || !destination) return;

    // Zoom and fit through markers
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 50, right: 50, left: 50, bottom: 50},
    });
  }, [origin, destination]);

  React.useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`;
      await fetch(URL)
        .then(res => res.json())
        .then(data => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };
    getTravelTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.latitude,
        longitude: origin.location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}>
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.latitude,
            longitude: origin.location.longitude,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
