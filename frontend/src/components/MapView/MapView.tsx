import { APIProvider, Map } from '@vis.gl/react-google-maps';

export const MapView = () => {

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!API_KEY) {
    throw new Error('VITE_GOOGLE_MAPS_API_KEY is not set, you got', API_KEY);
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling='greedy'
        disableDefaultUI
      />
    </APIProvider>
  )
}