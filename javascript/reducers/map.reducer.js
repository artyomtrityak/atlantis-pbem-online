import {
  INITIALIZE, INITIALIZED, UPDATE_MAP_POSITION, SELECT_HEX, ZOOM_IN, ZOOM_OUT
} from 'javascript/actions/map.actions';


const defaultMapState = {
  isLoading: false,
  initialized: false,
  userMap: [],
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
      console.log(state.zoomLevel);
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

    default:
      console.log('def:', action);
      return state;
  }
}
