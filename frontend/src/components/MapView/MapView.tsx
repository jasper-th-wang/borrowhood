import { useAppStore } from '@/store';
import { Dialog, LoadingOverlay, Overlay } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { APIProvider, Map, MapCameraChangedEvent, MapCameraProps } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useState } from 'react';

const INITIAL_CAMERA = {
  center: { lat: 40.7, lng: -74 },
  zoom: 12
};
export const MapView = () => {
  const { userLocation, setUserLocation, mapPermissionsStatus, setMapPermissionsStatus } = useAppStore()
  const { height, width } = useViewportSize();
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);
  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) =>
    setCameraProps(ev.detail), []
  );

  // on userLocation change, update the cameraProps
  useEffect(() => {
    console.log("User location changed:", userLocation);
    setCameraProps({
      center: {
        lat: userLocation.latitude,
        lng: userLocation.longitude
      },
      zoom: 12
    });
  }, [userLocation])

  // get user location on load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const location = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      }
      setUserLocation(location);
      setMapPermissionsStatus('granted');
    }, (error) => {
      setMapPermissionsStatus('denied');
      console.error("Error getting location:", error);
    });
  }, []);

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!API_KEY) {
    throw new Error('VITE_GOOGLE_MAPS_API_KEY is not set, you got', API_KEY);
  }

  return (
    <>
      {
        mapPermissionsStatus === 'denied' &&
        <Dialog position={{ top: 20, left: 20 }} opened zIndex={3000}>
          Position access denied, please enable it to use the map.
        </Dialog>
      }
      <APIProvider apiKey={API_KEY}>
        <Map
          {...cameraProps}
          onCameraChanged={handleCameraChange}
          style={{ width: '100vw', height: height - 180 }}
          // defaultCenter={{ lat: 22.54992, lng: 0 }}
          // defaultZoom={3}
          gestureHandling='greedy'
          disableDefaultUI
        />
      </APIProvider>
      {mapPermissionsStatus !== 'granted' &&
        <LoadingOverlay
          visible
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />
      }
    </>
  )
}
