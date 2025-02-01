import { useAppStore } from '@/store';
import { Dialog, LoadingOverlay } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { APIProvider, Map, MapCameraChangedEvent, MapCameraProps } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useState } from 'react';
import { MarkerWithInfowindow } from './MarkerWithInfoWindow';
import { useGetCommunitiesQuery } from '@/queries/community.query';
import { CommunityCard } from '../Cards/CommunityCard/CommunityCard';
import { useGetItemsQuery } from '@/queries/item.query';
import { ItemCard } from '../Cards/ItemCard/ItemCard';

import {Item} from "@/interfaces/main";

const INITIAL_CAMERA = {
  center: { lat: 40.7, lng: -74 },
  zoom: 12
};
export const MapView = () => {
  const { categoryFocus, userLocation, setUserLocation, mapPermissionsStatus, setMapPermissionsStatus } = useAppStore()
  const { height, width } = useViewportSize();
  const [cameraProps, setCameraProps] =
    useState<MapCameraProps>(INITIAL_CAMERA);
  const handleCameraChange = useCallback((ev: MapCameraChangedEvent) =>
    setCameraProps(ev.detail), []
  );
  const { isSuccess: isSuccessCommunities, data: communities } = useGetCommunitiesQuery();
  const { isSuccess: isSuccessItems, data: items } = useGetItemsQuery();

  const populateMarkers = () => {
    if (categoryFocus === 'items') {
      return (
        items?.map((item: Item) => (
          <MarkerWithInfowindow
            key={item.id}
            lat={parseFloat(item.coordinates.lat)}
            lng={parseFloat(item.coordinates.lng)}
          >
            <ItemCard
              image_url={item.image}
              title={item.title}
              owner_id={item.ownerId}
            />
          </MarkerWithInfowindow>
        )));
    }
    return (
      communities?.map((community) => (
        <MarkerWithInfowindow
          key={community.id}
          lat={parseFloat(community.coordinates.lat)}
          lng={parseFloat(community.coordinates.lng)}
        >
          <CommunityCard
            image_url={community.image_url}
            members={community.members}
            name={community.name}
          />
        </MarkerWithInfowindow>
      )));
  }

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
          mapId="8fbcdfe154e6bd2"
          {...cameraProps}
          onCameraChanged={handleCameraChange}
          style={{ width: '100vw', height: height - 180 }}
          // defaultCenter={{ lat: 22.54992, lng: 0 }}
          // defaultZoom={3}
          gestureHandling='greedy'
          disableDefaultUI
        >
          {populateMarkers()}
        </Map>
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
