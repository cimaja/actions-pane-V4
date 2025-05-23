import { LibraryItemType, DetailedActionItem } from '../../../models/types';

// Connector metadata
export const connector: LibraryItemType = {
  id: 'bing-maps',
  title: 'Bing Maps',
  type: 'connector',
  icon: '/assets/connectors/Bing Maps.png',
  description: 'Integrate location and mapping capabilities into your applications with Bing Maps services.',
  author: 'Microsoft',
  isInstalled: false,
  category: 'Microsoft' as const,
  tags: ['maps', 'location', 'geocoding', 'routing', 'bing']
};

// Connector actions
export const actions: DetailedActionItem[] = [
  {
    id: 'get-location-by-address',
    moduleId: 'bing-maps',
    title: 'Get location by address',
    description: 'Get the location information associated with an address. If no location is found, an empty result will be returned.',
    tags: ['bing', 'maps', 'geocoding', 'address', 'location'],
    usage: 'Use this action to convert a street address into geographic coordinates (latitude and longitude).'
  },
  {
    id: 'get-location-by-point',
    moduleId: 'bing-maps',
    title: 'Get location by point',
    description: 'Get the location information associated with latitude and longitude coordinates.',
    tags: ['bing', 'maps', 'reverse-geocoding', 'coordinates', 'location'],
    usage: 'Use this action to convert geographic coordinates (latitude and longitude) into location information.'
  },
  {
    id: 'get-route',
    moduleId: 'bing-maps',
    title: 'Get route',
    description: 'Calculate a route using waypoints.',
    tags: ['bing', 'maps', 'routing', 'directions', 'navigation'],
    usage: 'Use this action to get turn-by-turn directions between multiple locations.'
  },
  {
    id: 'get-static-map',
    moduleId: 'bing-maps',
    title: 'Get static map',
    description: 'Get static map.',
    tags: ['bing', 'maps', 'static', 'image', 'location'],
    usage: 'Use this action to generate a static map image for a specific location or area.'
  }
];

// Helper function to get all actions for this connector
export const getAllActions = () => actions;

// Helper function to get an action by ID
export const getActionById = (id: string) => actions.find(action => action.id === id);
