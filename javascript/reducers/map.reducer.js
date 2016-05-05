import {
  INITIALIZE, INITIALIZED, UPDATE_MAP_POSITION, SELECT_HEX, ZOOM_IN, ZOOM_OUT, SELECT_HEX_AND_ZOOM_IN
} from 'javascript/actions/map.actions';


const defaultMapState = {
  isLoading: false,
  initialized: false,
  userMap: {},
  posX: 0,
  posY: 0,
  selectedHexId: null,
  zoomLevel: 100
};

export default function mapReducer(state=defaultMapState, action) {
  switch (action.type) {

    case INITIALIZE:
      return Object.assign({}, state, {
        isLoading: true
      });

    case INITIALIZED:
      return Object.assign({}, state, {
        isLoading: false,
        initialized: true,
        userMap: action.userMap
      });

    case UPDATE_MAP_POSITION:
      return Object.assign({}, state, {
        posX: action.posX,
        posY: action.posY
      });

    case SELECT_HEX:
      return Object.assign({}, state, {
        selectedHexId: action.hexId
      });

    case ZOOM_IN:
      if (state.zoomLevel === 200) {
        return state;
      }

      return Object.assign({}, state, {
        zoomLevel: state.zoomLevel + 20
      });

    case ZOOM_OUT:
      if (state.zoomLevel === 20) {
        return state;
      }
      return Object.assign({}, state, {
        zoomLevel: state.zoomLevel - 20
      });

    case SELECT_HEX_AND_ZOOM_IN:
      if (state.zoomLevel === 200) {
        return state;
      }

      return Object.assign({}, state, {
        zoomLevel: state.zoomLevel + 20,
        selectedHexId: action.hexId
      });

    default:
      return state;
  }
}
